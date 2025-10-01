import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Dimensions, Pressable } from 'react-native';
import useTheme from '../hooks/usetheme';
import { getProgramsByCategoryId } from '../apis/academicProgramsApi'; 

// Constants
const CARD_MARGIN = 10;
const CARD_WIDTH = 150; // Use a fixed width for stable horizontal layout

// Utility function to split array into chunks (columns)
const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

// Component for a single card in the grid
const GridCard = ({ item, styles }) => (
    <Pressable 
        style={({ pressed }) => [
            styles.card, 
            { width: CARD_WIDTH, opacity: pressed ? 0.8 : 1 } 
        ]}
        onPress={() => console.log('Card Pressed:', item.name)} 
    >
        {/* Using URI for dynamic image and Pressable for interaction */}
        <Image 
            source={{ uri: item.logoUrl }} 
            style={styles.icon} 
            resizeMode="contain"
            // Use local icon if logoUrl is missing or fails to load 
            defaultSource={require('../assets/icons/desktop-computer.png')} 
        />
        <Text style={styles.title} numberOfLines={2}>
            {item.name}
        </Text>
    </Pressable>
);

// ⭐ Component now accepts props, where the categoryId will be found ⭐
export default function HorizontalTwoRowGrid({ route }) {
    // The categoryId is passed via the tab navigator's initialParams, 
    // and is accessible either directly via props or via route.params.
    // Assuming the tab component is passed directly:
    const categoryId = route?.params?.categoryId; // Safely access the passed ID

    const { colors } = useTheme();
    const styles = createStyle(colors);
    
    // State to manage data, loading, and errors
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSchools = async (id) => {
        if (!id) {
            setLoading(false);
            setError("Category ID is missing. Cannot fetch programs.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            // ⭐ USE THE PASSED CATEGORY ID HERE ⭐
            const result = await getProgramsByCategoryId(id);
            
            if (result.success && result.data && result.data.schools) {
                const transformedData = result.data.schools.map(school => ({
                    id: school._id,
                    name: school.name,
                    logoUrl: school.logoUrl || 'https://placeholder.com/40x40', 
                }));
                setSchools(transformedData);
            } else {
                throw new Error(result.message || 'Invalid data structure.');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching schools data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchools(categoryId); // Pass the retrieved categoryId to the fetch function
    }, [categoryId]); // Re-run effect if categoryId changes (e.g., if component is reused)

    // A utility style to ensure these states are centered vertically in the available space
    const centerStyle = { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg, height: 250 };

    if (loading) {
        return (
            <View style={centerStyle}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading programs...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={centerStyle}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <Text style={styles.retryText} onPress={() => fetchSchools(categoryId)}>
                    Tap to retry
                </Text>
            </View>
        );
    }
    
    if (!schools || schools.length === 0) {
        return (
            <View style={centerStyle}>
                <Text style={styles.errorText}>No programs found.</Text>
            </View>
        );
    }

    // --- Render Grid ---
    const chunkedSchools = chunkArray(schools, 2); 
    
    // To maintain the original visual style and centering, we use Dimensions check
    const screenWidth = Dimensions.get('window').width;
    const totalContentWidth = chunkedSchools.length * (CARD_WIDTH + CARD_MARGIN) + CARD_MARGIN;
    const isScrollable = totalContentWidth > screenWidth;

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
                styles.scrollContainer,
                !isScrollable && { justifyContent: 'center', minWidth: '100%' }, 
                isScrollable && { paddingHorizontal: CARD_MARGIN }
            ]}
        >
            {chunkedSchools.map((column, index) => (
                <View 
                    key={`col-${index}`} 
                    style={[
                        styles.column, 
                        { marginRight: CARD_MARGIN } 
                    ]}
                >
                    {column.map((item) => (
                        <GridCard 
                            key={item.id} 
                            item={item} 
                            styles={styles} 
                        />
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const createStyle = (colors) => {
    return StyleSheet.create({
        scrollContainer: {
            paddingVertical: 20,
            backgroundColor: colors.bg,
            paddingBottom: 20,
            alignItems: "center",
        },
        column: {
            marginRight: 10,
            justifyContent: 'space-between',
        },
        card: {
            backgroundColor: colors.surface,
            // width: "100%", // Fixed to CARD_WIDTH in component
            height: 110,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 3, 
            borderWidth: 1,
            borderColor: colors.border,
        },
        icon: {
            width: 40,
            height: 40,
            marginBottom: 8,
            resizeMode: 'contain',
        },
        title: {
            fontSize: 13,
            fontWeight: '500',
            color: colors.text,
            textAlign: 'center',
        },
        // Additional styles for the loading/error states
        loadingText: {
            marginTop: 10,
            color: colors.text,
        },
        errorText: {
            color: colors.error || 'red', 
            fontSize: 14,
            textAlign: 'center',
        },
        retryText: {
            color: colors.primary || 'blue', 
            fontSize: 14,
            textDecorationLine: 'underline',
            marginTop: 5,
        },
    });
};