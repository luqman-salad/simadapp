// components/Accreditation.jsx
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import useTheme from '../hooks/usetheme';
import { useState, useEffect } from 'react';
import { getAccreditationsData } from '../apis/accreditationApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

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

export default function Accreditation({ componentKey = "accreditation", refreshTrigger = 0 }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Connect to global loading state
    useGlobalLoading(componentKey, loading);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await getAccreditationsData();
            
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

    if (!data || (data.length === 0 && !loading)) {
        return (
            <View style={[styles.container, styles.centerContainer]}>
                <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
                    No accreditation data available
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
        content: {
            paddingHorizontal: 20,
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