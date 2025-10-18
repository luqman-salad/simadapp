import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import { getInstitutionDetails } from '../../apis/institutionsApi';
import { useGlobalLoading } from '../../hooks/useGlobalLoading';

const InstitutionsInfo = ({ componentKey = "institution-info", refreshTrigger = 0 }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    
    // ✅ PROPERLY GET PARAMS
    const params = useLocalSearchParams();
    const institutionId = params.institutionId;
    const institutionName = params.institutionName;
    
    console.log('Received params:', params); // Debug log
    console.log('Institution ID:', institutionId); // Debug log
    console.log('Institution Name:', institutionName); // Debug log
    
    const [institutionData, setInstitutionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ CONNECT TO GLOBAL LOADING
    useGlobalLoading(componentKey, loading);

    const fetchInstitutionData = async () => {
        console.log('Starting fetch with ID:', institutionId); // Debug log
        
        if (!institutionId) {
            const errorMsg = 'No institution ID provided. Params: ' + JSON.stringify(params);
            console.error(errorMsg);
            setError(errorMsg);
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching institution data for ID:', institutionId);
            
            const result = await getInstitutionDetails(institutionId);
            
            console.log('API Response:', result);
            
            if (result?.success && result.data?.institution) {
                setInstitutionData(result.data.institution);
            } else {
                throw new Error(result?.message || 'No institution data received');
            }
        } catch (err) {
            console.error('Error fetching institution details:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('useEffect triggered with institutionId:', institutionId); // Debug log
        if (institutionId) {
            fetchInstitutionData();
        } else {
            const errorMsg = 'No institution ID in useEffect. Params: ' + JSON.stringify(params);
            console.error(errorMsg);
            setError(errorMsg);
            setLoading(false);
        }
    }, [institutionId, refreshTrigger]);

    const handleRetry = () => {
        fetchInstitutionData();
    };

    const renderSectionContent = (content, isList) => {
        if (isList && Array.isArray(content)) {
            return (
                <View style={styles.listContainer}>
                    {content.map((item, index) => (
                        <Text key={index} style={styles.listItem}>• {item}</Text>
                    ))}
                </View>
            );
        }
        return <Text style={styles.cardText}>{content}</Text>;
    };

    // ✅ REMOVE INDIVIDUAL LOADING - GLOBAL OVERLAY HANDLES IT
    if (error && !institutionData) {
        return (
            <View style={styles.container}>
                <Header
                    title={institutionName || "Error"}
                    showLeftIcon
                    leftIconName="chevron-back"
                    onLeftIconPress={() => router.back()}
                />
                <View style={styles.centerContainer}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={50} color={colors.error} />
                    <Text style={styles.errorText}>Failed to load institution details</Text>
                    <Text style={styles.errorDetail}>{error}</Text>
                    <Pressable style={styles.retryButton} onPress={handleRetry}>
                        <Text style={styles.retryText}>Tap to retry</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    if (!institutionData && !loading) {
        return (
            <View style={styles.container}>
                <Header
                    title={institutionName || "Not Found"}
                    showLeftIcon
                    leftIconName="chevron-back"
                    onLeftIconPress={() => router.back()}
                />
                <View style={styles.centerContainer}>
                    <MaterialCommunityIcons name="domain-off" size={50} color={colors.textSecondary} />
                    <Text style={styles.noDataText}>Institution information not available</Text>
                </View>
            </View>
        );
    }

    // Create sections only from API data
    const sections = [
        institutionData?.overview && {
            icon: 'book-open-page-variant',
            title: institutionData.overview.heading,
            content: institutionData.overview.content,
            isList: false
        },
        institutionData?.visionMission && {
            icon: 'brain',
            title: institutionData.visionMission.heading,
            content: institutionData.visionMission.content,
            isList: false
        },
        institutionData?.keyPrograms && {
            icon: 'flask-outline',
            title: institutionData.keyPrograms.heading,
            content: institutionData.keyPrograms.programs,
            isList: true
        }
    ].filter(Boolean); // Remove null sections

    return (
        <View style={styles.container}>
            <Header
                title={institutionData?.name || institutionName || "Institution Info"}
                showLeftIcon
                leftIconName="chevron-back"
                onLeftIconPress={() => router.back()}
            />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerBackground}>
                    <Image 
                        source={{ uri: institutionData?.coverImage || institutionData?.image }} 
                        style={styles.headerImage} 
                        resizeMode="cover" 
                    />
                    <View style={styles.overlay}>
                        <Text style={styles.institutionTitle}>{institutionData?.name || institutionName}</Text>
                        <Text style={styles.institutionDescription}>
                            {institutionData?.shortDescription || 'Explore our institution'}
                        </Text>
                    </View>
                </View>

                <View style={styles.mainContent}>
                    {sections.map((section, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <MaterialCommunityIcons name={section.icon} size={24} color={colors.primary} />
                                <Text style={styles.cardTitle}>{section.title}</Text>
                            </View>
                            {renderSectionContent(section.content, section.isList)}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default InstitutionsInfo;

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
        headerBackground: {
            height: 250,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 20,
        },
        headerImage: {
            ...StyleSheet.absoluteFillObject,
            width: '100%',
            height: '100%',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingBottom: 20,
        },
        institutionTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.white,
            textAlign: 'center',
            marginBottom: 5,
        },
        institutionDescription: {
            fontSize: 16,
            color: colors.white,
            textAlign: 'center',
            lineHeight: 22,
        },
        scrollViewContent: {
            paddingBottom: 20,
        },
        mainContent: {
            paddingHorizontal: 20,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 5,
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
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
        listContainer: {
            paddingLeft: 10,
        },
        listItem: {
            fontSize: 14,
            lineHeight: 24,
            color: colors.text,
        },
    });
};