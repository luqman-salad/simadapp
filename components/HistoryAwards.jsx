// components/HistoryAwards.jsx
import React, { useState, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import useTheme from '../hooks/usetheme';
import { getHistoryAwardData } from '../apis/historyAwardsApi';

export default function HistoryAwards() {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const [timelineData, setTimelineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await getHistoryAwardData();
            
            if (result.success && result.data && result.data.historyItems) {
                // Transform the API data to match your component structure
                const transformedData = result.data.historyItems.map(item => ({
                    years: item.year,
                    events: item.events,
                    id: item.id
                }));
                setTimelineData(transformedData);
            } else {
                throw new Error('Invalid data structure');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRetry = () => {
        fetchData();
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading History & Awards...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <Pressable onPress={handleRetry}>
                    <Text style={styles.retryText}>Tap to retry</Text>
                </Pressable>
            </View>
        );
    }

    if (!timelineData || timelineData.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>No historical data available</Text>
                <Pressable onPress={handleRetry}>
                    <Text style={styles.retryText}>Tap to retry</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* <View style={styles.bannerContainer}>
                <Image
                    source={require('../assets/images/fablab.jpg')}
                    style={styles.bannerImage}
                />
                <View style={styles.overlay} />
                <Pressable style={styles.learnMoreButton}>
                    <Text style={styles.buttonText}>History & Awards</Text>
                </Pressable>
            </View> */}
            
            <View style={styles.content}>
                <Text style={styles.title}>SIMAD Timeline</Text>
                <View style={styles.timelineWrapper}>
                    {timelineData.map((item, index) => (
                        <View key={item.id || index} style={styles.timelineItem}>
                            <View style={styles.timelineLeft}>
                                <Text style={styles.yearText}>{item.years}</Text>
                            </View>
                            <View style={styles.timelineCenter}>
                                <View style={styles.dot}></View>
                                {index < timelineData.length - 1 && <View style={styles.line}></View>}
                            </View>
                            <View style={styles.timelineRight}>
                                <View style={styles.card}>
                                    {item.events.map((event, eventIndex) => (
                                        <React.Fragment key={eventIndex}>
                                            <View style={styles.eventItem}>
                                                <View style={styles.eventBullet}></View>
                                                <Text style={styles.eventText}>{event}</Text>
                                            </View>
                                            {eventIndex < item.events.length - 1 && (
                                                <View style={styles.separator} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const createStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        loadingText: {
            marginTop: 10,
            color: colors.text,
            fontSize: 16,
        },
        errorText: {
            color: colors.danger,
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 10,
        },
        retryText: {
            color: colors.primary,
            fontSize: 14,
            textDecorationLine: 'underline',
        },
        bannerContainer: {
            height: 200,
            position: 'relative',
        },
        bannerImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        learnMoreButton: {
            position: 'absolute',
            bottom: 5,
            left: '50%',
            transform: [{ translateX: -125 }],
            width: 250,
            height: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: colors.white,
            fontSize: 16,
            fontWeight: '500',
        },
        content: {
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 20,
        },
        timelineWrapper: {
            paddingLeft: 50,
        },
        timelineItem: {
            flexDirection: 'row',
            marginBottom: 20,
            position: 'relative',
        },
        timelineLeft: {
            position: 'absolute',
            left: -55,
            top: 0,
            width: 50,
            alignItems: 'center',
        },
        yearText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text,
            textAlign: 'right',
        },
        timelineCenter: {
            alignItems: 'center',
            marginRight: 20,
        },
        dot: {
            width: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: colors.text,
            position: 'absolute',
            left: 0,
        },
        line: {
            width: 2,
            backgroundColor: colors.text,
            flex: 1,
            position: 'absolute',
            left: 6.5,
            top: 0,
            bottom: -20,
        },
        timelineRight: {
            flex: 1,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            borderWidth: 1,
            borderColor: colors.border,
        },
        eventItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingBottom: 5,
        },
        separator: {
            height: 1,
            backgroundColor: colors.border,
            marginVertical: 3,
        },
        eventBullet: {
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: colors.text,
            marginRight: 10,
            marginTop: 7,
        },
        eventText: {
            flex: 1,
            fontSize: 13,
            lineHeight: 20,
            color: colors.text,
        },
    });
};