import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalLoading } from '../../hooks/useGlobalLoading';

export default function Ocms({ componentKey = "ocms-webview", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();
  const webViewRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
    setProgress(0);
  };

  const handleLoadProgress = ({ nativeEvent }) => {
    setProgress(nativeEvent.progress);
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setProgress(1);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    webViewRef.current?.reload();
  };

  // Remove individual loading display - global overlay handles it
  // But keep error state display
  if (error) {
    return (
      <View style={styles.container}>
        <Header
          title="Student Portal"
          showLeftIcon
          leftIconName="menu"
          onLeftIconPress={() => navigationTab.openDrawer()}
        />
        <View style={styles.errorContainer}>
          <View style={styles.errorContent}>
            <Ionicons name="cloud-offline-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.errorTitle}>Connection Error</Text>
            <Text style={styles.errorMessage}>
              Unable to load the student portal. Please check your internet connection and try again.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Ionicons name="reload-outline" size={20} color={colors.white} />
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Student Portal"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
      
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://ocms.simad.edu.so' }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadProgress={handleLoadProgress}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
      
      {/* Progress indicator that shows during loading (optional, if you want visual feedback) */}
      {loading && progress > 0 && progress < 1 && (
        <View style={styles.progressIndicator}>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar,
                { 
                  width: `${progress * 100}%`,
                  backgroundColor: colors.primary
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        </View>
      )}
    </View>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    webview: {
      flex: 1,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
    },
    errorContent: {
      alignItems: 'center',
      padding: 30,
      maxWidth: 300,
    },
    errorTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 20,
      marginBottom: 10,
    },
    errorMessage: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 30,
    },
    retryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      gap: 8,
    },
    retryButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
    progressIndicator: {
      position: 'absolute',
      top: 60, // Below header
      left: 0,
      right: 0,
      backgroundColor: colors.surface,
      paddingVertical: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    progressBarContainer: {
      width: 200,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      borderRadius: 2,
    },
    progressText: {
      marginTop: 8,
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });
};