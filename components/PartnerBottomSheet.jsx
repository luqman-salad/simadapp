import useTheme from '@/hooks/usetheme';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = 700;
const PEEK_HEIGHT = 150;

export default function PartnerBottomSheet({ visible, onClose, partner }) {
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const opacity = useSharedValue(0);
    const contextY = useSharedValue(0);

    const { colors } = useTheme();
  const styles = createStyle(colors);

    useEffect(() => {
        if (visible) {
            translateY.value = withSpring(SCREEN_HEIGHT - SHEET_HEIGHT, { damping: 100 });
            opacity.value = withSpring(1);
        } else {
            translateY.value = withSpring(SCREEN_HEIGHT, { damping: 100 });
            opacity.value = withSpring(0);
        }
    }, [visible]);

    const panGesture = Gesture.Pan()
        .onStart(() => {
            contextY.value = translateY.value;
        })
        .onUpdate((event) => {
            const newY = contextY.value + event.translationY;
            translateY.value = Math.max(newY, SCREEN_HEIGHT - SHEET_HEIGHT);
        })
        .onEnd((event) => {
            if (event.velocityY > 500 || translateY.value > SCREEN_HEIGHT - PEEK_HEIGHT) {
                translateY.value = withSpring(SCREEN_HEIGHT);
                opacity.value = withSpring(0);
                runOnJS(onClose)();
            } else {
                translateY.value = withSpring(SCREEN_HEIGHT - SHEET_HEIGHT, { damping: 100 });
                opacity.value = withSpring(1);
            }
        });

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: opacity.value * 0.5,
    }));

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    if (!visible || !partner) return null;

    return (
        <View style={styles.container}>
            {/* Backdrop */}
            <Animated.View style={[styles.backdrop, backdropStyle]}>
                <TouchableOpacity style={styles.backdropTouch} onPress={onClose} />
            </Animated.View>

            {/* Sheet */}
            <Animated.View style={[styles.sheet, sheetStyle]}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View>
                        <View style={styles.handle} />
                        <View style={styles.header}>
                            <Text style={styles.title}>Partner</Text>
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
                    {/* Logo */}
                    {partner.logo ? (
                        <Image 
                            source={{ uri: partner.logo }} 
                            style={styles.logo} 
                            resizeMode="contain" 
                        />
                    ) : (
                        <View style={styles.placeholderLogo}>
                            <Text style={styles.placeholderText}>
                                {partner.name.charAt(0)}
                            </Text>
                        </View>
                    )}

                    {/* Partner Details */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{partner.name}</Text>
                        
                        {partner.description && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>About</Text>
                                <Text style={styles.description}>{partner.description}</Text>
                            </View>
                        )}

                        {partner.howLong && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Partnership Duration</Text>
                                <Text style={styles.duration}>{partner.howLong}</Text>
                            </View>
                        )}

                        {/* Additional partner information can be added here */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Collaboration Areas</Text>
                            <Text style={styles.collaboration}>
                                {getCollaborationAreas(partner.name)}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
        </View>
    );
}

// Helper function to determine collaboration areas based on partner name
const getCollaborationAreas = (partnerName) => {
    const name = partnerName.toLowerCase();
    
    if (name.includes('google') || name.includes('microsoft') || name.includes('ibm')) {
        return 'Technology, Cloud Computing, AI & Machine Learning, Research & Development';
    } else if (name.includes('oxford') || name.includes('education')) {
        return 'Academic Exchange, Joint Research, Faculty Development, Student Programs';
    } else if (name.includes('red cross') || name.includes('unicef')) {
        return 'Community Health, Education Programs, Humanitarian Projects, Social Development';
    } else if (name.includes('deloitte') || name.includes('world bank')) {
        return 'Financial Literacy, Economic Development, Professional Training, Consultancy';
    } else {
        return 'Academic Collaboration, Research Partnerships, Student Exchange Programs';
    }
};

const createStyle = (colors) => {
  return StyleSheet.create({
    container: { 
        ...StyleSheet.absoluteFillObject, 
        justifyContent: 'flex-end' 
    },
    backdrop: { 
        ...StyleSheet.absoluteFillObject, 
        backgroundColor: 'black' 
    },
    backdropTouch: { 
        flex: 1 
    },
    sheet: {
        height: SHEET_HEIGHT,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
        backgroundColor: colors.surface
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: colors.primary,
        borderRadius: 3,
        alignSelf: 'center',
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: { 
        fontSize: 18, 
        fontWeight: 'bold',
        textAlign: "center",
        flex: 1,
        marginRight: 10,
        color: colors.text
    },
    closeButton: { 
        padding: 4,
        color: colors.text
    },
    scrollView: { 
        flex: 1 
    },
    scrollContent: { 
        padding: 16,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: colors.surface,
        alignSelf: 'center',
    },
    placeholderLogo: {
        width: 120,
        height: 120,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: colors.bg,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    placeholderText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.text,
    },
    detailsContainer: {
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: colors.text,
        lineHeight: 22,
        textAlign: 'justify',
    },
    duration: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: '500',
    },
    collaboration: {
        fontSize: 15,
        color: colors.text,
        lineHeight: 22,
    },
});
}