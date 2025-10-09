// components/GlobalLoadingOverlay.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import useTheme from '../hooks/usetheme';
import useLoadingStore from '../store/loadingStore';

const { width } = Dimensions.get('window');

const GlobalLoadingOverlay = () => {
  const { colors } = useTheme();
  const { isAppLoading } = useLoadingStore();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isAppLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.1,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      pulseAnim.setValue(1);
    }
  }, [isAppLoading]);

  if (!isAppLoading) return null;

  return (
    <Animated.View 
      style={[
        styles.overlay, 
        { backgroundColor: 'rgba(0, 0, 0, 0.85)' },
        { opacity: fadeAnim }
      ]}
    >
      <Animated.View 
        style={[
          styles.loadingContainer, 
          { backgroundColor: colors.bg },
          { transform: [{ scale: pulseAnim }] }
        ]}
      >
        {/* Modern Spinner */}
        <View style={styles.spinnerContainer}>
          <View style={[styles.spinner, { borderColor: colors.primary }]}>
            <View style={[styles.spinnerInner, { backgroundColor: colors.primary }]} />
          </View>
        </View>
        
        <Text style={[styles.loadingText, { color: colors.text }]}>
          SIMAD University
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Loading your academic portal
        </Text>
        
        {/* Progress Bar */}
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <Animated.View 
            style={[
              styles.progressFill,
              { 
                backgroundColor: colors.primary,
                transform: [{ scaleX: pulseAnim }]
              }
            ]} 
          />
        </View>
      </Animated.View>
    </Animated.View>
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
    padding: 35,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 280,
    maxWidth: width * 0.8,
  },
  spinnerContainer: {
    marginBottom: 25,
  },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  spinnerInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.6,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
  progressBar: {
    width: 120,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
});

export default GlobalLoadingOverlay;