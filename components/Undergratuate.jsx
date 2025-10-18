import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getProgramsByCategoryId } from '../apis/academicProgramsApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';
import useTheme from '../hooks/usetheme';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = (screenWidth - 60) / 2; // 2 cards with spacing

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function HorizontalTwoRowGrid({ route, componentKey = "institutions", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigation = useNavigation();

  const { categoryId } = route.params || {};
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useGlobalLoading(componentKey, loading);

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
  }, [categoryId, refreshTrigger]);

  const handlePress = (schoolId, schoolName) => {
    console.log('School pressed:', schoolId, schoolName);
    
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

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIconContainer}>
          <Text style={styles.errorIcon}>🏫</Text>
        </View>
        <Text style={styles.errorTitle}>Unable to Load</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (schools.length === 0 && !loading) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <Text style={styles.emptyIcon}>📚</Text>
        </View>
        <Text style={styles.emptyTitle}>No Schools Available</Text>
        <Text style={styles.emptyText}>Check back later for updates</Text>
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
      {chunkedSchools.map((column, columnIndex) => (
        <View key={`col-${columnIndex}`} style={styles.column}>
          {column.map((item, itemIndex) => (
            <Pressable
              key={item._id}
              onPress={() => handlePress(item._id, item.name)}
              style={({ pressed }) => [
                styles.cardContainer,
                { transform: [{ scale: pressed ? 0.98 : 1 }] }
              ]}
            >
              <LinearGradient
                colors={[colors.surface, colors.surface + 'DD']}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Background Pattern */}
                <View style={styles.pattern} />
                
                {/* Content */}
                <View style={styles.cardContent}>
                  {/* Icon Container with Gradient */}
                  <LinearGradient
                    colors={[colors.primary + '20', colors.primary + '40']}
                    style={styles.iconContainer}
                  >
                    {item.logoUrl ? (
                      <Image 
                        source={{ uri: item.logoUrl }} 
                        style={styles.icon} 
                        resizeMode="contain"
                      />
                    ) : (
                      <Text style={styles.fallbackIcon}>🏫</Text>
                    )}
                  </LinearGradient>

                  {/* School Name */}
                  <Text style={styles.title} numberOfLines={2}>
                    {item.name}
                  </Text>

                  {/* Explore Text */}
                  <View style={styles.exploreContainer}>
                    <Text style={styles.exploreText}>Explore</Text>
                    <Text style={styles.arrow}>→</Text>
                  </View>
                </View>
              </LinearGradient>
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
      paddingVertical: 15,
      paddingBottom: 25,
      backgroundColor: colors.bg
    },
    column: {
      marginRight: 15,
      gap: 12,
    },
    cardContainer: {
      width: CARD_WIDTH,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 10,
    },
    card: {
      height: 160,
      borderRadius: 20,
      padding: 16,
      overflow: 'hidden',
      position: 'relative',
    },
    pattern: {
      position: 'absolute',
      top: -20,
      right: -20,
      width: 80,
      height: 80,
      backgroundColor: colors.primary + '15',
      borderRadius: 40,
      transform: [{ rotate: '45deg' }],
    },
    cardContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginBottom: 12,
    },
    icon: {
      width: 28,
      height: 28,
    },
    fallbackIcon: {
      fontSize: 20,
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
      lineHeight: 20,
      marginBottom: 8,
      flexShrink: 1,
    },
    exploreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    exploreText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    arrow: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.primary,
    },
    errorContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      margin: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    errorIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.error + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    errorIcon: {
      fontSize: 32,
    },
    errorTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    errorText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      margin: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    emptyIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    emptyIcon: {
      fontSize: 32,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    retryText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
  });
};