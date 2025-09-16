import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // For proper spacing on different devices
import { Ionicons } from '@expo/vector-icons'; // Assuming you have @expo/vector-icons installed
import useTheme from '../../hooks/usetheme';
import { useRouter } from 'expo-router';

// Data for the navigation tiles
const dashboardTiles = [
  { id: 'exams', title: 'Exams', subtitle: '2 Upcoming Finals', icon: 'document-text-outline', color: '#FF7F7F', screen: '(screens)/stdExams' }, // Red-ish
  { id: 'finance', title: 'Finance', subtitle: 'Balance Due: Oct 10', icon: 'wallet-outline', color: '#97A7FF', screen: '(screens)/stdFinances' }, // Blue-ish
  { id: 'schedule', title: 'Schedule', subtitle: 'Classes This Week', icon: 'calendar-outline', color: '#7AFFC0', screen: '(screens)/stdSchechule' }, // Green-ish
  { id: 'attendance', title: 'Attendance', subtitle: 'View detailed report', icon: 'checkmark-circle-outline', color: '#FFD479', screen: '(screens)/stdAttendence' }, // Orange-ish
  { id: 'resources', title: 'Resources', subtitle: 'Download materials', icon: 'folder-open-outline', color: '#DAA5FF', screen: '(screens)/stdResources' }, // Purple-ish
  { id: 'support', title: 'Support', subtitle: 'Get Help & FAQs', icon: 'help-circle-outline', color: '#A0E7E5', screen: '(screens)/stdSupport' }, // Teal-ish
  
  { id: 'news', title: 'News', subtitle: 'Latest university updates', icon: 'newspaper-outline', color: '#C6E2E9', screen: '(screens)/stdNews' }, // Light Blue-ish
  { id: 'profile', title: 'Profile', subtitle: 'Manage your details', icon: 'person-circle-outline', color: '#B3E0B3', screen: '(screens)/stdProfile' }, // Light Green-ish
];

const StudentDashboardScreen = ({ navigation }) => {
  const studentName = "Zakarie Abullahi Yusuf";
  const studentId = "123456789";
  const currentGpa = "3.85";
  const attendanceRate = "95%";
  const initials = studentName.split(' ').map(n => n[0]).join('').toUpperCase(); // JP


  const { colors } = useTheme();
  const styles = createStyle(colors);

  const router = useRouter()

  const handleTilePress = (screenName) => {
    if (screenName) {
      router.push(screenName);
    } else {
      alert('This feature is not yet available!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.welcomeMessage}>Welcome back,</Text>
              <Text style={styles.studentName}>{studentName}</Text>
              <Text style={styles.studentID}>ID: {studentId}</Text>
            </View >
            <View style={styles.avatarContainer}>
                <View style={styles.avater}>
                <Text style={styles.avatarText}>{initials}</Text>
                </View>
            </View>
          </View>

          {/* Key Metrics Card */}
          <View style={styles.metricsCard}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Current GPA</Text>
              <Text style={styles.metricValue}>{currentGpa}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Attendance</Text>
              <Text style={styles.metricValue}>{attendanceRate}</Text>
            </View>
          </View>

          {/* Navigation Tiles Grid */}
          <View style={styles.tilesGrid}>
            {dashboardTiles.map((tile) => (
              <TouchableOpacity
                key={tile.id}
                style={styles.tile}
                onPress={() => handleTilePress(tile.screen)}
                activeOpacity={0.7}
              >
                <Ionicons name={tile.icon} size={38} style={styles.icon} />
                <Text style={styles.tileTitle}>{tile.title}</Text>
                <Text style={styles.tileSubtitle}>{tile.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout button */}
        <View style={styles.logoutbtnContainer}>
            <TouchableOpacity 
                style={styles.logoutbtn}
                onPress={() => router.push("student")}
            >
                <Ionicons name='log-out-outline' size={28} style={styles.logoutIcon} />
                <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
        </View>

        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyle = (colors) => {
    return StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Very light grey/blue background
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0, // Adjusted padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 25, // More space below header
    paddingTop: 10,
  },
  headerInfo:{
    width: "70%"
  },
  welcomeMessage: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 2,
  },
  studentName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    flexWrap: "wrap"
  },
  studentID: {
    fontSize: 14,
    color: colors.text,
  },
  avatarContainer:{
    width: "30%"
  },
  avater: {
    width: 100,
    height: 100,
    borderRadius: 100, // Makes it a circle
    backgroundColor: colors.primary, // Orange color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  metricsCard: {
    flexDirection: 'row',
    backgroundColor: colors.secondary, // A pleasant blue
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30, // Space below the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.white,
  },
  metricDivider: {
    width: 1,
    height: '80%',
    backgroundColor: colors.border,
    marginHorizontal: 15,
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  icon:{
    color: colors.text
  },
  tile: {
    width: '48%', // Roughly half, accounting for margin
    aspectRatio: 1, // Makes tiles square
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10, // Added padding for content
    backgroundColor: colors.surface
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
    textAlign: 'center',
  },
  tileSubtitle: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    marginTop: 4,
  },
  logoutbtn:{
    flexDirection: "row",
    gap: 10,
    backgroundColor: colors.danger,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  logoutBtnText:{
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18
  },
  logoutIcon:{
    color: colors.white
  }
});
}

export default StudentDashboardScreen;