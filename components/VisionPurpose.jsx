import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import useTheme from '../hooks/usetheme';
import { useState, useEffect } from 'react';

const SectionCard = ({ title, icon, contentText, listPoints }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{icon}</Text>
                </View>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.contentText}>{contentText}</Text>
                {listPoints && listPoints.length > 0 && (
                    <View style={styles.list}>
                        {listPoints.map((point, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>{point}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

export default function VisionPurpose() {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://simad-portal-api.vercel.app/api/v1/app/about-university/getUniVisionAndMission');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success && result.data) {
                setData(result.data);
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

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <Text style={styles.retryText} onPress={fetchData}>
                    Tap to retry
                </Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>No data available</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <SectionCard
                    title="Vision"
                    icon="🎯"
                    contentText={data.vision}
                />
                <SectionCard
                    title="Mission"
                    icon="🚀"
                    contentText={data.mission.text}
                    listPoints={data.mission.points}
                />
                <SectionCard
                    title="Guiding Principles"
                    icon="🧭"
                    contentText={data.guidingPrinciples.text}
                    listPoints={data.guidingPrinciples.points}
                />
                {/* Add Core Values section if needed */}
                <SectionCard
                    title="Core Values"
                    icon="💎"
                    contentText={data.coreValues.text}
                    listPoints={data.coreValues.points}
                />
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
        content: {
            padding: 20,
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            marginTop: 10,
            color: colors.text,
        },
        errorText: {
            color: colors.error,
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 10,
        },
        retryText: {
            color: colors.primary,
            fontSize: 14,
            textDecorationLine: 'underline',
        },
        sectionContainer: {
            marginBottom: 20,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        iconContainer: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#C3E6CB',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        },
        icon: {
            fontSize: 18,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.secondary,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            borderWidth: 1,
            borderColor: '#C3E6CB',
            borderLeftWidth: 5,
            borderLeftColor: '#C3E6CB',
            marginBottom: 10,
            marginLeft: 20,
        },
        contentText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.text,
        },
        list: {
            marginTop: 10,
        },
        listItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 5,
        },
        bulletPoint: {
            fontSize: 14,
            marginRight: 5,
            color: colors.primary,
        },
        listItemText: {
            flex: 1,
            fontSize: 14,
            lineHeight: 20,
            color: colors.text,
        },
    });
};