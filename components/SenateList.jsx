// components/SenateList.jsx
import React, { useEffect, useState } from 'react';
import { 
  Image, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import useTheme from '../hooks/usetheme';
import { getSenateList } from '../apis/senateApis';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const SenateList = ({ componentKey = "senate", refreshTrigger = 0 }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [senate, setSenate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getSenateList();
      
      if (result?.success && Array.isArray(result.data?.senateList)) {
        setSenate(result.data.senateList);
      } else {
        throw new Error('Invalid data structure from API');
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

  if (!senate.length && !loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
          No senate members found
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
      <Text style={styles.listTitle}>The Senate List Profiles</Text>

      <View style={styles.senateContainer}>
        {senate.map((member, index) => (
          <TouchableOpacity key={member.id || index} style={styles.card}>
            {/* Colored vertical bar */}
            <View
              style={[
                styles.colorBar,
                { backgroundColor: index === 0 ? '#ffc107' : '#28a745' }, // Rector gold, others green
              ]}
            />

            {/* Text */}
            <View style={styles.textContainer}>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.title}>{member.position}</Text>
            </View>

            {/* Profile Image */}
            <Pressable style={styles.profileImageContainer}>
              <Image 
                source={{ uri: member.image }} 
                style={styles.profileImage}
                onError={() => console.log('Failed to load image')}
              />
            </Pressable>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const createStyle = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    contentContainer: {
      paddingVertical: 20,
    },
    centerContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 10,
    },
    senateContainer: {
      paddingHorizontal: 15,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 4,
      padding: 8,
      marginVertical: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    colorBar: {
      width: 8,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
    },
    textContainer: {
      flex: 1,
      marginLeft: 15,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    title: {
      fontSize: 14,
      color: colors.text,
      marginTop: 2,
    },
    profileImageContainer: {
      width: 70,
      height: 70,
      borderRadius: 5,
      overflow: 'hidden',
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgroundSecondary || '#f5f5f5',
    },
    profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
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
  });

export default SenateList;