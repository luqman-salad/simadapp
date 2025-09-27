import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import useTheme from '../hooks/usetheme';
import { useState, useEffect } from 'react';

const AccreditationCard = ({ title, description, logo, message }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardText}>{message || description}</Text>
                </View>
                <Image
                    source={{ uri: logo }}
                    style={styles.cardLogo}
                    onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}
                />
            </View>
        </View>
    );
};

export default function Accreditation() {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://simad-portal-api.vercel.app/api/v1/app/about-university/getAccreditationsData');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success && result.data && result.data.accreditations) {
                setData(result.data.accreditations);
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
                <Text style={styles.loadingText}>Loading Accreditations...</Text>
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

    if (!data || data.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>No accreditation data available</Text>
                <Text style={styles.retryText} onPress={fetchData}>
                    Tap to retry
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.pageTitle}>Accreditation, Ranking, and Memberships</Text>

                {data.map((item, index) => (
                    <AccreditationCard
                        key={item.id || index}
                        title={item.name}
                        message={item.message}
                        logo={item.logo}
                    />
                ))}
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
        content: {
            padding: 20,
        },
        pageTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 20,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 20,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        cardTitleContainer: {
            flex: 1,
            marginRight: 10,
        },
        cardTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 5,
        },
        cardLogo: {
            width: 100,
            height: 100,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
        },
        cardText: {
            fontSize: 12,
            lineHeight: 20,
            color: colors.text,
        },
        list: {
            marginTop: 5,
            marginLeft: 10,
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