import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import useTheme from '../hooks/usetheme';
import { getFacilities } from '../apis/facilitiesApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading'; // Import the global loading hook

// Fallback local images in case API images fail to load
const fallbackImages = {
  'smart classes': require('../assets/images/smartclasses.jpg'),
  'simad library': require('../assets/images/simadlibrary.jpg'),
  'nap room': require('../assets/images/naproom.webp'),
  'computer labs': require('../assets/images/computerlabs.jpeg'),
  'research center': require('../assets/images/researchcenter.jpg'),
  'fabrican lab': require('../assets/images/fablab.jpg'),
  'laboratories': require('../assets/images/laboratories.avif'),
  'student loan': require('../assets/images/studentloan.jpg'),
  'co-working space': require('../assets/images/coworkingspace.jpg'),
};

// ✅ Split into chunks of 2 for vertical stacking inside each horizontal column
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function TwoRowHorizontalList({ componentKey = "facilities", refreshTrigger = 0 }) {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { colors } = useTheme();
  const styles = createStyle(colors);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  useEffect(() => {
    fetchFacilities();
  }, [refreshTrigger]); // Add refreshTrigger to dependencies

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFacilities();
      
      if (response.success && response.data) {
        // Transform API data to match component structure
        const transformedFacilities = response.data.map(facility => ({
          id: facility._id,
          name: facility.name,
          image: facility.image, // URL from API
          description: facility.description
        }));
        setFacilities(transformedFacilities);
      }
    } catch (error) {
      console.error('Error loading facilities:', error);
      setError('Failed to load facilities');
    } finally {
      setLoading(false);
    }
  };

  const getImageSource = (facility) => {
    // If API provides image URL, use it, otherwise use fallback
    if (facility.image && facility.image.startsWith('http')) {
      return { uri: facility.image };
    }
    // Use fallback image based on facility name
    const facilityKey = facility.name.toLowerCase();
    return fallbackImages[facilityKey] || require('../assets/images/smartclasses.jpg');
  };

  const handleRetry = () => {
    fetchFacilities();
  };

  // Remove individual loading display - global overlay handles it
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Academic Facilities</Text>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText} onPress={handleRetry}>
            Tap to retry
          </Text>
        </View>
      </View>
    );
  }

  if (!facilities || facilities.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Academic Facilities</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No facilities available</Text>
        </View>
      </View>
    );
  }

  const chunkedFacilities = chunkArray(facilities, 2);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Academic Facilities</Text>

      <FlatList
        data={chunkedFacilities}
        horizontal
        keyExtractor={(item, index) => `col-${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: column }) => (
          <View style={styles.column}>
            {column.map((facility) => (
              <ImageBackground
                key={facility.id}
                source={getImageSource(facility)}
                style={styles.background}
                imageStyle={styles.imageStyle}
                onError={() => console.log(`Failed to load image for: ${facility.name}`)}
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>
                    {facility.name.charAt(0).toUpperCase() + facility.name.slice(1)}
                  </Text>
                </View>
              </ImageBackground>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const createStyle = (colors) => {
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    header: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      color: colors.text
    },
    column: {
      marginRight: 8,
      justifyContent: 'space-between',
    },
    background: {
      width: 120,
      height: 90,
      marginBottom: 10,
      justifyContent: 'flex-end',
    },
    imageStyle: {
      borderRadius: 10,
      borderColor: colors.border,
      borderWidth: 2
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    title: {
      color: colors.white,
      fontSize: 14,
      fontWeight: "500",
      textAlign: 'center',
    },
    loadingContainer: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 8,
      fontSize: 14,
      color: colors.textSecondary,
    },
    errorContainer: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 8,
    },
    retryText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
    emptyContainer: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });

  return styles;
};