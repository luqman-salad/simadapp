import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import useInstitutionsStore from '../../store/institutionsStore';
import { getInstitutions } from '../../apis/institutionsApi';
import { useGlobalLoading } from '../../hooks/useGlobalLoading';

const InstitutionCard = ({ item, colors, styles }) => {
  const router = useRouter();
  const { setSelectedInstitutionTitle } = useInstitutionsStore();

  const handlePress = () => {
    setSelectedInstitutionTitle(item.name);
    console.log('Navigating with ID:', item.id); // ✅ Use item.id instead of item._id
    
    // ✅ PASS THE CORRECT ID FIELD
    router.push({
      pathname: '/(screens)/institutionsInfo',
      params: { 
        institutionId: item.id, // ✅ Use item.id
        institutionName: item.name 
      }
    });
  };

  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>
          {item.description || 'Specializing in advanced research and education.'}
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.takeATourButton,
            { opacity: pressed ? 0.7 : 1 }
          ]}
          onPress={handlePress}
        >
          <Text style={styles.takeATourButtonText}>Take a Tour</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Institutions = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useGlobalLoading("institutions-screen", loading);

  const fetchInstitutionsData = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      
      const result = await getInstitutions();
      
      console.log('Full API Response:', JSON.stringify(result, null, 2)); // ✅ Better debug log
      
      if (result?.success && Array.isArray(result.data?.institutions)) {
        setInstitutions(result.data.institutions);
        
        // ✅ Check what fields exist in the first institution
        if (result.data.institutions[0]) {
          console.log('First institution fields:', Object.keys(result.data.institutions[0]));
          console.log('First institution ID:', result.data.institutions[0].id);
          console.log('First institution _id:', result.data.institutions[0]._id);
        }
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching institutions:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInstitutionsData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInstitutionsData(true);
  };

  const handleRetry = () => {
    fetchInstitutionsData();
  };

  if (error && !refreshing) {
    return (
      <View style={styles.container}>
        <Header
          title="Institutions"
          showLeftIcon
          leftIconName="menu"
          onLeftIconPress={() => navigationTab.openDrawer()}
        />
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={50} color={colors.error} />
          <Text style={styles.errorText}>Failed to load institutions</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Institutions"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <View key="section-header" style={styles.sectionHeader}>
          <MaterialCommunityIcons name="domain" size={24} color={colors.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Explore our institutions</Text>
        </View>

        {institutions.length === 0 && !loading ? (
          <View key="empty-state" style={styles.emptyContainer}>
            <MaterialCommunityIcons name="domain-off" size={50} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No institutions available</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : (
          institutions.map((institution, index) => (
            <InstitutionCard
              key={institution.id || `institution-${index}`} // ✅ Use id instead of _id
              item={institution}
              colors={colors}
              styles={styles}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Institutions;

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    scrollViewContent: {
      paddingBottom: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 25,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 10,
      backgroundColor: colors.surface,
    },
    sectionIcon: {
      marginRight: 12,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginHorizontal: 20,
      marginVertical: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    cardImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 16,
      backgroundColor: colors.border,
    },
    cardContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 6,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 12,
      lineHeight: 18,
    },
    takeATourButton: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    takeATourButtonText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '600',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    errorText: {
      fontSize: 16,
      color: colors.error,
      marginTop: 12,
      marginBottom: 16,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    retryText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '600',
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 12,
      marginBottom: 16,
      textAlign: 'center',
    },
  });
};