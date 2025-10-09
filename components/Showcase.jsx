import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import useTheme from '../hooks/usetheme'
import { getUpcomingEvents } from '../apis/upcomingEvents'
import { useGlobalLoading } from '../hooks/useGlobalLoading' // Import the global loading hook

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 270;
const ITEM_MARGIN = 10;

export default function ShowCase({ componentKey = "showcase", refreshTrigger = 0 }) {
    const listRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const {colors} = useTheme();
    const styles = createStyle(colors);

    // Connect to global loading state
    useGlobalLoading(componentKey, loading);

    useEffect(() => {
        fetchEvents();
    }, [refreshTrigger]); // Add refreshTrigger to dependencies

    useEffect(() => {
        let interval;
        if (events.length > 1) {
            interval = setInterval(() => {
                setIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % events.length; // Use modulo for infinite loop
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
            setError(null);
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
            }
        } catch (error) {
            console.error('Error loading events:', error);
            setError('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const getImageSource = (event, index) => {
        if (event.source && event.source.startsWith('http')) {
            return { uri: event.source };
        }
        return require('../assets/images/simadlead.jpg'); // Fallback image
    };

    const handleRetry = () => {
        fetchEvents();
    };

    const handleEventPress = (event) => {
        console.log('Event pressed:', event.title);
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / (ITEM_WIDTH + ITEM_MARGIN));
        
        if (newIndex >= 0 && newIndex < events.length) {
            setIndex(newIndex);
        }
    };

    const getItemLayout = (data, index) => ({
        length: ITEM_WIDTH + ITEM_MARGIN,
        offset: (ITEM_WIDTH + ITEM_MARGIN) * index,
        index,
    });

    // Remove the individual loading state since we're using global loading
    // The global loading overlay will handle the loading state
    if (error) {
        return (
            <View style={styles.showCaseContainer}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
                        <Text style={styles.retryButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (!events || events.length === 0) {
        return (
            <View style={styles.showCaseContainer}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No upcoming events</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.showCaseContainer}>
            <FlatList
                ref={listRef}
                style={styles.listContainer}
                data={events}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                initialScrollIndex={0}
                snapToInterval={ITEM_WIDTH + ITEM_MARGIN}
                snapToAlignment="start"
                decelerationRate="fast"
                onMomentumScrollEnd={handleScroll}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                getItemLayout={getItemLayout}
                renderItem={({item, index: itemIndex}) => (
                    <TouchableOpacity 
                        style={styles.showCaseItem}
                        onPress={() => handleEventPress(item)}
                    >
                        <Image 
                            source={getImageSource(item, itemIndex)} 
                            style={styles.showcaseImg}
                            contentFit="cover"
                            transition={300}
                            onError={() => console.log(`Failed to load image for: ${item.title}`)}
                        />
                        {/* Event Info Overlay */}
                        <View style={styles.eventInfoOverlay}>
                            <Text style={styles.eventTitle} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text style={styles.eventDate} numberOfLines={1}>
                                {new Date(item.date).toLocaleDateString()} • {item.startTime}
                            </Text>
                            <Text style={styles.eventLocation} numberOfLines={1}>
                                {item.location}
                            </Text>
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
        showCaseContainer: {
            paddingHorizontal: 7,
            marginVertical: 10,
        },
        title: {
            marginLeft: 15,
            fontSize: 18,
            fontWeight: '500',
            color: colors.text,
            marginBottom: 10,
        },
        listContainer: {
            flexGrow: 0,
        },
        showCaseItem: {
            width: ITEM_WIDTH,
            marginRight: ITEM_MARGIN,
            marginTop: 7,
            position: 'relative',
        },
        showcaseImg: {
            width: ITEM_WIDTH,
            height: 170,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: colors.border,
        },
        eventInfoOverlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 12,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
        },
        eventTitle: {
            color: colors.white,
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 2,
        },
        eventDate: {
            color: colors.white,
            fontSize: 12,
            opacity: 0.9,
            marginBottom: 2,
        },
        eventLocation: {
            color: colors.white,
            fontSize: 12,
            opacity: 0.8,
        },
        dotsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
        },
        loadingContainer: {
            height: 170,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 7,
        },
        loadingText: {
            marginTop: 12,
            fontSize: 14,
            color: colors.textSecondary,
        },
        errorContainer: {
            height: 170,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 7,
        },
        errorText: {
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 12,
        },
        retryButton: {
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
        },
        retryButtonText: {
            color: colors.white,
            fontSize: 14,
            fontWeight: '500',
        },
        emptyContainer: {
            height: 170,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 7,
        },
        emptyText: {
            fontSize: 14,
            color: colors.textSecondary,
        },
    });
    return styles;
}