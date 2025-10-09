import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from '../hooks/usetheme';
import { getUniversityStats } from '../apis/simadInNumbersApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading'; // Import the global loading hook

const { width } = Dimensions.get('window');

const StatCard = ({ item, index, animation }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View 
      style={[
        styles.statCard,
        {
          transform: [{ translateY }],
          opacity,
        }
      ]}
    >
      <View style={[styles.cardGradient, { backgroundColor: colors.surface }]}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={32} color={colors.secondary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.statNumber}>{item.number}</Text>
            <Text style={styles.statLabel}>{item.description}</Text>
          </View>
          <View style={styles.decorationCircle} />
        </View>
      </View>
    </Animated.View>
  );
};

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const { colors } = useTheme();
  const styles = createStyle(colors);

  useEffect(() => {
    const numericValue = parseFloat(value) || 0;
    Animated.timing(animatedValue, {
      toValue: numericValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <Text style={styles.heroNumber}>
      {value}
    </Text>
  );
};

export default function UniversityStats({ componentKey = "numbers", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animations] = useState(() => 
    Array(7).fill(0).map(() => new Animated.Value(0))
  );

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]); // Add refreshTrigger to dependencies

  useEffect(() => {
    if (statsData.length > 0) {
      Animated.stagger(100, animations.map(anim => 
        Animated.spring(anim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      )).start();
    }
  }, [statsData]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUniversityStats();
      
      if (response.success && response.data) {
        const transformedData = [
          {
            id: '1',
            number: response.data.totalAlumniStudents,
            description: 'Graduates',
            icon: 'school-outline',
          },
          {
            id: '2',
            number: response.data.totalCurrentStudents,
            description: 'Students',
            icon: 'people-outline',
          },
          {
            id: '3',
            number: response.data.schoolsNumber,
            description: 'Schools',
            icon: 'business-outline',
          },
          {
            id: '4',
            number: response.data.totalCampuses,
            description: 'Campuses',
            icon: 'location-outline',
          },
          {
            id: '5',
            number: response.data.programsNumber,
            description: 'Programs',
            icon: 'library-outline',
          },
          {
            id: '6',
            number: response.data.totalLabs,
            description: 'Labs',
            icon: 'flask-outline',
          },
          {
            id: '7',
            number: response.data.partnersNumber,
            description: 'Partners',
            icon: 'hand-left-outline',
          },
        ];
        setStatsData(transformedData);
      } else {
        throw new Error('Failed to load university stats');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchStats();
  };

  // Remove individual loading display - global overlay handles it
  // But keep the hero section visible during loading
  if (error) {
    return (
      <View style={styles.container}>
        {/* Safe hero section */}
        {colors.primary && colors.secondary ? (
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.heroSection}
          >
            <Text style={styles.heroTitle}>University Stats</Text>
            <Text style={styles.heroSubtitle}>Something went wrong</Text>
          </LinearGradient>
        ) : (
          <View style={[styles.heroSection, { backgroundColor: colors.primary }]}>
            <Text style={styles.heroTitle}>University Stats</Text>
            <Text style={styles.heroSubtitle}>Something went wrong</Text>
          </View>
        )}
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.danger} />
          <Text style={styles.errorText}>Unable to load data</Text>
          <Text style={styles.errorDetail}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Safe hero section - Always show this even during loading */}
      {colors.primary && colors.secondary ? (
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.heroSection}
        >
          <Text style={styles.heroTitle}>SIMAD in Numbers</Text>
          <Text style={styles.heroSubtitle}>
            {loading ? 'Loading amazing numbers...' : 'Our impact and achievements'}
          </Text>
          {!loading && statsData.length > 0 && (
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroNumber}>{statsData[0]?.number}</Text>
                <Text style={styles.heroLabel}>Graduates</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroNumber}>{statsData[1]?.number}</Text>
                <Text style={styles.heroLabel}>Active Students</Text>
              </View>
            </View>
          )}
        </LinearGradient>
      ) : (
        <View style={[styles.heroSection, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroTitle}>SIMAD in Numbers</Text>
          <Text style={styles.heroSubtitle}>
            {loading ? 'Loading amazing numbers...' : 'Our impact and achievements'}
          </Text>
          {!loading && statsData.length > 0 && (
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroNumber}>{statsData[0]?.number}</Text>
                <Text style={styles.heroLabel}>Graduates</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroNumber}>{statsData[1]?.number}</Text>
                <Text style={styles.heroLabel}>Active Students</Text>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Only show content when not loading */}
      {!loading && statsData.length > 0 && (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.statsGrid}>
            {statsData.map((item, index) => (
              <StatCard 
                key={item.id} 
                item={item} 
                index={index}
                animation={animations[index]}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <Ionicons name="trophy-outline" size={48} color={colors.primary} />
            <Text style={styles.footerTitle}>Excellence in Education</Text>
            <Text style={styles.footerText}>
              These numbers represent our commitment to providing quality education 
              and creating opportunities for our students and community.
            </Text>
          </View>
        </ScrollView>
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
    heroSection: {
      paddingTop: 60,
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    heroTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
      marginBottom: 8,
    },
    heroSubtitle: {
      fontSize: 16,
      color: colors.white,
      opacity: 0.9,
      textAlign: 'center',
      marginBottom: 30,
    },
    heroStats: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroStat: {
      alignItems: 'center',
      flex: 1,
    },
    heroNumber: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 4,
    },
    heroLabel: {
      fontSize: 14,
      color: colors.white,
      opacity: 0.9,
      fontWeight: '500',
    },
    heroDivider: {
      width: 2,
      height: 40,
      backgroundColor: colors.white,
      opacity: 0.3,
      marginHorizontal: 20,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 15,
      paddingBottom: 40,
    },
    statsGrid: {
      flexDirection: 'row',
      columnGap: 5,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    statCard: {
      width: (width - 60) / 2,
      height: 140,
      marginBottom: 20,
      borderRadius: 20,
      overflow: 'hidden',
    },
    cardGradient: {
      flex: 1,
      borderRadius: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
    },
    cardContent: {
      flex: 1,
      padding: 16,
      justifyContent: 'space-between',
      marginRight: 5
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    textContainer: {
      marginTop: 8,
    },
    statNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 2,
    },
    statLabel: {
      fontSize: 12,
      color: colors.text,
      fontWeight: '500',
    },
    decorationCircle: {
      position: 'absolute',
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.secondary + '15',
      top: -20,
      right: -20,
    },
    footer: {
      alignItems: 'center',
      padding: 30,
      backgroundColor: colors.surface,
      borderRadius: 20,
      marginTop: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    footerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    footerText: {
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    errorText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.danger,
      marginTop: 16,
      marginBottom: 8,
    },
    errorDetail: {
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 24,
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 25,
    },
    retryText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
  });
};