import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import useTheme from '../hooks/usetheme';
import { useBottomSheet } from '../context/BottomSheetContext';
import { getInstitutions } from '../apis/institutionsApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const { width: screenWidth } = Dimensions.get('window');

export default function InstitutionsCard({ componentKey = "institutions", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const { openSheet } = useBottomSheet();
  const router = useRouter();

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useGlobalLoading(componentKey, loading);

  const fetchInstitutionsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getInstitutions();
      
      if (result?.success && Array.isArray(result.data?.institutions)) {
        setInstitutions(result.data.institutions);
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching institutions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutionsData();
  }, [refreshTrigger]);

  const handleRetry = () => {
    fetchInstitutionsData();
  };

  const handleInstitutionPress = (institution) => {
    // ✅ ADDED: Navigation to InstitutionsInfo screen
    console.log('Navigating with ID:', institution.id);
    
    router.push({
      pathname: '/(screens)/institutionsInfo',
      params: { 
        institutionId: institution.id,
        institutionName: institution.name 
      }
    });
  };

  const handleSeeAllPress = () => {
    // ✅ ADDED: Navigation to full Institutions screen
    router.push('/(drawer)/institutions');
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Our Institutions</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load institutions</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (institutions.length === 0 && !loading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Our Institutions</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No institutions available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with title */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Our Institutions</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {institutions.map((institution, index) => (
          <TouchableOpacity
            key={institution.id}
            onPress={() => handleInstitutionPress(institution)}
            style={styles.cardContainer}
          >
            <ImageBackground
              source={{ uri: institution.image }}
              style={styles.card}
              imageStyle={styles.cardImage}
            >
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              >
                <View style={styles.content}>
                  <Text style={styles.title}>{institution.name}</Text>
                  <Text style={styles.subtitle} numberOfLines={2}>
                    {institution.description || 'Explore our institution'}
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      marginBottom: 25,
      backgroundColor: colors.bg,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
      paddingHorizontal: 5,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.5,
    },
    seeAllText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    scrollContainer: {
      paddingHorizontal: 5,
      paddingVertical: 5,
    },
    cardContainer: {
      width: screenWidth * 0.75,
      marginRight: 15,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    card: {
      height: 180,
      borderRadius: 20,
      overflow: 'hidden',
    },
    cardImage: {
      borderRadius: 20,
    },
    gradient: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: 20,
      borderRadius: 20,
    },
    content: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.white,
      marginBottom: 5,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    subtitle: {
      fontSize: 13,
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: 16,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    errorContainer: {
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      backgroundColor: colors.surface,
      marginHorizontal: 5,
    },
    errorText: {
      fontSize: 14,
      color: colors.error,
      marginBottom: 12,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    retryText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '600',
    },
    emptyContainer: {
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      backgroundColor: colors.surface,
      marginHorizontal: 5,
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });
};