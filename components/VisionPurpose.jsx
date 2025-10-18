import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import useTheme from '../hooks/usetheme';
import { useState, useEffect } from 'react';
import { getVisionAndMission } from '../apis/visionMissionApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const SectionCard = ({ title, icon, contentText, listPoints }) => {
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
        <Text style={styles.contentText}>{contentText}</Text>
        {listPoints && listPoints.length > 0 && (
          <View style={styles.list}>
            {listPoints.map((point, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.listItemText}>{point}</Text>
              </View>
            ))}
          </View>
        )}
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
          Error: {error}
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
        <SectionCard title="Vision" icon="🎯" contentText={data?.vision} />
        <SectionCard
          title="Mission"
          icon="🚀"
          contentText={data?.mission?.text}
          listPoints={data?.mission?.points}
        />
        <SectionCard
          title="Guiding Principles"
          icon="🧭"
          contentText={data?.guidingPrinciples?.text}
          listPoints={data?.guidingPrinciples?.points}
        />
        <SectionCard
          title="Core Values"
          icon="💎"
          contentText={data?.coreValues?.text}
          listPoints={data?.coreValues?.points}
        />
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
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    noDataText: {
      fontSize: 16,
      textAlign: 'center',
    },
    retryButton: {
      marginTop: 10,
    },
    retryText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    sectionContainer: {
      marginBottom: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    iconContainer: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    icon: {
      fontSize: 18,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: 15,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 5,
      borderLeftColor: colors.border,
      marginBottom: 10,
      marginLeft: 20,
    },
    contentText: {
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    list: {
      marginTop: 10,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    bulletPoint: {
      fontSize: 14,
      marginRight: 5,
      color: colors.primary,
    },
    listItemText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
  });