import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import useTheme from '../hooks/usetheme';
import { useBottomSheet } from '../context/BottomSheetContext';
import { getPartners } from '../apis/partinershipsApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading'; // Import the global loading hook

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function PartnersCard({ componentKey = "partners", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const { openSheet } = useBottomSheet();

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  const fetchPartnersData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getPartners();
      
      if (result?.success && Array.isArray(result.data)) {
        // Flatten all partners from all categories
        const allPartners = result.data.flatMap(category => category.partners);
        setPartners(allPartners);
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching partners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnersData();
  }, [refreshTrigger]); // Add refreshTrigger to dependencies

  const chunkedPartners = chunkArray(partners, 2); // 2 items per column

  const handleSeeAll = () => {
    router.push('/(screens)/ParternshipInfoScreen');
  };

  const handleRetry = () => {
    fetchPartnersData();
  };

  // Remove individual loading display - global overlay handles it
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Our Partners</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load partners</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (partners.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Our Partners</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No partners available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with title + See All link */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Our Partners</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {chunkedPartners.map((column, index) => (
          <View key={`col-${index}`} style={styles.column}>
            {column.map((partner) => (
              <Pressable
                key={partner.id}
                onPress={() => openSheet("partner", partner)}
                style={({ pressed }) => [
                  styles.card,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                {partner.logo ? (
                  <Image
                    source={{ uri: partner.logo }}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholderText}>
                      {partner.name.charAt(0)}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      backgroundColor: colors.bg,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      color: colors.text,
    },
    seeAllText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.primary,
    },
    scrollContainer: {
      paddingVertical: 10,
    },
    column: {
      marginRight: 10,
      justifyContent: 'space-between',
    },
    card: {
      width: 150,
      height: 100,
      marginBottom: 10,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    logoImage: {
      width: '80%',
      height: '80%',
    },
    placeholderContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.border,
    },
    placeholderText: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text,
    },
    loadingContainer: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 8,
      fontSize: 14,
      color: colors.text,
    },
    errorContainer: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 14,
      color: colors.error,
      marginBottom: 8,
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    retryText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: '500',
    },
    emptyContainer: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });
};