import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '../hooks/usetheme';

const SenateList = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [senate, setSenate] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSenate = async () => {
      try {
        const response = await fetch(
          'https://simad-portal-api.vercel.app/api/v1/app/about-university/getSenateList'
        );
        const result = await response.json();
        if (result?.success && Array.isArray(result.data?.senateList)) {
          setSenate(result.data.senateList);
        }
      } catch (error) {
        console.error('Error fetching Senate list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSenate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>The Senate List Profiles</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginTop: 20 }} />
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
                <Image source={{ uri: member.image }} style={styles.profileImage} />
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
    listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.secondary,
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
      color: colors.shadow,
    },
    title: {
      fontSize: 14,
      color: '#666',
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
  });

export default SenateList;
