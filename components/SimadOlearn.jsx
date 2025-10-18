import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import useTheme from '../hooks/usetheme';
import { getProgramsByCategoryId } from '../apis/academicProgramsApi'; 
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = (screenWidth - 60) / 2; // 2 cards with spacing

const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

const GridCard = ({ item, styles, onPress, index }) => (
    <Pressable 
        onPress={onPress}
        style={({ pressed }) => [
            styles.cardContainer,
            { transform: [{ scale: pressed ? 0.98 : 1 }] }
        ]}
    >
        <LinearGradient
            colors={[styles.colors.surface, styles.colors.surface + 'DD']}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {/* Background Pattern */}
            <View style={styles.pattern} />
            
            {/* Content */}
            <View style={styles.cardContent}>
                {/* Icon Container with Gradient */}
                <LinearGradient
                    colors={[styles.colors.primary + '20', styles.colors.primary + '40']}
                    style={styles.iconContainer}
                >
                    {item.logoUrl ? (
                        <Image 
                            source={{ uri: item.logoUrl }} 
                            style={styles.icon} 
                            resizeMode="contain"
                        />
                    ) : (
                        <Text style={styles.fallbackIcon}>🏫</Text>
                    )}
                </LinearGradient>

                {/* School Name */}
                <Text style={styles.title} numberOfLines={2}>
                    {item.name}
                </Text>

                {/* Explore Text */}
                <View style={styles.exploreContainer}>
                    <Text style={styles.exploreText}>Explore</Text>
                    <Text style={styles.arrow}>→</Text>
                </View>
            </View>
        </LinearGradient>
    </Pressable>
);

export default function HorizontalTwoRowGrid({ route, componentKey = "institutions", refreshTrigger = 0 }) {
    const categoryId = route?.params?.categoryId;
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const router = useRouter(); // ✅ ADDED ROUTER HOOK
    
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useGlobalLoading(componentKey, loading);

    const fetchSchools = async (id) => {
        if (!id) {
            setLoading(false);
            setError("Category ID is missing. Cannot fetch programs.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const result = await getProgramsByCategoryId(id);
            
            if (result.success && result.data && result.data.schools) {
                const transformedData = result.data.schools.map(school => ({
                    id: school._id,
                    name: school.name,
                    logoUrl: school.logoUrl,
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
        fetchSchools(categoryId);
    }, [categoryId, refreshTrigger]);

    // ✅ UPDATED: Navigation function same as undergraduate
    const handlePress = (schoolId, schoolName) => {
        console.log('School pressed:', schoolId, schoolName);
        
        router.push({
            pathname: '/(screens)/SchoolInfoScreen',
            params: { 
                schoolId: schoolId, 
                schoolName: schoolName 
            }
        });
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <View style={styles.errorIconContainer}>
                    <Text style={styles.errorIcon}>🏫</Text>
                </View>
                <Text style={styles.errorTitle}>Unable to Load</Text>
                <Text style={styles.errorText}>{error}</Text>
                <Pressable style={styles.retryButton} onPress={() => fetchSchools(categoryId)}>
                    <Text style={styles.retryText}>Try Again</Text>
                </Pressable>
            </View>
        );
    }
    
    if (!schools || schools.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.emptyIconContainer}>
                    <Text style={styles.emptyIcon}>📚</Text>
                </View>
                <Text style={styles.emptyTitle}>No Schools Available</Text>
                <Text style={styles.emptyText}>Check back later for updates</Text>
            </View>
        );
    }

    const chunkedSchools = chunkArray(schools, 2);
    let globalIndex = 0;

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {chunkedSchools.map((column, columnIndex) => (
                <View key={`col-${columnIndex}`} style={styles.column}>
                    {column.map((item) => (
                        <GridCard 
                            key={item.id} 
                            item={item} 
                            styles={{...styles, colors}} 
                            // ✅ UPDATED: Using the handlePress function
                            onPress={() => handlePress(item.id, item.name)}
                            index={globalIndex++}
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
            paddingHorizontal: 20,
            paddingVertical: 15,
            paddingBottom: 25,
            backgroundColor: colors.bg,
            width: "100%"
        },
        column: {
            marginRight: 15,
            gap: 12,
        },
        cardContainer: {
            width: CARD_WIDTH,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 10,
        },
        card: {
            height: 160,
            borderRadius: 20,
            padding: 16,
            overflow: 'hidden',
            position: 'relative',
        },
        pattern: {
            position: 'absolute',
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            backgroundColor: colors.primary + '15',
            borderRadius: 40,
            transform: [{ rotate: '45deg' }],
        },
        cardContent: {
            flex: 1,
            justifyContent: 'space-between',
        },
        iconContainer: {
            width: 50,
            height: 50,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginBottom: 12,
        },
        icon: {
            width: 28,
            height: 28,
        },
        fallbackIcon: {
            fontSize: 20,
        },
        title: {
            fontSize: 15,
            fontWeight: '700',
            color: colors.text,
            lineHeight: 20,
            marginBottom: 8,
            flexShrink: 1,
        },
        exploreContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        exploreText: {
            fontSize: 12,
            fontWeight: '600',
            color: colors.primary,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        arrow: {
            fontSize: 14,
            fontWeight: '700',
            color: colors.primary,
        },
        errorContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
            borderRadius: 20,
            backgroundColor: colors.surface,
            margin: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
        },
        errorIconContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.error + '20',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
        },
        errorIcon: {
            fontSize: 32,
        },
        errorTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 8,
            textAlign: 'center',
        },
        errorText: {
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 20,
        },
        emptyContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
            borderRadius: 20,
            backgroundColor: colors.surface,
            margin: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
        },
        emptyIconContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primary + '20',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
        },
        emptyIcon: {
            fontSize: 32,
        },
        emptyTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 8,
            textAlign: 'center',
        },
        emptyText: {
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 20,
        },
        retryButton: {
            backgroundColor: colors.primary,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 12,
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
        },
        retryText: {
            color: colors.white,
            fontSize: 16,
            fontWeight: '600',
        },
    });
};