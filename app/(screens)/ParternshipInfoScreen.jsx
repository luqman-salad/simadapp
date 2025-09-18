import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Header } from '../../components/Headrer';
import PartnerBottomSheet from '../../components/PartnerBottomSheet';
import useTheme from '../../hooks/usetheme'; // Adjust the path as needed

const { width } = Dimensions.get('window');

// Dummy Data for demonstration
const PARTNERSHIPS_DATA = [
    {
        id: 'internal',
        title: 'Internal Uni Partners',
        partners: [
            { id: 't1', name: 'Tech Partner 1', description: 'This is a detailed description for a tech partner. It collaborates on various projects related to climate science, biology, and advanced engineering. Our collaboration helps our students gain real-world experience. This is a detailed description for a tech partner. It collaborates on various projects related to climate science, biology, and advanced engineering. Our collaboration helps our students gain real-world experience.', logo: 'P1' },
            { id: 't2', name: 'Tech Partner 2', description: 'Description for Tech Partner 2.', logo: 'P2' },
            { id: 't3', name: 'Tech Partner 3', description: 'Description for Tech Partner 3.', logo: 'P3' },
            { id: 't4', name: 'Tech Partner 4', description: 'Description for Tech Partner 4.', logo: 'P4' },
            { id: 't5', name: 'Tech Partner 5', description: 'Description for Tech Partner 5.', logo: 'P5' },
            { id: 't6', name: 'Tech Partner 6', description: 'Description for Tech Partner 6.', logo: 'P6' },
        ],
    },
    {
        id: 'research',
        title: 'Research Collaborators',
        partners: [
            { id: 'r1', name: 'Research Partner 1', description: 'Description for Research Partner 1.', logo: 'P1' },
            { id: 'r2', name: 'Research Partner 2', description: 'Description for Research Partner 2.', logo: 'P2' },
            { id: 'r3', name: 'Research Partner 3', description: 'Description for Research Partner 3.', logo: 'P3' },
            { id: 'r4', name: 'Research Partner 4', description: 'Description for Research Partner 4.', logo: 'P4' },
        ],
    },
    {
        id: 'community',
        title: 'Community Outreach',
        partners: [
            { id: 'c1', name: 'Community Partner 1', description: 'Description for Community Partner 1.', logo: 'C1' },
            { id: 'c2', name: 'Community Partner 2', description: 'Description for Community Partner 2.', logo: 'C2' },
        ],
    },
];

const PartnerCard = ({ partner, onPress, colors }) => (
    <TouchableOpacity
        style={createPartnerCardStyles(colors).partnerCard}
        onPress={() => onPress(partner)}
    >
        <View style={createPartnerCardStyles(colors).partnerLogoContainer}>
            <Text style={createPartnerCardStyles(colors).partnerLogoText}>{partner.logo}</Text>
        </View>
        <Text style={createPartnerCardStyles(colors).partnerName}>{partner.name}</Text>
    </TouchableOpacity>
);

const createPartnerCardStyles = (colors) =>
    StyleSheet.create({
        partnerCard: {
            width: (width - 60) / 2, // 20 padding each side, 20 gap in middle
            // aspectRatio: 1, // Makes the card square
            height: 150,
            backgroundColor: colors.surface,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
            elevation: 3,
        },
        partnerLogoContainer: {
            width: 70,
            height: 70,
            backgroundColor: colors.border, // Light grey for the 'P1' box
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
        },
        partnerLogoText: {
            fontSize: 24,
            fontWeight: '600',
            color: colors.text,
        },
        partnerName: {
            fontSize: 13,
            fontWeight: '500',
            color: colors.text,
            textAlign: 'center',
            paddingHorizontal: 5,
        },
    });

const PartnershipsScreen = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [sheetVisible, setSheetVisible] = useState(false);

    const handleSearch = useCallback((text) => {
        setSearchQuery(text);
    }, []);



    const filteredPartnerships = PARTNERSHIPS_DATA.map((category) => {
        const filteredPartners = category.partners.filter((partner) =>
            partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            partner.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...category, partners: filteredPartners };
    }).filter((category) => category.partners.length > 0);

    const hasSearchResults = filteredPartnerships.some(category => category.partners.length > 0);

    return (
        <View style={styles.container}>
            <Header
                title='Parternships'
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
                    Collaborating with a network of over 200 industry leaders and research institutions to drive innovation and create new opportunities for our community.
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
                                        onPress={() => {
                                            setSelectedPartner(partner);
                                            setSheetVisible(true);
                                        }}
                                        colors={colors}
                                    />
                                ))}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            <PartnerBottomSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                partner={selectedPartner}
            />
        </View>
    );
};

const createStyles = (colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg, // Assuming a light background for the whole screen
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            paddingTop: 30,
            paddingHorizontal: 20,
            paddingBottom: 40,
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
            // marginBottom: 30,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        sectionIndicator: {
            width: 4,
            height: 24,
            backgroundColor: colors.primary, // Blue vertical line
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
        },
        noResultsText: {
            fontSize: 16,
            color: colors.text,
        },

        // Modal Styles
        modalBackdrop: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: '85%',
            maxHeight: '70%',
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: 25,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 8,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
        },
        modalTitle: {
            fontSize: 22,
            fontWeight: '700',
            color: colors.primary,
            flex: 1,
            marginRight: 10,
        },
        modalCloseButton: {
            padding: 5,
        },
        modalDescriptionScrollView: {
            maxHeight: Dimensions.get('window').height * 0.4, // Limit scroll view height
        },
        modalDescription: {
            fontSize: 16,
            color: colors.text,
            lineHeight: 24,
        },
    });

export default PartnershipsScreen;