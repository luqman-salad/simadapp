// components/Accreditation.jsx
import { Image, ScrollView, StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import useTheme from '../hooks/usetheme';
import { useState, useEffect } from 'react';
import { getAccreditationsData } from '../apis/accreditationApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const { width: screenWidth } = Dimensions.get('window');

const AccreditationCard = ({ title, logo, index }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={styles.card}>
            {/* Logo Container with subtle shadow */}
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: logo }}
                    style={styles.logo}
                    resizeMode="contain"
                    onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}
                />
            </View>
            
            {/* Title */}
            <Text style={styles.cardTitle} numberOfLines={2}>
                {title}
            </Text>
            
            {/* Subtle accent line */}
            <View style={[styles.accentLine, { backgroundColor: colors.primary }]} />
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

    if (error) {
        return (
            <View style={[styles.container, styles.centerContainer]}>
                <View style={styles.errorIcon}>
                    <Text style={{ fontSize: 48, color: colors.danger }}>⚠️</Text>
                </View>
                <Text style={[styles.errorText, { color: colors.danger }]}>
                    Failed to load accreditations
                </Text>
                <Text style={[styles.errorSubtext, { color: colors.textSecondary }]}>
                    {error}
                </Text>
                <Pressable 
                    onPress={fetchData} 
                    style={[styles.retryButton, { backgroundColor: colors.primary }]}
                >
                    <Text style={styles.retryText}>
                        Try Again
                    </Text>
                </Pressable>
            </View>
        );
    }

    if (!data || (data.length === 0 && !loading)) {
        return (
            <View style={[styles.container, styles.centerContainer]}>
                <View style={styles.emptyIcon}>
                    <Text style={{ fontSize: 48, color: colors.textSecondary }}>🏆</Text>
                </View>
                <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
                    No accreditations available
                </Text>
                <Text style={[styles.noDataSubtext, { color: colors.textTertiary }]}>
                    Check back later for updates
                </Text>
                <Pressable 
                    onPress={fetchData} 
                    style={[styles.retryButton, { backgroundColor: colors.primary }]}
                >
                    <Text style={styles.retryText}>
                        Refresh
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Accreditations & Memberships</Text>
                <Text style={styles.pageSubtitle}>
                    {data.length} recognized achievement{data.length !== 1 ? 's' : ''}
                </Text>
            </View>

            {/* Grid Layout */}
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false}
            >
                {data.map((item, index) => (
                    <AccreditationCard
                        key={item.id || index}
                        title={item.name}
                        logo={item.logo}
                        index={index}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const createStyle = (colors) => {
    const cardWidth = (screenWidth - 60) / 2; // 2 columns with padding
    
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        scrollView: {
            flex: 1,
        },
        centerContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
        },
        
        // Header Styles
        header: {
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
            backgroundColor: colors.bg,
        },
        pageTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 4,
        },
        pageSubtitle: {
            fontSize: 14,
            color: colors.textMuted,
            fontWeight: '500',
        },
        
        // Grid Layout
        gridContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 20,
        },
        
        // Card Styles
        card: {
            width: cardWidth,
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            alignItems: 'center',
            shadowColor: colors.shadow || '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: 1,
            borderColor: colors.border + '20', // semi-transparent
        },
        logoContainer: {
            width: cardWidth - 32,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
            backgroundColor: colors.bg, // Fallback background for transparent logos
            borderRadius: 8,
            padding: 8,
        },
        logo: {
            width: '100%',
            height: '100%',
        },
        cardTitle: {
            fontSize: 13,
            fontWeight: '600',
            color: colors.text,
            textAlign: 'center',
            lineHeight: 18,
            marginBottom: 12,
            minHeight: 36, // Ensure consistent height for 2 lines
        },
        accentLine: {
            width: 30,
            height: 3,
            borderRadius: 2,
            opacity: 0.7,
        },
        
        // Error & Empty States
        errorIcon: {
            marginBottom: 16,
        },
        emptyIcon: {
            marginBottom: 16,
        },
        errorText: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            textAlign: 'center',
        },
        errorSubtext: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 24,
            lineHeight: 20,
        },
        noDataText: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            textAlign: 'center',
        },
        noDataSubtext: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 24,
            lineHeight: 20,
        },
        retryButton: {
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 25,
            minWidth: 120,
        },
        retryText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center',
        },
    });
};