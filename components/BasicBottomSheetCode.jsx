
// // components/ProgramsBottomSheet.jsx
// import { Ionicons } from '@expo/vector-icons';
// import { useEffect } from 'react';
// import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { PanGestureHandler } from 'react-native-gesture-handler';
// import Animated, {
//     runOnJS,
//     useAnimatedGestureHandler,
//     useAnimatedStyle,
//     useSharedValue,
//     withSpring,
// } from 'react-native-reanimated';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// const SHEET_HEIGHT = 600;
// const PEEK_HEIGHT = 150;


// export default function ProgramsBottomSheet({ visible, onClose }) {
//     const translateY = useSharedValue(SCREEN_HEIGHT);
//     const opacity = useSharedValue(0);

//     useEffect(() => {
//         if (visible) {
//             translateY.value = withSpring(SCREEN_HEIGHT - SHEET_HEIGHT, { damping: 100 });
//             opacity.value = withSpring(1);
//         } else {
//             translateY.value = withSpring(SCREEN_HEIGHT, { damping: 100 });
//             opacity.value = withSpring(0);
//         }
//     }, [visible]);

//     const gestureHandler = useAnimatedGestureHandler < GestureHandlerGestureEvent > ({
//         onStart: (_, context) => {
//             context.startY = translateY.value;
//         },
//         onActive: (event, context) => {
//             // Limit the upward movement to prevent pulling the sheet off the screen
//             const newY = context.startY + event.translationY;
//             translateY.value = Math.max(newY, SCREEN_HEIGHT - SHEET_HEIGHT);
//         },
//         onEnd: (event) => {
//             if (event.velocityY > 500 || translateY.value > SCREEN_HEIGHT - PEEK_HEIGHT) {
//                 // Close the sheet if swiped down fast or dragged past the halfway point
//                 translateY.value = withSpring(SCREEN_HEIGHT);
//                 opacity.value = withSpring(0);
//                 runOnJS(onClose)();
//             } else {
//                 // Snap back to the full sheet position
//                 translateY.value = withSpring(SCREEN_HEIGHT - SHEET_HEIGHT, { damping: 100 });
//                 opacity.value = withSpring(1);

//             }
//         },
//     });
//     const backdropStyle = useAnimatedStyle(() => ({
//         opacity: opacity.value * 0.5,
//     }));

//     const sheetStyle = useAnimatedStyle(() => ({
//         transform: [{ translateY: translateY.value }],
//     }));

//     if (!visible) return null;


//     return (
//         <View style={styles.container}>
//             <Animated.View style={[styles.backdrop, backdropStyle]}>
//                 <TouchableOpacity style={styles.backdropTouch} onPress={onClose} />
//             </Animated.View>
//             <Animated.View style={[styles.sheet, sheetStyle]}>
//                 <PanGestureHandler onGestureEvent={gestureHandler}>
//                     <Animated.View>
//                         <View style={styles.handle} />

//                         <View style={styles.header}>
//                             <Text style={styles.title}> {/* selectedSchool.title*/}Programs</Text>
//                             <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//                                 <Ionicons name={'X'} size={20} style={{ color: '#6B7280' }} />
//                             </TouchableOpacity>
//                         </View>
//                     </Animated.View>
//                 </PanGestureHandler>
//                 <ScrollView
//                     style={styles.scrollView}
//                     showsVerticalScrollIndicator={false}
//                     contentContainerStyle={styles.scrollContent}
//                     bounces={false}
//                     overScrollMode="never"
//                     scrollEventThrottle={16}
//                 >


//                 </ScrollView>


//             </Animated.View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 10000,
//     },
//     backdrop: {
//         flex: 1,
//         backgroundColor: '#000',
//     },
//     backdropTouch: {
//         flex: 1,
//     },
//     sheet: {
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         height: SHEET_HEIGHT,
//         backgroundColor: '#FFFFFF',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//         elevation: 5,
//     },
//     handle: {
//         width: 40,
//         height: 4,
//         backgroundColor: '#D1D5DB',
//         borderRadius: 2,
//         alignSelf: 'center',
//         marginTop: 12,
//         marginBottom: 20,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 20,
//         paddingBottom: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#F3F4F6',
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#111827',
//     },
//     closeButton: {
//         padding: 4,
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         padding: 20,
//         paddingBottom: 40,
//     },

// });