// components/GlobalLoadingOverlay.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import useTheme from '../hooks/usetheme';
import useLoadingStore from '../store/loadingStore';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const GlobalLoadingOverlay = () => {
  const { colors } = useTheme();
  const { isAppLoading, globalError, retryCallback, clearGlobalError } = useLoadingStore();
  
  const handleRetry = () => {
    if (retryCallback) {
      retryCallback();
    }
    clearGlobalError();
  };

  const handleDismiss = () => {
    clearGlobalError();
  };

  if (!isAppLoading && !globalError) return null;
  
  return (
    <View style={[styles.overlay, { backgroundColor: 'rgba(255, 255, 255, 1)' }]}>
      {globalError ? (
        // Error State
        <View style={styles.errorContainer}>
          <Ionicons name="cloud-offline-outline" size={80} color={colors.danger} />
          <Text style={[styles.errorTitle, { color: colors.text }]}>
            Something Went Wrong
          </Text>
          <Text style={[styles.errorMessage, { color: colors.textSecondary }]}>
            {globalError || 'Failed to load data. Please check your connection and try again.'}
          </Text>
          
          <View style={styles.buttonContainer}>
            {retryCallback && (
              <TouchableOpacity 
                style={[styles.retryButton, { backgroundColor: colors.primary }]} 
                onPress={handleRetry}
              >
                <Ionicons name="reload-outline" size={20} color={colors.white} />
                <Text style={[styles.retryButtonText, { color: colors.white }]}>
                  Try Again
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.dismissButton, { borderColor: colors.primary }]} 
              onPress={handleDismiss}
            >
              <Text style={[styles.dismissButtonText, { color: colors.primary }]}>
                Dismiss
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Loading State
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../assets/animations/loading.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
            resizeMode="cover"
          />
          
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <View style={[styles.dot, { backgroundColor: colors.secondary }]} />
            <View style={[styles.dot, { backgroundColor: colors.tertiary }]} />
          </View>
        </View>
      )}
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
    minWidth: 280,
    maxWidth: width * 0.8,
  },
  errorContainer: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 280,
    maxWidth: width * 0.8,
  },
  lottieAnimation: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dismissButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  dismissButtonText: {
    fontSize: 16,
    fontWeight: '600',
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