
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
    Dimensions,
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT * 0.9;
const ITEM_HEIGHT = 80;
const PADDING_BOTTOM = 40;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProgramItem = ({ program, onToggleExpand, isExpanded, isSubItem = false, onClose }) => {
    if (program.type === 'category') {
        return (
            <View style={styles.categoryContainer}>
                <TouchableOpacity
                    onPress={() => onToggleExpand(program.id)}
                    style={styles.categoryHeader}
                >
                    <View style={styles.categoryInfo}>
                        <Ionicons name="folder-open-outline" size={24} color="#6B7280" />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.categoryTitle}>{program.name}</Text>
                            <Text style={styles.categoryCount}>
                                Up to {program.programs.length} Programs available
                            </Text>
                        </View>
                    </View>
                    <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="#6B7280"
                    />
                </TouchableOpacity>
                {isExpanded && (
                    <View style={styles.subProgramsContainer}>
                        {program.programs.map((subProgram) => (
                            <ProgramItem
                                key={subProgram.id}
                                program={subProgram}
                                isSubItem={true}
                                onClose={onClose}
                            />
                        ))}
                    </View>
                )}
            </View>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.programItem, isSubItem && styles.subProgramItem]}
            onPress={() => {
                onClose();
                router.push('/(screens)/ProgramsInfoScreen')
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={program.icon} size={24} color="#6B7280" />
                <Text style={styles.programText}>{program.name}</Text>
            </View>
        </TouchableOpacity>
    );
};


export default function ProgramsBottomSheet({ visible, onClose, programsData }) {
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const opacity = useSharedValue(0);
    const contextY = useSharedValue(0);
    const [sheetHeight, setSheetHeight] = useState(0);
    const [expandedCategoryId, setExpandedCategoryId] = useState(null);

    // This is the key function to correctly calculate height
    const calculateAndSetHeight = useCallback((idToExpand) => {
        if (!programsData) return;
        const baseHeight = 150;
        let contentHeight = 0;

        programsData.subPrograms.forEach((program) => {
            contentHeight += ITEM_HEIGHT;
            if (program.type === 'category' && program.id === idToExpand) {
                contentHeight += program.programs.length * ITEM_HEIGHT;
            }
        });

        const newHeight = baseHeight + contentHeight + PADDING_BOTTOM;
        setSheetHeight(Math.min(newHeight, MAX_SHEET_HEIGHT));
    }, [programsData]);

    // This effect runs when the sheetHeight state changes
    useEffect(() => {
        if (visible) {
            // Only animate if the sheetHeight has a valid value
            if (sheetHeight > 0) {
                translateY.value = withSpring(SCREEN_HEIGHT - sheetHeight, { damping: 100 });
                opacity.value = withSpring(1);
            }
        } else {
            translateY.value = withSpring(SCREEN_HEIGHT, { damping: 100 });
            opacity.value = withSpring(0);
        }
    }, [visible, sheetHeight]);

    // This effect handles the initial render and state changes
    useEffect(() => {
        calculateAndSetHeight(expandedCategoryId);
    }, [calculateAndSetHeight, expandedCategoryId]);


    const handleToggleExpand = useCallback((categoryId) => {
        // First, update the state, which will trigger the useEffect
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedCategoryId((prevId) => prevId === categoryId ? null : categoryId);
    }, []);

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

    if (!visible || !programsData) return null;

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
                            <Text style={styles.title}>{programsData.title}</Text>
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
                    {programsData.subPrograms.map((program) => (
                        <ProgramItem
                            key={program.id}
                            program={program}
                            onToggleExpand={handleToggleExpand}
                            isExpanded={program.id === expandedCategoryId}
                            onClose={onClose}
                        />
                    ))}
                </ScrollView>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    headerContainer: {
        backgroundColor: '#F9FAFB',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#F9FAFB',
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
        backgroundColor: '#D1D5DB',
        borderRadius: 2,
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
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    closeButton: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    categoryContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    categoryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    categoryCount: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    subProgramsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    programItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    subProgramItem: {
        backgroundColor: '#E5E7EB',
    },
    programText: {
        marginLeft: 15,
        fontSize: 15,
        color: '#1F2937',
    },
});
