//school.jsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Headrer';
import { useBottomSheet } from '../../context/BottomSheetContext';
import useTheme from '../../hooks/usetheme';
import { getProgramsCategories } from '../../apis/academicProgramsApi';

const AcademicProgramsScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();
  const { openSheet } = useBottomSheet();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProgramsCategories();
      
      if (result?.success && result.data?.categories) {
        setCategories(result.data.categories);
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    // Pass only the category ID to the bottom sheet
    openSheet("programs", category._id);
  };

  const handleRetry = () => {
    fetchCategories();
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
        <View style={styles.center}>
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
        <View style={styles.center}>
          <Text style={styles.errorText}>Error loading programs</Text>
          <Text style={styles.errorDetail}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Try Again</Text>
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
        {categories.map((category, index) => (
          <Pressable
            key={category._id}
            style={({ pressed }) => [
              styles.card,
              { 
                backgroundColor: getCategoryColor(index),
                opacity: pressed ? 0.8 : 1 
              }
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <View>
              <Text style={styles.cardTitle}>{category.name}</Text>
              <Text style={styles.cardDescription}>
                {`Explore our ${category.name} programs`}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={24} color={colors.textPrimary} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

// Helper function to assign colors based on index
const getCategoryColor = (index) => {
  const colors = ['#f1f8f2', '#f0f4ff', '#fff8f0'];
  return colors[index % colors.length];
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
    center: {
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
      padding: 25,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.text,
      marginTop: 5,
    },
    loadingText: {
      marginTop: 10,
      color: colors.text,
      fontSize: 16,
    },
    errorText: {
      color: colors.error,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    errorDetail: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
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

export default AcademicProgramsScreen;