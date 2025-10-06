import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import useTheme from '../hooks/usetheme';
import { getProgramsByCategoryId } from '../apis/academicProgramsApi';

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function HorizontalTwoRowGrid({ route }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigation = useNavigation();

  const { categoryId } = route.params || {};
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchoolsData = async () => {
    if (!categoryId) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await getProgramsByCategoryId(categoryId);
      
      if (result?.success && result.data?.schools) {
        setSchools(result.data.schools);
      } else {
        throw new Error('No schools data received');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchSchoolsData();
    }
  }, [categoryId]);

  const handlePress = (schoolId, schoolName) => {
    console.log('School pressed:', schoolId, schoolName);
    
    // FIXED: Pass parameters correctly using object format
    router.push({
      pathname: '/(screens)/SchoolInfoScreen',
      params: { 
        schoolId: schoolId, 
        schoolName: schoolName 
      }
    });
  };

  const handleRetry = () => {
    fetchSchoolsData();
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading undergraduate schools...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.bg }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Failed to load schools
        </Text>
        <Text style={[styles.errorDetail, { color: colors.text }]}>
          {error}
        </Text>
        <Pressable style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (schools.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.bg }]}>
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No undergraduate schools available
        </Text>
        <Text style={[styles.emptyDetail, { color: colors.text }]}>
          Check back later for updates
        </Text>
      </View>
    );
  }

  const chunkedSchools = chunkArray(schools, 2);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {chunkedSchools.map((column, index) => (
        <View key={`col-${index}`} style={styles.column}>
          {column.map((item) => (
            <Pressable
              key={item._id}
              onPress={() => handlePress(item._id, item.name)}
              style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              {item.logoUrl ? (
                <Image 
                  source={{ uri: item.logoUrl }} 
                  style={styles.icon} 
                  resizeMode="contain"
                />
              ) : (
                <Image 
                  source={require('../assets/icons/desktop-computer.png')} 
                  style={styles.icon} 
                />
              )}
              <Text style={styles.title}>{item.name}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: colors.bg,
      paddingBottom: 20,
      width: "100%"
    },
    column: {
      marginRight: 10,
      justifyContent: 'space-between',
    },
    card: {
      backgroundColor: colors.surface,
      width: 140,
      height: 100,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    icon: {
      width: 40,
      height: 40,
      marginBottom: 8,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.text,
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      textAlign: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    errorDetail: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    emptyDetail: {
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '500',
    },
  });
};