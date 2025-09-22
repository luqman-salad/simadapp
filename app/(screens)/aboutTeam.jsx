import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../../hooks/usetheme';
import { Header } from '../../components/Headrer';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

// Dummy data for team members
const teamMembers = [
  {
    id: '1',
    name: 'Abdifitah Farah Ali',
    role: 'Team Lead',
    bio: 'ICT Director at SIMAD',
    image: require("../../assets/images/fablab.jpg"),
  },
  {
    id: '2',
    name: 'Abdishakur Abdullahi Yusuf',
    role: 'Software Developer',
    bio: 'Member',
    image: require("../../assets/images/fablab.jpg"),
  },
  {
    id: '3',
    name: 'Luqman Salad Ali',
    role: 'Software Developer',
    bio: 'Member',
    image: require("../../assets/images/luqman.jpg"),
  },
  {
    id: '4',
    name: 'Zakarie Abdullahi Yusuf',
    role: 'UI/UX Designer',
    bio: 'Member',
    image: require("../../assets/images/zakarie-bakaal.jpg"),
  },
  
];

const OurTeamScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
        <Header
            title= "Team Info"
            showLeftIcon
            leftIconName="chevron-back"
            onLeftIconPress={() => router.back()}
        />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Our Team</Text>
            <Text style={styles.subtitle}>
              Meet the team behind this platform, Dedicated to building innovative solutions with passion and expertise.
            </Text>
          </View>

          {/* Team Members List */}
          {teamMembers.map((member) => (
            <TouchableOpacity key={member.id} style={styles.memberCard}>
              <View style={styles.avatarContainer}>
                <Image key={member.id}
                source={member.image} style={styles.avatarText}/>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                <Text style={styles.memberBio}>{member.bio}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default OurTeamScreen;

const createStyle = (colors) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    scrollViewContent: {
      paddingBottom: 20,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    header: {
      marginBottom: 30,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    avatarContainer: {
      width: 70,
      height: 70,
      borderRadius: 10,
    //   backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
      width: 70,
      height: 70,
      borderRadius: 5
    },
    memberInfo: {
      flex: 1,
    },
    memberName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    memberRole: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
      marginTop: 2,
    },
    memberBio: {
      fontSize: 14,
      color: colors.text,
      marginTop: 5,
    },
  });
};