import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
    Dimensions,
    LayoutAnimation,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Image
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { getProgramsByCategoryId } from '../apis/academicProgramsApi';
import useTheme from '../hooks/usetheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT * 0.9;
const ITEM_HEIGHT = 80;
const PADDING_BOTTOM = 40;

const SchoolItem = ({ school, onClose }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    return (
        <TouchableOpacity
            style={styles.schoolItem}
            onPress={() => {
                onClose();
                router.push('/(screens)/ProgramsInfoScreen')
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {school.logoUrl ? (
                    <Image 
                        source={{ uri: school.logoUrl }} 
                        style={styles.schoolLogo} 
                        resizeMode="contain" 
                    />
                ) : (
                    <View style={styles.placeholderLogo}>
                        <Ionicons name="school-outline" size={24} color="#6B7280" />
                    </View>
                )}
                <Text style={styles.schoolText}>{school.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
    );
};

export default function ProgramsBottomSheet({ visible, onClose, categoryId }) {
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const opacity = useSharedValue(0);
    const contextY = useSharedValue(0);
    const [sheetHeight, setSheetHeight] = useState(0);

    const { colors } = useTheme();
    const styles = createStyle(colors);
    
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    // Fetch schools data when categoryId changes and sheet becomes visible
    const fetchSchoolsData = useCallback(async () => {
        if (!categoryId) return;
        
        try {
            setLoading(true);
            setError(null);
            const result = await getProgramsByCategoryId(categoryId);
            
            if (result?.success && result.data?.schools) {
                setSchools(result.data.schools);
                // Set category name based on the ID (you might want to fetch this from API)
                setCategoryName(getCategoryName(categoryId));
            } else {
                throw new Error('No schools data received');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching schools:', err);
        } finally {
            setLoading(false);
        }
    }, [categoryId]);

    // Helper function to get category name from ID
    const getCategoryName = (id) => {
        const categoryMap = {
            '68d7be340d572b80fc72ecde': 'Postgraduate',
            '68d7be410d572b80fc72ece1': 'Undergraduate', 
            '68d7be570d572b80fc72ece4': 'Olearn'
        };
        return categoryMap[id] || 'Programs';
    };

    // Calculate sheet height based on schools data
    const calculateAndSetHeight = useCallback(() => {
        const baseHeight = 150;
        let contentHeight = 0;

        if (loading) {
            contentHeight = ITEM_HEIGHT; // Height for loading indicator
        } else if (error) {
            contentHeight = ITEM_HEIGHT * 2; // Height for error message
        } else if (schools.length > 0) {
            contentHeight = schools.length * ITEM_HEIGHT;
        } else {
            contentHeight = ITEM_HEIGHT; // Height for empty state
        }

        const newHeight = baseHeight + contentHeight + PADDING_BOTTOM;
        setSheetHeight(Math.min(newHeight, MAX_SHEET_HEIGHT));
    }, [schools, loading, error]);

    // Handle visibility and data fetching
    useEffect(() => {
        if (visible && categoryId) {
            fetchSchoolsData();
        } else {
            // Reset states when closing
            setSchools([]);
            setLoading(true);
            setError(null);
            setCategoryName('');
        }
    }, [visible, categoryId, fetchSchoolsData]);

    // Calculate height when data changes
    useEffect(() => {
        calculateAndSetHeight();
    }, [calculateAndSetHeight]);

    // Animate sheet when visible or height changes
    useEffect(() => {
        if (visible) {
            if (sheetHeight > 0) {
                translateY.value = withSpring(SCREEN_HEIGHT - sheetHeight, { damping: 100 });
                opacity.value = withSpring(1);
            }
        } else {
            translateY.value = withSpring(SCREEN_HEIGHT, { damping: 100 });
            opacity.value = withSpring(0);
        }
    }, [visible, sheetHeight]);

    const panGesture = Gesture.Pan()
        .onStart(() => {
            contextY.value = translateY.value;
        })
        .onUpdate((event) => {
            const newY = contextY.value + event.translationY;
            translateY.value = Math.max(newY, SCREEN_HEIGHT - sheetHeight);
        })
        .onEnd((event) => {
            if (event.velocityY > 500 || translateY.value > SCREEN_HEIGHT - 150) {
                translateY.value = withSpring(SCREEN_HEIGHT);
                opacity.value = withSpring(0);
                runOnJS(onClose)();
            } else {
                translateY.value = withSpring(SCREEN_HEIGHT - sheetHeight, { damping: 100 });
                opacity.value = withSpring(1);
            }
        });

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: opacity.value * 0.5,
    }));

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        height: sheetHeight,
    }));

    if (!visible || !categoryId) return null;

    return (
        <>
            <Animated.View style={[styles.backdrop, backdropStyle]}>
                <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
            </Animated.View>
            <Animated.View style={[styles.sheet, sheetStyle]}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={{
                            backgroundColor: '#F9FAFB',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <View style={styles.handle} />
                        <View style={styles.header}>
                            <Text style={styles.title}>{categoryName} Programs</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </GestureDetector>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    bounces={false}
                    overScrollMode="never"
                >
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#3B82F6" />
                            <Text style={styles.loadingText}>Loading schools...</Text>
                        </View>
                    ) : error ? (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
                            <Text style={styles.errorText}>Failed to load schools</Text>
                            <Text style={styles.errorDetail}>{error}</Text>
                            <TouchableOpacity 
                                style={styles.retryButton} 
                                onPress={fetchSchoolsData}
                            >
                                <Text style={styles.retryText}>Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    ) : schools.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="school-outline" size={48} color="#6B7280" />
                            <Text style={styles.emptyText}>No schools available</Text>
                            <Text style={styles.emptyDetail}>
                                There are currently no schools for this category.
                            </Text>
                        </View>
                    ) : (
                        schools.map((school) => (
                            <SchoolItem
                                key={school._id}
                                school={school}
                                onClose={onClose}
                            />
                        ))
                    )}
                </ScrollView>
            </Animated.View>
        </>
    );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.black,
    },
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: colors.bg,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: colors.text,
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
    },
    closeButton: {
        padding: 4,
        color: colors.text
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    schoolItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    schoolLogo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
    },
    placeholderLogo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: colors.bg,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    schoolText: {
        fontSize: 16,
        color: colors.text,
        fontWeight: '500',
        flex: 1,
    },
    loadingContainer: {
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: colors.text,
    },
    errorContainer: {
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.danger,
        marginTop: 12,
        marginBottom: 8,
    },
    errorDetail: {
        fontSize: 14,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textMuted,
        marginTop: 12,
        marginBottom: 8,
    },
    emptyDetail: {
        fontSize: 14,
        color: colors.textMuted,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '500',
    },
});
}