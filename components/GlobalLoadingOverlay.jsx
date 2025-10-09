// components/GlobalLoadingOverlay.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import useTheme from '../hooks/usetheme';
import useLoadingStore from '../store/loadingStore';

const { width, height } = Dimensions.get('window');

const GlobalLoadingOverlay = () => {
  const { colors } = useTheme();
  const { isAppLoading } = useLoadingStore();
  
  if (!isAppLoading) return null;
  
  return (
    <View style={[styles.overlay, { backgroundColor: 'rgba(255, 255, 255, 0.85)' }]}>
      <View style={styles.loadingContainer}>
        {/* Lottie Animation */}
        <LottieView
          source={require('../assets/animations/loading.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
          resizeMode="cover"
        />
        
        {/* <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading SIMAD University
        </Text> */}
        {/* <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Preparing your experience...
        </Text> */}
        
        {/* Progress Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: colors.secondary }]} />
          <View style={[styles.dot, { backgroundColor: colors.tertiary }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingContainer: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 10,
    minWidth: 280,
    maxWidth: width * 0.8,
  },
  lottieAnimation: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    opacity: 0.6,
  },
});

export default GlobalLoadingOverlay;