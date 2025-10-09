// components/SenateList.jsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '../hooks/usetheme';
import { getSenateList } from '../apis/senateApis';

const SenateList = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [senate, setSenate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSenate = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getSenateList();
        
        if (result?.success && Array.isArray(result.data?.senateList)) {
          setSenate(result.data.senateList);
        } else {
          throw new Error('Invalid data structure from API');
        }
      } catch (error) {
        console.error('Error fetching Senate list:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSenate();
  }, []);

  const handleRetry = () => {
    // Retry logic if needed
    useEffect(() => {
      const fetchSenate = async () => {
        try {
          setLoading(true);
          setError(null);
          const result = await getSenateList();
          
          if (result?.success && Array.isArray(result.data?.senateList)) {
            setSenate(result.data.senateList);
          } else {
            throw new Error('Invalid data structure from API');
          }
        } catch (error) {
          console.error('Error fetching Senate list:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSenate();
    }, []);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.listTitle}>The Senate List Profiles</Text>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.secondary} />
          <Text style={styles.loadingText}>Loading senate members...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.listTitle}>The Senate List Profiles</Text>
        <View style={styles.center}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>The Senate List Profiles</Text>

      {senate.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No senate members found</Text>
        </View>
      ) : (
        <ScrollView style={styles.senateContainer}>
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
        </ScrollView>
      )}
    </View>
  );
};

const createStyle = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      paddingHorizontal: 15,
      paddingVertical: 10,
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
    },
    profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    loadingText: {
      marginTop: 10,
      color: colors.text,
      fontSize: 14,
    },
    errorText: {
      color: colors.error || '#ff0000',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 15,
    },
    emptyText: {
      color: colors.textSecondary || '#666',
      fontSize: 16,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    retryText: {
      color: colors.white || '#ffffff',
      fontSize: 14,
      fontWeight: '500',
    },
  });

export default SenateList;