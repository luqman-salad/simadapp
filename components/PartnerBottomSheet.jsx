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
                            <Text style={styles.title}>{partner.name}</Text>
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
                    {/* Logo */}
                    {partner.logo && (
                        <Image source={{ uri: partner.logo }} style={styles.logo} resizeMode="contain" />
                    )}

                    {/* Info */}
                    <Text style={styles.category}>{partner.name}</Text>
                    <Text style={styles.info}>{partner.description}</Text>
                </ScrollView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end' },
    backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'black' },
    backdropTouch: { flex: 1 },
    sheet: {
        height: SHEET_HEIGHT,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 3,
        alignSelf: 'center',
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    closeButton: { padding: 4 },
    scrollView: { flex: 1 },
    scrollContent: { padding: 16, alignItems: 'center' },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
    },
    category: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
    info: { fontSize: 15, color: '#374151', textAlign: 'center' },
});
