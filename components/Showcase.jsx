import { Image } from 'expo-image'
import { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { getUpcomingEvents } from '../apis/upcomingEvents'
import { useGlobalLoading } from '../hooks/useGlobalLoading'
import useTheme from '../hooks/usetheme'
import useLoadingStore from '../store/loadingStore'
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.75;

export default function ShowCase({ componentKey = "showcase", refreshTrigger = 0 }) {
    const listRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const {colors} = useTheme();
    const styles = createStyle(colors);
    const router = useRouter();

    // Get setGlobalError from store
    const { setGlobalError } = useLoadingStore();

    // Connect to global loading state
    useGlobalLoading(componentKey, loading);

    useEffect(() => {
        fetchEvents();
    }, [refreshTrigger]);

    useEffect(() => {
        let interval;
        if (events.length > 1) {
            interval = setInterval(() => {
                setIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % events.length;
                    listRef.current?.scrollToIndex({ 
                        index: nextIndex, 
                        animated: true 
                    });
                    return nextIndex;
                });
            }, 5000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [events.length]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await getUpcomingEvents();
            
            if (response.success && response.data) {
                const transformedEvents = response.data.map(event => ({
                    id: event._id,
                    source: event.image,
                    title: event.title,
                    date: event.date,
                    duration: event.duration,
                    startTime: event.startTime,
                    location: event.location,
                    description: event.description
                }));
                setEvents(transformedEvents);
            } else {
                throw new Error('Invalid data structure from API');
            }
        } catch (error) {
            console.error('Error loading events:', error);
            // Use global error handling
            setGlobalError(
                'Failed to load events. Please check your connection.',
                fetchEvents // Pass the function to retry
            );
        } finally {
            setLoading(false);
        }
    };

    const getImageSource = (event, index) => {
        if (event.source && event.source.startsWith('http')) {
            return { uri: event.source };
        }
        return require('../assets/images/simadlead.jpg');
    };

    const handleEventPress = (event) => {
        console.log('Event pressed:', event.title);
        // You can add navigation to event details screen here
        // router.push({
        //     pathname: '/(screens)/EventDetails',
        //     params: { eventId: event.id }
        // });
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / (ITEM_WIDTH + 15));
        
        if (newIndex >= 0 && newIndex < events.length) {
            setIndex(newIndex);
        }
    };

    const getItemLayout = (data, index) => ({
        length: ITEM_WIDTH + 15,
        offset: (ITEM_WIDTH + 15) * index,
        index,
    });

    const handleSeeAllPress = () => {
        // Navigation to full events screen
        router.push('/(drawer)/events');
    };

    // Only show empty state, errors are handled globally
    if (!events || events.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.sectionTitle}>Upcoming Events</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No upcoming events</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header with title
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                <TouchableOpacity onPress={handleSeeAllPress}>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View> */}

            <FlatList
                ref={listRef}
                style={styles.listContainer}
                data={events}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                initialScrollIndex={0}
                snapToInterval={ITEM_WIDTH + 15}
                snapToAlignment="start"
                decelerationRate="fast"
                onMomentumScrollEnd={handleScroll}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                getItemLayout={getItemLayout}
                renderItem={({item, index: itemIndex}) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => handleEventPress(item)}
                        style={styles.cardContainer}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={getImageSource(item, itemIndex)} 
                                style={styles.cardImage}
                                contentFit="cover"
                                transition={300}
                                onError={() => console.log(`Failed to load image for: ${item.title}`)}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                style={styles.gradient}
                            >
                                <View style={styles.content}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.subtitle} numberOfLines={2}>
                                        {new Date(item.date).toLocaleDateString()} • {item.location}
                                    </Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
                )}
            />
            
            {/* Dots Indicator */}
            {events.length > 1 && (
                <View style={styles.dotsContainer}>
                    {events.map((_, dotIndex) => (
                        <View
                            key={dotIndex}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: dotIndex === index ? colors.primary : colors.border
                                }
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}

const createStyle = (colors) => {
    const styles = StyleSheet.create({
        container: {
            marginBottom: 25,
            backgroundColor: colors.bg,
            paddingLeft: 10
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
            paddingHorizontal: 5,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: -0.5,
        },
        seeAllText: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.primary,
        },
        listContainer: {
            flexGrow: 0,
        },
        cardContainer: {
            width: ITEM_WIDTH,
            marginRight: 15,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 8,
            overflow: 'hidden', // Important for borderRadius to work
        },
        imageContainer: {
            width: '100%',
            height: 180,
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
        },
        cardImage: {
            width: '100%',
            height: '100%',
            borderRadius: 20,
        },
        gradient: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            justifyContent: 'flex-end',
            padding: 20,
            borderRadius: 20,
        },
        content: {
            // Content styles remain the same
        },
        title: {
            fontSize: 18,
            fontWeight: '700',
            color: colors.white,
            marginBottom: 5,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
        },
        subtitle: {
            fontSize: 13,
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 16,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
        },
        dotsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
        },
        emptyContainer: {
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            backgroundColor: colors.surface,
            marginHorizontal: 5,
        },
        emptyText: {
            fontSize: 14,
            color: colors.textSecondary,
        },
        errorContainer: {
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            backgroundColor: colors.surface,
            marginHorizontal: 5,
        },
        errorText: {
            fontSize: 14,
            color: colors.error,
            marginBottom: 12,
            textAlign: 'center',
        },
        retryButton: {
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        retryText: {
            color: colors.white,
            fontSize: 14,
            fontWeight: '600',
        },
    });
    return styles;
}