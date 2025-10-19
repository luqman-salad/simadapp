import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import useTheme from '../hooks/usetheme';
import { getUniversityStats } from '../apis/simadInNumbersApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

// Import your icons - REPLACE THESE WITH ACTUAL IMAGE PATHS
import graduatesIcon from '../assets/images/icon.png';
import studentsIcon from '../assets/images/icon.png';
import schoolsIcon from '../assets/images/icon.png';
import campusesIcon from '../assets/images/icon.png';
import programsIcon from '../assets/images/icon.png';
import labsIcon from '../assets/images/icon.png';
import relationsIcon from '../assets/images/icon.png';

const TimelineCard = ({ item, styles, isLeft }) => (
  <View style={isLeft ? styles.cardContainerLeft : styles.cardContainerRight}>
    <View style={styles.card}>
      {isLeft && <Image source={item.icon} style={styles.cardIcon} />}
      <View style={[styles.textColumn, isLeft && styles.textColumnLeft]}>
        <Text style={styles.cardNumber}>{item.number}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      {!isLeft && <Image source={item.icon} style={styles.cardIcon} />}
    </View>
  </View>
);

export default function UniversityStats({ componentKey = "numbers", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUniversityStats();
      
      if (response.success && response.data) {
        const transformedData = [
          {
            id: '1',
            number: response.data.totalAlumniStudents?.toString() || '0',
            description: 'Graduates',
            icon: graduatesIcon,
            position: 'left',
          },
          {
            id: '2',
            number: response.data.totalCurrentStudents?.toString() || '0',
            description: 'Students',
            icon: studentsIcon,
            position: 'right',
          },
          {
            id: '3',
            number: response.data.schoolsNumber?.toString() || '0',
            description: 'Schools',
            icon: schoolsIcon,
            position: 'left',
          },
          {
            id: '4',
            number: response.data.totalCampuses?.toString() || '0',
            description: 'Campuses',
            icon: campusesIcon,
            position: 'right',
          },
          {
            id: '5',
            number: response.data.programsNumber?.toString() || '0',
            description: 'Programs',
            icon: programsIcon,
            position: 'left',
          },
          {
            id: '6',
            number: response.data.totalLabs?.toString() || '0',
            description: 'Labs',
            icon: labsIcon,
            position: 'right',
          },
          {
            id: '7',
            number: response.data.partnersNumber?.toString() || '0',
            description: 'Inter-Relations',
            icon: relationsIcon,
            position: 'left',
          },
        ];
        setStatsData(transformedData);
      } else {
        throw new Error('Failed to load university stats');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchStats();
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SIMAD in Numbers</Text>
          <Text style={styles.headerSubtitle}>Something went wrong</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
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
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SIMAD in Numbers</Text>
        <Text style={styles.headerSubtitle}>
          {loading ? 'Loading amazing numbers...' : 'Our impact and achievements'}
        </Text>
        
        {/* Show hero stats during loading with placeholder */}
        {(loading || statsData.length > 0) && (
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroNumber}>
                {loading ? '...' : statsData[0]?.number}
              </Text>
              <Text style={styles.heroLabel}>Graduates</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroNumber}>
                {loading ? '...' : statsData[1]?.number}
              </Text>
              <Text style={styles.heroLabel}>Active Students</Text>
            </View>
          </View>
        )}
      </View>

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading university statistics...</Text>
        </View>
      )}

      {/* Timeline Content */}
      {!loading && statsData.length > 0 && (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.timelineWrapper}>
            <View style={styles.timelineLine} />
            {statsData.map((item, index) => (
              <View key={item.id} style={styles.timelineItem}>
                <TimelineCard 
                  item={item} 
                  styles={styles} 
                  isLeft={item.position === 'left'} 
                />
                <View style={styles.timelineDot} />
              </View>
            ))}
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <Text style={styles.footerIcon}>🏆</Text>
            <Text style={styles.footerTitle}>Excellence in Education</Text>
            <Text style={styles.footerText}>
              These numbers represent our commitment to providing quality education 
              and creating opportunities for our students and community.
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Empty State */}
      {!loading && statsData.length === 0 && !error && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data available</Text>
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
    header: {
      backgroundColor: colors.primary,
      paddingTop: 60,
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    headerTitle: {
      fontSize: 28, // Slightly smaller for better fit
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
      marginBottom: 8,
    },
    headerSubtitle: {
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
      fontSize: 32, // Slightly smaller
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
      width: 1,
      height: 30, // Smaller
      backgroundColor: colors.white,
      opacity: 0.3,
      marginHorizontal: 15, // Less margin
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    timelineWrapper: {
      position: 'relative',
      paddingHorizontal: 10, // Less padding
      marginTop: 20,
      paddingBottom: 20,
    },
    timelineLine: {
      position: 'absolute',
      left: '50%',
      width: 3, // Thinner line
      backgroundColor: colors.primary,
      top: 0,
      bottom: 0,
      borderRadius: 2,
      marginLeft: -1.5, // Center the line
    },
    timelineItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10, // Add some margin between items
      minHeight: 80, // Smaller min height
    },
    timelineDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.primary,
      position: 'absolute',
      left: '50%',
      marginLeft: -16.5, // Center the dot
      zIndex: 1,
      borderWidth: 2,
      borderColor: colors.white,
    },
    cardContainerLeft: {
      flex: 1,
      paddingRight: 10, // Reduced padding
      alignItems: 'flex-end',
    },
    cardContainerRight: {
      flex: 1,
      paddingLeft: -100, // Fixed: positive padding instead of negative
      alignItems: 'flex-start',
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      width: 160, // Slightly smaller
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3, // Lower elevation
    },
    textColumn: {
      flex: 1,
      marginLeft: 8,
    },
    textColumnLeft: {
      marginRight: 8,
      marginLeft: 0,
      alignItems: 'flex-end',
    },
    cardNumber: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 2,
    },
    cardDescription: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '500',
    },
    cardIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    footer: {
      alignItems: 'center',
      padding: 25,
      backgroundColor: colors.surface,
      borderRadius: 20,
      marginTop: 20,
      marginHorizontal: 15,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    footerIcon: {
      fontSize: 40,
      marginBottom: 8,
    },
    footerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
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
      textAlign: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    errorIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    errorText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.danger,
      marginBottom: 8,
      textAlign: 'center',
    },
    errorDetail: {
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
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
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 18,
      color: colors.text,
      textAlign: 'center',
    },
  });
};