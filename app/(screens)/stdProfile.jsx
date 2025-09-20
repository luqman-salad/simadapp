import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../../hooks/usetheme';
import { useRouter } from 'expo-router';
import { Header } from '../../components/Headrer';

const UserProfileScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = createStyle(colors);
  // Dummy user data
  const userData = {
    name: 'Jane P. Doe',
    studentId: '123456789',
    initials: 'JP',
    academic: {
      major: 'Computer Science',
      gpa: '3.85',
      enrollmentStatus: 'Full-Time',
      advisor: 'Dr. Alana Smith',
    },
    contact: {
      email: 'jane.doe@uni.edu',
      phone: '+1 (555) 123-4567',
      address: '123 University Drive, City, State 12345',
    },
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen or open a modal
    console.log('Edit Profile Pressed');
  };

  return (
    <View style={styles.Wrapper}>
      <Header
        title="Profile"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userData.initials}</Text>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.studentId}>Student ID: {userData.studentId}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        {/* Academic Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Major</Text>
            <Text style={styles.infoValue}>{userData.academic.major}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Current GPA</Text>
            <Text style={styles.infoValue}>{userData.academic.gpa}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Enrollment Status</Text>
            <Text style={styles.infoValue}>{userData.academic.enrollmentStatus}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Advisor</Text>
            <Text style={styles.infoValue}>{userData.academic.advisor}</Text>
          </View>
        </View>
        {/* Contact Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={[styles.infoValue, styles.linkText]}>{userData.contact.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={[styles.infoValue, styles.linkText]}>{userData.contact.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{userData.contact.address}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const createStyle = (colors) => {
  return StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  profileHeader: {
    backgroundColor: colors.secondary, // Dark blue background
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary, // Green color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  studentId: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: colors.tertiary, // Blue button
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  infoSection: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    marginHorizontal: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.text,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    fontWeight: 500,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'right',
    flex: 1,
  },
  linkText: {
    color: colors.secondary, // Blue for clickable links
    // textDecorationLine: 'underline',
  },
});
}

export default UserProfileScreen;