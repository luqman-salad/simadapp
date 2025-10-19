import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import useTheme from '../hooks/usetheme';
import { useState, useEffect } from 'react';
import { getVisionAndMission } from '../apis/visionMissionApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const SectionCard = ({ title, icon, content }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </View>
  );
};

export default function VisionPurpose({ componentKey = "vision-purpose", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getVisionAndMission();
      
      if (result.success && result.data) {
        setData(result.data);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching vision and mission:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  // Remove individual loading display - global overlay handles it
  if (error) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={[styles.errorText, { color: colors.danger }]}>
          Error loading data
        </Text>
        <Text style={[styles.errorSubtext, { color: colors.textSecondary }]}>
          {error}
        </Text>
        <Pressable onPress={fetchData} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: colors.primary }]}>
            Tap to retry
          </Text>
        </Pressable>
      </View>
    );
  }

  if (!data && !loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
          No vision and mission data available
        </Text>
        <Pressable onPress={fetchData} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: colors.primary }]}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Vision Section */}
        {data?.vision && (
          <SectionCard 
            title="Vision" 
            icon="🎯" 
            content={data.vision} 
          />
        )}
        
        {/* Mission Section */}
        {data?.mission && (
          <SectionCard 
            title="Mission" 
            icon="🚀" 
            content={data.mission} 
          />
        )}
        
        {/* Guiding Principles Section */}
        {data?.guidingPrinciples && (
          <SectionCard 
            title="Guiding Principles" 
            icon="🧭" 
            content={data.guidingPrinciples} 
          />
        )}
        
        {/* Core Values Section */}
        {data?.coreValues && (
          <SectionCard 
            title="Core Values" 
            icon="💎" 
            content={data.coreValues} 
          />
        )}
      </View>
    </ScrollView>
  );
}

const createStyle = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    contentContainer: {
      paddingVertical: 20,
    },
    content: {
      paddingHorizontal: 20,
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    errorSubtext: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
    },
    noDataText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    retryButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: colors.primary + '20',
      borderRadius: 8,
    },
    retryText: {
      fontSize: 16,
      fontWeight: "600",
    },
    sectionContainer: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      borderWidth: 1,
      borderColor: colors.primary + '30',
    },
    icon: {
      fontSize: 18,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primary,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border + '30',
      shadowColor: colors.shadow || '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    contentText: {
      fontSize: 15,
      lineHeight: 24,
      color: colors.text,
      textAlign: 'justify',
    },
  });