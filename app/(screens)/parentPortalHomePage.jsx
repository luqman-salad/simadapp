import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import useTheme from '../../hooks/usetheme';
import { useRouter } from 'expo-router';

// Dummy data for parent with multiple students
const parentData = {
  name: "Mr. Yusuf",
  students: [
    {
      id: 'student1',
      name: "Zakarie Abullahi Yusuf",
      studentId: "123456789",
      currentGpa: "3.85",
      attendanceRate: "95%",
    },
    {
      id: 'student2',
      name: "Aisha Abullahi Yusuf",
      studentId: "987654321",
      currentGpa: "3.70",
      attendanceRate: "98%",
    }
  ],
};

const parentDashboardTiles = [
  { id: 'exams', title: 'Exams', subtitle: 'View schedule', icon: 'document-text-outline', color: '#FF7F7F', screen: '(screens)/stdExams' },
  { id: 'finance', title: 'Finance', subtitle: 'Check payments', icon: 'wallet-outline', color: '#97A7FF', screen: '(screens)/stdFinances' },
  { id: 'schedule', title: 'Schedule', subtitle: 'View class schedule', icon: 'calendar-outline', color: '#7AFFC0', screen: '(screens)/stdSchechule' },
  { id: 'attendance', title: 'Attendance', subtitle: 'View detailed report', icon: 'checkmark-circle-outline', color: '#FFD479', screen: '(screens)/stdAttendence' },
  { id: 'profile', title: 'Student Profile', subtitle: 'View details', icon: 'person-circle-outline', color: '#B3E0B3', screen: '(screens)/stdProfile' },
];

const ParentDashboardScreen = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(parentData.students[0].id);
  const selectedStudent = parentData.students.find(s => s.id === selectedStudentId);
  const initials = selectedStudent.name.split(' ').map(n => n[0]).join('').toUpperCase();

  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();

  const handleTilePress = (screenName) => {
    if (screenName) {
      router.push(screenName);
    } else {
      alert('This feature is not yet available!');
    }
  };

  return (
    <View style={styles.Wrapper}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* Header and Student Selector */}
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.welcomeMessage}>Hello,</Text>
              <Text style={styles.parentName}>{parentData.name}</Text>
            </View>
            <View style={styles.selectorContainer}>
              <Text style={styles.selectorLabel}>Viewing:</Text>
              <Picker
                selectedValue={selectedStudentId}
                onValueChange={(itemValue) => setSelectedStudentId(itemValue)}
                style={styles.studentPicker}
              >
                {parentData.students.map((student) => (
                  <Picker.Item key={student.id} label={student.name} value={student.id} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Student Info Section */}
          <View style={styles.studentInfoCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.studentName}>{selectedStudent.name}</Text>
              <Text style={styles.studentID}>ID: {selectedStudent.studentId}</Text>
            </View>
          </View>

          {/* Key Metrics Card */}
          <View style={styles.metricsCard}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Current GPA</Text>
              <Text style={styles.metricValue}>{selectedStudent.currentGpa}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Attendance</Text>
              <Text style={styles.metricValue}>{selectedStudent.attendanceRate}</Text>
            </View>
          </View>

          {/* Navigation Tiles Grid */}
          <View style={styles.tilesGrid}>
            {parentDashboardTiles.map((tile) => (
              <TouchableOpacity
                key={tile.id}
                style={styles.tile}
                onPress={() => handleTilePress(tile.screen)}
                activeOpacity={0.7}
              >
                <Ionicons name={tile.icon} size={38} style={[styles.icon, { color: tile.color }]} />
                <Text style={styles.tileTitle}>{tile.title}</Text>
                <Text style={styles.tileSubtitle}>{tile.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout button */}
          <View style={styles.logoutbtnContainer}>
            <TouchableOpacity
              style={styles.logoutbtn}
              onPress={() => router.push("parent")}
            >
              <Ionicons name='log-out-outline' size={28} style={styles.logoutIcon} />
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default ParentDashboardScreen;

const createStyle = (colors) => {
  return StyleSheet.create({
    Wrapper: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingTop: 15,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 0,
    },
    header: {
      // flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 25,
      paddingTop: 10,
    },
    headerInfo: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
      marginBottom: 10
    },
    welcomeMessage: {
      fontSize: 24,
      color: colors.text,
      marginBottom: 2,
      marginRight: 5
    },
    parentName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      flexWrap: "wrap",
    },
    selectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 10,
      marginHorizontal: 50,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colors.border
    },
    selectorLabel: {
      fontSize: 16,
      color: colors.text,
      marginRight: 5,
      fontWeight: 500
    },
    studentPicker: {
      height: 60,
      width: "100%",
      color: colors.text,
    },
    studentInfoCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    avatarContainer: {
      marginRight: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
    },
    infoDetails: {
      flex: 1,
    },
    studentName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    studentID: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    metricsCard: {
      flexDirection: 'row',
      backgroundColor: colors.secondary,
      borderRadius: 15,
      padding: 20,
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 30,
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
    icon: {
      color: colors.text,
    },
    tile: {
      width: '48%',
      aspectRatio: 1,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      padding: 10,
      backgroundColor: colors.surface,
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
    logoutbtnContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    logoutbtn: {
      flexDirection: "row",
      gap: 10,
      backgroundColor: colors.danger,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    logoutBtnText: {
      color: colors.white,
      fontWeight: "bold",
      fontSize: 18,
    },
    logoutIcon: {
      color: colors.white,
    },
  });
};