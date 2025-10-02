// school.jsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Header } from '../../components/Headrer';
import { useBottomSheet } from '../../context/BottomSheetContext';
import useTheme from '../../hooks/usetheme';
import { getAvailableProgramsInfo } from '../../apis/academicProgramsApi';
import { useEffect, useState } from 'react';

const AcademicProgramsScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();
  const { openSheet } = useBottomSheet();
  const [programsData, setProgramsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAvailableProgramsInfo();
      
      if (response.success && response.data?.programs) {
        const programsObject = {};
        response.data.programs.forEach(program => {
          const key = program.title.toLowerCase().replace(/\s+/g, '');
          programsObject[key] = {
            title: program.title,
            color: program.color,
            subPrograms: program.subPrograms || []
          };
        });
        setProgramsData(programsObject);
      }
    } catch (error) {
      console.error('Error loading programs:', error);
      setError('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchPrograms();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          title="Academic Programs"
          showLeftIcon
          leftIconName="menu"
          onLeftIconPress={() => navigationTab.openDrawer()}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading programs...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header
          title="Academic Programs"
          showLeftIcon
          leftIconName="menu"
          onLeftIconPress={() => navigationTab.openDrawer()}
        />
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Academic Programs"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
      <View style={styles.content}>
        {Object.keys(programsData).length > 0 ? (
          Object.keys(programsData).map((key) => {
            const program = programsData[key];
            return (
              <Pressable
                key={key}
                style={styles.card}
                onPress={() => openSheet("programs", program)}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{program.title.replace(' Programs', '')}</Text>
                  <Text style={styles.cardDescription}>
                    {`Explore our ${program.title.replace(' Programs', '')} programs.`}
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color={colors.text} />
              </Pressable>
            );
          })
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.noDataText}>No programs available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    content: {
      padding: 20,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: colors.surface,
      padding: 25,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.text,
    },
    loadingText: {
      fontSize: 16,
      color: colors.text,
      marginTop: 12,
    },
    errorText: {
      fontSize: 16,
      color: colors.danger,
      textAlign: 'center',
      marginTop: 12,
      marginBottom: 20,
    },
    noDataText: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
  });
};

export default AcademicProgramsScreen;