import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Linking, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import { Image } from 'expo-image';
import { getAboutUniversity } from '../../apis/aboutSimadApi';
import { useGlobalLoading } from '../../hooks/useGlobalLoading';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AboutUniversity({ componentKey = "about-university", refreshTrigger = 0 }) {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Connect to global loading
    useGlobalLoading(componentKey, loading);

    const fetchAboutData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await getAboutUniversity();
            
            console.log('API Response:', result);
            
            if (result?.success && result.data?.university) {
                setAboutData(result.data.university);
            } else {
                throw new Error(result?.message || 'No university data received');
            }
        } catch (err) {
            console.error('Error fetching about data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAboutData();
    }, [refreshTrigger]);

    const handleContactPress = (type, value) => {
        if (!value) return;
        
        switch (type) {
            case 'phone':
                Linking.openURL(`tel:${value}`);
                break;
            case 'email':
                Linking.openURL(`mailto:${value}`);
                break;
            case 'website':
                Linking.openURL(value);
                break;
        }
    };

    const handleRetry = () => {
        fetchAboutData();
    };

    const formatYear = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.getFullYear();
    };

    if (error && !aboutData) {
        return (
            <View style={styles.container}>
                <Header
                    title="About SIMAD"
                    showLeftIcon
                    leftIconName="chevron-back"
                    onLeftIconPress={() => router.back()}
                />
                <View style={styles.centerContainer}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={50} color={colors.error} />
                    <Text style={styles.errorText}>Failed to load university information</Text>
                    <Text style={styles.errorDetail}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                        <Text style={styles.retryText}>Tap to retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (!aboutData && !loading) {
        return (
            <View style={styles.container}>
                <Header
                    title="About SIMAD"
                    showLeftIcon
                    leftIconName="chevron-back"
                    onLeftIconPress={() => router.back()}
                />
                <View style={styles.centerContainer}>
                    <MaterialCommunityIcons name="school-outline" size={50} color={colors.textSecondary} />
                    <Text style={styles.noDataText}>University information not available</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                title="About SIMAD"
                showLeftIcon
                leftIconName="chevron-back"
                onLeftIconPress={() => router.back()}
            />
            
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section with Background Image */}
                <View style={styles.heroSection}>
                    <Image 
                        source={{ uri: aboutData?.backgroundImage }} 
                        style={styles.heroImage}
                        contentFit="cover"
                        transition={300}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.heroGradient}
                    >
                        <View style={styles.heroContent}>
                            <Image 
                                source={{ uri: aboutData?.logo }} 
                                style={styles.universityLogo}
                                contentFit="contain"
                            />
                            <Text style={styles.universityName}>
                                {aboutData?.name || 'SIMAD UNIVERSITY'}
                            </Text>
                            <Text style={styles.universityMotto}>
                                "{aboutData?.motto || 'The Fountain of Knowledge and Wisdom'}"
                            </Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Main Content */}
                <View style={styles.mainContent}>
                    {/* About Section */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <MaterialCommunityIcons name="school" size={24} color={colors.primary} />
                            <Text style={styles.cardTitle}>About SIMAD University</Text>
                        </View>
                        <Text style={styles.cardText}>
                            {aboutData?.about_simad || 'University information loading...'}
                        </Text>
                    </View>

                    {/* Quick Facts */}
                    <View style={styles.factsGrid}>
                        <View style={styles.factCard}>
                            <MaterialCommunityIcons name="calendar-star" size={32} color={colors.primary} />
                            <Text style={styles.factNumber}>{formatYear(aboutData?.founded)}</Text>
                            <Text style={styles.factLabel}>Founded</Text>
                        </View>
                        
                        <View style={styles.factCard}>
                            <MaterialCommunityIcons name="office-building" size={32} color={colors.primary} />
                            <Text style={styles.factType}>{aboutData?.type || 'Private'}</Text>
                            <Text style={styles.factLabel}>Type</Text>
                        </View>
                        
                        <View style={styles.factCard}>
                            <MaterialCommunityIcons name="earth" size={32} color={colors.primary} />
                            <Text style={styles.factLanguage}>{aboutData?.academics?.language || 'English'}</Text>
                            <Text style={styles.factLabel}>Language</Text>
                        </View>
                        
                        <View style={styles.factCard}>
                            <MaterialCommunityIcons name="handshake" size={32} color={colors.primary} />
                            <Text style={styles.factAffiliation}>{aboutData?.academics?.affiliation || 'AU'}</Text>
                            <Text style={styles.factLabel}>Affiliation</Text>
                        </View>
                    </View>

                    {/* Contact Information */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <MaterialCommunityIcons name="contacts" size={24} color={colors.primary} />
                            <Text style={styles.cardTitle}>Contact Information</Text>
                        </View>
                        
                        <View style={styles.contactInfo}>
                            {/* Address */}
                            <View style={styles.contactItem}>
                                <MaterialCommunityIcons name="map-marker" size={20} color={colors.text} />
                                <View style={styles.contactDetails}>
                                    <Text style={styles.contactLabel}>Address</Text>
                                    <Text style={styles.contactValue}>
                                        {aboutData?.address?.street && `${aboutData.address.street}, `}
                                        {aboutData?.address?.city && `${aboutData.address.city}, `}
                                        {aboutData?.address?.state && `${aboutData.address.state}, `}
                                        {aboutData?.address?.country || 'Somalia'}
                                    </Text>
                                </View>
                            </View>

                            {/* Phone */}
                            {aboutData?.contact?.phone && (
                                <TouchableOpacity 
                                    style={styles.contactItem}
                                    onPress={() => handleContactPress('phone', aboutData.contact.phone)}
                                >
                                    <MaterialCommunityIcons name="phone" size={20} color={colors.text} />
                                    <View style={styles.contactDetails}>
                                        <Text style={styles.contactLabel}>Phone</Text>
                                        <Text style={[styles.contactValue, styles.clickable]}>
                                            {aboutData.contact.phone}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            {/* Email */}
                            {aboutData?.contact?.email && (
                                <TouchableOpacity 
                                    style={styles.contactItem}
                                    onPress={() => handleContactPress('email', aboutData.contact.email)}
                                >
                                    <MaterialCommunityIcons name="email" size={20} color={colors.text} />
                                    <View style={styles.contactDetails}>
                                        <Text style={styles.contactLabel}>Email</Text>
                                        <Text style={[styles.contactValue, styles.clickable]}>
                                            {aboutData.contact.email}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            {/* Website */}
                            {aboutData?.contact?.website && (
                                <TouchableOpacity 
                                    style={styles.contactItem}
                                    onPress={() => handleContactPress('website', aboutData.contact.website)}
                                >
                                    <MaterialCommunityIcons name="web" size={20} color={colors.text} />
                                    <View style={styles.contactDetails}>
                                        <Text style={styles.contactLabel}>Website</Text>
                                        <Text style={[styles.contactValue, styles.clickable]}>
                                            {aboutData.contact.website}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const createStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background || colors.bg,
        },
        centerContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        errorText: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 12,
            marginBottom: 8,
            textAlign: 'center',
            color: colors.error,
        },
        errorDetail: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 20,
            color: colors.textSecondary,
        },
        noDataText: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.textSecondary,
            marginTop: 12,
        },
        retryButton: {
            marginTop: 10,
        },
        retryText: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.primary,
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            paddingBottom: 30,
        },
        heroSection: {
            height: 300,
            position: 'relative',
        },
        heroImage: {
            width: '100%',
            height: '100%',
        },
        heroGradient: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'flex-end',
            padding: 20,
        },
        heroContent: {
            alignItems: 'center',
        },
        universityLogo: {
            width: 80,
            height: 80,
            marginBottom: 15,
        },
        universityName: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.white,
            textAlign: 'center',
            marginBottom: 8,
        },
        universityMotto: {
            fontSize: 16,
            color: colors.white,
            fontStyle: 'italic',
            textAlign: 'center',
            opacity: 0.9,
        },
        mainContent: {
            padding: 20,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        cardTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
            marginLeft: 10,
        },
        cardText: {
            fontSize: 14,
            lineHeight: 22,
            color: colors.text,
            textAlign: 'justify',
        },
        factsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        factCard: {
            width: (SCREEN_WIDTH - 60) / 2,
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 15,
            alignItems: 'center',
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        factNumber: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.primary,
            marginTop: 8,
            marginBottom: 4,
        },
        factType: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.primary,
            marginTop: 8,
            marginBottom: 4,
        },
        factLanguage: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.primary,
            marginTop: 8,
            marginBottom: 4,
        },
        factAffiliation: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.primary,
            marginTop: 8,
            marginBottom: 4,
        },
        factLabel: {
            fontSize: 12,
            color: colors.text,
            textAlign: 'center',
        },
        contactInfo: {
            marginTop: 10,
        },
        contactItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.border + '40',
        },
        contactDetails: {
            flex: 1,
            marginLeft: 12,
        },
        contactLabel: {
            fontSize: 12,
            color: colors.text,
            marginBottom: 2,
            fontWeight: '500',
        },
        contactValue: {
            fontSize: 14,
            color: colors.textMuted,
            lineHeight: 20,
        },
        clickable: {
            color: colors.primary,
            fontWeight: '500',
        },
    });
};