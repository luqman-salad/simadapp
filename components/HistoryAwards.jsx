// components/HistoryAwards.jsx
import React, { useState, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';
import { getHistoryAwardData } from '../apis/historyAwardsApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

export default function HistoryAwards({ componentKey = "history-awards", refreshTrigger = 0 }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const [timelineData, setTimelineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Connect to global loading state
    useGlobalLoading(componentKey, loading);

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
    }, [refreshTrigger]);

    // Remove individual loading display - global overlay handles it
    if (error) {
        return (
            <View style={[styles.container, styles.centerContainer]}>
                <Text style={[styles.errorText, { color: colors.danger }]}>
                    Error: {error}
                </Text>
                <Pressable onPress={fetchData} style={styles.retryButton}>
                    <Text style={[styles.retryText, { color: colors.primary }]}>
                        Tap to retry
                    </Text>
                </Pressable>
            </View>
        );
    }

    if (!timelineData || (timelineData.length === 0 && !loading)) {
        return (
            <View style={[styles.container, styles.centerContainer]}>
                <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
                    No historical data available
                </Text>
                <Pressable onPress={fetchData} style={styles.retryButton}>
                    <Text style={[styles.retryText, { color: colors.primary }]}>
                        Tap to retry
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
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
        contentContainer: {
            paddingVertical: 20,
        },
        centerContainer: {
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        errorText: {
            fontSize: 16,
            marginBottom: 10,
            textAlign: 'center',
        },
        noDataText: {
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 10,
        },
        retryButton: {
            marginTop: 10,
        },
        retryText: {
            fontSize: 16,
            fontWeight: "bold",
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