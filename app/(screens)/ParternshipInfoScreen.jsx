import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Image
} from 'react-native';
import { Header } from '../../components/Headrer';
import { useBottomSheet } from '../../context/BottomSheetContext';
import useTheme from '../../hooks/usetheme';
import { getPartners } from '../../apis/partinershipsApi';

const { width } = Dimensions.get('window');

const PartnerCard = ({ partner, onPress, colors }) => (
    <TouchableOpacity
        style={createPartnerCardStyles(colors).partnerCard}
        onPress={() => onPress(partner)}
    >
        <View style={createPartnerCardStyles(colors).partnerLogoContainer}>
            {partner.logo ? (
                <Image 
                    source={{ uri: partner.logo }} 
                    style={createPartnerCardStyles(colors).partnerLogoImage}
                    resizeMode="contain"
                />
            ) : (
                <Text style={createPartnerCardStyles(colors).partnerLogoText}>
                    {partner.name.charAt(0)}
                </Text>
            )}
        </View>
        <Text style={createPartnerCardStyles(colors).partnerName}>{partner.name}</Text>
    </TouchableOpacity>
);



const PartnershipsScreen = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const [searchQuery, setSearchQuery] = useState('');
    const [partnershipsData, setPartnershipsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { openSheet } = useBottomSheet();

    const fetchPartners = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await getPartners();
            
            if (result?.success && Array.isArray(result.data)) {
                setPartnershipsData(result.data);
            } else {
                throw new Error('Invalid data structure from API');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching partners:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleSearch = useCallback((text) => {
        setSearchQuery(text);
    }, []);

    const handleRetry = () => {
        fetchPartners();
    };

    const filteredPartnerships = partnershipsData.map((category) => {
        const filteredPartners = category.partners.filter((partner) =>
            partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            partner.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...category, partners: filteredPartners };
    }).filter((category) => category.partners.length > 0);

    const hasSearchResults = filteredPartnerships.some(category => category.partners.length > 0);

    if (loading) {
        return (
            <View style={styles.container}>
                <Header
                    title='Partnerships'
                    showLeftIcon
                    leftIconName="chevron-back"
                    onLeftIconPress={() => router.back()}
                />
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Loading partnerships...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Header
                    title='Partnerships'
                    showLeftIcon
                    leftIconName="chevron-back"
                    onLeftIconPress={() => router.back()}
                />
                <View style={styles.center}>
                    <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
                    <Text style={styles.errorText}>Unable to Load Partnerships</Text>
                    <Text style={styles.errorDetail}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                        <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                title='Partnerships'
                showLeftIcon
                leftIconName="chevron-back"
                onLeftIconPress={() => router.back()}
            />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.headerTitle}>Our Partnerships</Text>
                <Text style={styles.headerDescription}>
                    Collaborating with a network of industry leaders and research institutions to drive innovation and create new opportunities for our community.
                </Text>

                <View style={styles.searchBarContainer}>
                    <Ionicons name="search" size={20} color={colors.text} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for a partner..."
                        placeholderTextColor={colors.text}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchButton}>
                            <Ionicons name="close-circle" size={20} color={colors.text} />
                        </TouchableOpacity>
                    )}
                </View>

                {!hasSearchResults && searchQuery.length > 0 ? (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>No matching partners found.</Text>
                    </View>
                ) : partnershipsData.length === 0 ? (
                    <View style={styles.center}>
                        <Ionicons name="business-outline" size={64} color={colors.textSecondary} />
                        <Text style={styles.emptyText}>No Partnerships Available</Text>
                        <Text style={styles.emptyDetail}>
                            There are currently no partnerships available.
                        </Text>
                        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                            <Text style={styles.retryText}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    filteredPartnerships.map((category) => (
                        <View key={category.id} style={styles.categorySection}>
                            <View style={styles.sectionHeader}>
                                <View style={styles.sectionIndicator} />
                                <Text style={styles.sectionTitle}>{category.title}</Text>
                            </View>
                            <View style={styles.partnersGrid}>
                                {category.partners.map((partner) => (
                                    <PartnerCard
                                        key={partner.id}
                                        partner={partner}
                                        onPress={() => openSheet("partner", partner)}
                                        colors={colors}
                                    />
                                ))}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const createPartnerCardStyles = (colors) =>
    StyleSheet.create({
        partnerCard: {
            width: (width - 60) / 2,
            height: 150,
            backgroundColor: colors.surface,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 3,
        },
        partnerLogoContainer: {
            width: 60,
            height: 60,
            // backgroundColor: colors.border,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            overflow: 'hidden',
        },
        partnerLogoImage: {
            width: '100%',
            height: '100%',
        },
        partnerLogoText: {
            fontSize: 24,
            fontWeight: '600',
            color: colors.text,
        },
        partnerName: {
            fontSize: 16,
            fontWeight: '500',
            color: colors.text,
            textAlign: 'center',
            paddingHorizontal: 5,
        },
});

const createStyles = (colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            paddingTop: 30,
            paddingHorizontal: 20,
            paddingBottom: 40,
        },
        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.primary,
            textAlign: 'center',
            marginBottom: 10,
        },
        headerDescription: {
            fontSize: 14,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 30,
            lineHeight: 20,
        },
        searchBarContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 10,
            paddingHorizontal: 15,
            marginBottom: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
        },
        searchIcon: {
            marginRight: 10,
            color: colors.text,
        },
        searchInput: {
            flex: 1,
            height: 50,
            fontSize: 16,
            color: colors.text,
        },
        clearSearchButton: {
            padding: 5,
        },
        categorySection: {
            marginBottom: 30,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        sectionIndicator: {
            width: 4,
            height: 24,
            backgroundColor: colors.primary,
            marginRight: 10,
            borderRadius: 2,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: '600',
            color: colors.text,
        },
        partnersGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        noResultsContainer: {
            alignItems: 'center',
            paddingVertical: 40,
        },
        noResultsText: {
            fontSize: 16,
            color: colors.text,
        },
        loadingText: {
            marginTop: 10,
            color: colors.text,
            fontSize: 16,
        },
        errorText: {
            color: colors.error,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
            marginTop: 10,
        },
        errorDetail: {
            color: colors.textSecondary,
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 20,
        },
        emptyText: {
            color: colors.textSecondary,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
            marginTop: 10,
        },
        emptyDetail: {
            color: colors.textSecondary,
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 20,
        },
        retryButton: {
            backgroundColor: colors.primary,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
            marginTop: 10,
        },
        retryText: {
            color: colors.white,
            fontSize: 16,
            fontWeight: '500',
        },
    });

export default PartnershipsScreen;