import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../../hooks/usetheme';
import { Header } from '../../components/Headrer';

// Dummy data for team members
const teamMembers = [
  {
    id: '1',
    name: 'Abdifitah Farah Ali',
    role: 'Team Lead',
    bio: 'ICT Director at SIMAD',
    image: require("../../assets/images/abdifitah_farah.jpg"),
    phone: '+252611111111',
    website: 'https://simad.edu.so',
    whatsapp: '+252611111111',
  },
  {
    id: '2',
    name: 'Abdishakur Abdullahi Ibrahim',
    role: 'Software Developer',
    bio: 'Member',
    image: require("../../assets/images/abdishakur_abdullahi.jpg"),
    phone: '+252617522228',
    website: 'https://github.com/binAbdalla-shakra',
    whatsapp: '+252617522228',
  },
  {
    id: '3',
    name: 'Luqman Salad Ali',
    role: 'Software Developer',
    bio: 'Member',
    image: require("../../assets/images/luqman.jpg"),
    phone: '+252616984305',
    website: 'https://luqmansalad.vercel.app',
    whatsapp: '+252616984305',
  },
  {
    id: '4',
    name: 'Zakarie Abdullahi Yusuf',
    role: 'UI/UX Designer',
    bio: 'Member',
    image: require("../../assets/images/zakarie-bakaal.jpg"),
    phone: '+252617741451',
    website: 'https://www.behance.net/zakarieyusuf',
    whatsapp: '+252617741451',
  },
];

const OurTeamScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();

  const openDialer = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const openWebsite = (url) => {
    Linking.openURL(url);
  };

  const openWhatsApp = (number) => {
    Linking.openURL(`https://wa.me/${number}`);
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title="Team Info"
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
              Meet the team behind this great platform.
            </Text>
          </View>

          {/* Team Members List */}
          {teamMembers.map((member) => {
            const isEven = parseInt(member.id) % 2 === 0;

            return (
              <View
                key={member.id}
                style={[
                  styles.memberCard,
                  isEven ? styles.evenCard : styles.oddCard,
                  isEven && styles.reverseRow, // flip only for even
                ]}
              >
                <View style={styles.avatarContainer}>
                  <Image source={member.image} style={styles.avatarImage} />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                  <Text style={styles.memberBio}>{member.bio}</Text>

                  {/* Action Icons */}
                  <View style={styles.actionRow}>
                    <TouchableOpacity onPress={() => openDialer(member.phone)}>
                      <Ionicons name="call-outline" size={22} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openWebsite(member.website)}>
                      <Ionicons name="globe-outline" size={22} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openWhatsApp(member.whatsapp)}>
                      <Ionicons name="logo-whatsapp" size={22} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
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
      paddingTop: 15,
    },
    header: {
      marginBottom: 20,
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
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    reverseRow: {
      flexDirection: 'row-reverse',
    },
    oddCard: {
      backgroundColor: colors.surface,
    },
    evenCard: {
      backgroundColor: colors.surface,
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
    },
    avatarImage: {
      width: 75,
      height: 75,
      borderRadius: 10,
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
      marginBottom: 8,
    },
    actionRow: {
      flexDirection: 'row',
      marginTop: 6,
      gap: 16,
    },
  });
};
