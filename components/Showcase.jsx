import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import useTheme from '../hooks/usetheme'
import { getUpcomingEvents } from '../apis/upcomingEvents'

// Fallback images in case API images fail to load
// const fallbackImages = [
//   require('../assets/images/simadlead.jpg'),
//   require('../assets/images/simadilab.jpg'),
//   require('../assets/images/showcase3.jpg'),
// ];

export default function ShowCase() {
    const listRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const {colors} = useTheme();
    const styles = createStyle(colors);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            const interval = setInterval(() => {
                setIndex((prev) => {
                    const next = prev + 1 >= events.length ? 0 : prev + 1;
                    listRef.current?.scrollToIndex({ index: next, animated: true });
                    return next;
                });
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [events.length]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getUpcomingEvents();
            
            if (response.success && response.data) {
                // Transform API data to match component structure
                const transformedEvents = response.data.map(event => ({
                    id: event._id,
                    source: event.image, // URL from API
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
        // If API provides image URL, use it, otherwise use fallback
        if (event.source && event.source.startsWith('http')) {
            return { uri: event.source };
        }
        // Use fallback image based on index
        return fallbackImages[index % fallbackImages.length] || fallbackImages[0];
    };

    const handleRetry = () => {
        fetchEvents();
    };

    const handleEventPress = (event) => {
        // You can add navigation to event details here
        console.log('Event pressed:', event.title);
        // Example: navigation.navigate('EventDetails', { event });
    };

    if (loading) {
        return (
            <View style={styles.showCaseContainer}>
                {/* <Text style={styles.title}>Upcoming Events</Text> */}
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Loading events...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.showCaseContainer}>
                {/* <Text style={styles.title}>Upcoming Events</Text> */}
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
                {/* <Text style={styles.title}>Upcoming Events</Text> */}
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No upcoming events</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.showCaseContainer}>
            {/* <Text style={styles.title}>Upcoming Events</Text> */}
            <FlatList
                ref={listRef}
                style={styles.listContainer}
                data={events}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                initialScrollIndex={0}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(
                        event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
                    );
                    setIndex(newIndex);
                }}
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
            marginRight: 10,
            marginTop: 7,
            position: 'relative',
        },
        showcaseImg: {
            width: 270,
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