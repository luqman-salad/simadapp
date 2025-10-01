import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import {
    Dimensions,
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
import useTheme from '../../hooks/usetheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;
const PEEK_HEIGHT = 370;

const SocialMediaItem = ({ iconName, name, colors }) => (
    <TouchableOpacity style={styles.socialMediaItem} activeOpacity={0.7}>
        <Ionicons name={iconName} size={24} color={colors.primary} style={styles.socialMediaIcon} />
        <Text style={styles.socialMediaText}>{name}</Text>
    </TouchableOpacity>
);

const FollowUsBottomSheet = ({ visible, onClose }) => {
    const { colors } = useTheme();
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

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.backdrop, backdropStyle]}>
                <TouchableOpacity style={styles.backdropTouch} onPress={onClose} />
            </Animated.View>
            <Animated.View style={[styles.sheet, sheetStyle]}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={styles.handleContainer}>
                        <View style={styles.handle} />
                        <View style={styles.header}>
                            <Text style={styles.title}>Follow us</Text>

                        </View>
                        <View style={styles.content}>
                            <SocialMediaItem iconName="logo-facebook" name="Facebook" colors={colors} 
                            onPress={() => Linking.openURL("https://www.facebook.com/simaduni1999")}
                            />
                            <SocialMediaItem iconName="logo-instagram" name="Instagram" colors={colors} />
                            <SocialMediaItem iconName="logo-tiktok" name="TikTok" colors={colors} />
                            <SocialMediaItem iconName="logo-twitter" name="X" colors={colors} />
                        </View>
                    </Animated.View>
                </GestureDetector>

            </Animated.View>
        </View>
    );
};

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
    handleContainer: {
        // ... (styles for the handle and header wrapper)
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
        justifyContent: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        position: 'relative',
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    closeButton: {
        position: 'absolute',
        right: 16,
        top: 12,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    socialMediaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    socialMediaIcon: {
        width: 30,
        textAlign: 'center',
        marginRight: 15,
    },
    socialMediaText: {
        fontSize: 16,
        color: '#000',
    },
});

export default FollowUsBottomSheet;