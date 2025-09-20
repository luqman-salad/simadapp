import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../../hooks/usetheme';
import { useRouter } from 'expo-router';

// Dummy data for the lecturer
const lecturerData = {
  name: "Dr. Alana Smith",
  lecturerId: "LEC101",
  initials: "AS",
  activeCourses: 3,
  totalClasses: 5,
};

// Dummy data for the lecturer's courses
const courses = [
  {
    id: 'cs301',
    title: 'CS 301 - Data Structures',
    ClassName: "BC14-B",
    courseTime: "01:00 PM - 02:15 PM"
  },
  {
    id: 'phys202',
    title: 'PHYS 202 - Quantum Mechanics',
    ClassName: "BC14-A",
    courseTime: "11:00 AM - 12:15 PM"
  },
  {
    id: 'math101',
    title: 'MATH 101 - Calculus I',
    ClassName: "BC14-B",
    courseTime: "03:00 PM - 04:15 PM"
  },
];

const LecturerDashboardScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();

  const handleAction = (courseId, courseTitle, action) => {
    // Navigate to a different screen based on the action
    console.log(`Navigating to ${action} screen for course ${courseId}`);

    switch (action) {
      case 'Manage Attendance':
        router.push({
          pathname: "(screens)/attendencelist",
          params: { courseId, courseTitle },
        });
        break;
      case 'Upload Grades':
        router.push({
          pathname: "(screens)/recordingGrades",
          params: { courseId, courseTitle },
        });
        break;
      case 'Upload Materials':
        router.push({
          pathname: "(screens)/courseMaterials",
          params: { courseId, courseTitle },
        });
        break;
      default:
        alert('This feature is not yet available!');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.Wrapper}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.welcomeMessage}>Welcome back,</Text>
              <Text style={styles.lecturerName}>{lecturerData.name}</Text>
              <Text style={styles.lecturerID}>ID: {lecturerData.lecturerId}</Text>
            </View>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{lecturerData.initials}</Text>
              </View>
            </View>
          </View>

          {/* Key Metrics Card */}
          <View style={styles.metricsCard}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Active Courses</Text>
              <Text style={styles.metricValue}>{lecturerData.activeCourses}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Total Classes</Text>
              <Text style={styles.metricValue}>{lecturerData.totalClasses}</Text>
            </View>
          </View>

          {/* Course List Section */}
          <Text style={styles.sectionTitle}>My Courses</Text>
          {courses.map((course) => (
            <View key={course.id} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <Ionicons name="school-outline" size={24} color={colors.primary} />
                <View style={styles.courseTitleContainer}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.classInfo}>{course.ClassName}</Text>
                  <Text style={styles.courseTime}>{course.courseTime}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleAction(course.id, course.title, 'Manage Attendance')}
                >
                  <Ionicons name="checkmark-done-circle-outline" size={20} color={colors.primary} />
                  <Text style={styles.actionButtonText}>Attendance</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleAction(course.id, course.title, 'Upload Grades')}
                >
                  <Ionicons name="document-text-outline" size={20} color={colors.primary} />
                  <Text style={styles.actionButtonText}>Grades</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleAction(course.id, course.title, 'Upload Materials')}
                >
                  <Ionicons name="cloud-upload-outline" size={20} color={colors.primary} />
                  <Text style={styles.actionButtonText}>Materials</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {/* Logout button */}
          <View style={styles.logoutbtnContainer}>
            <TouchableOpacity
              style={styles.logoutbtn}
              onPress={() => router.push("lecturer")}
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

export default LecturerDashboardScreen;

const createStyle = (colors) => {
  return StyleSheet.create({
    Wrapper: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    scrollViewContent: {
      paddingBottom: 20,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 25,
      paddingTop: 10,
    },
    headerInfo: {
      flex: 1,
    },
    welcomeMessage: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 2,
    },
    lecturerName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    lecturerID: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
    },
    metricsCard: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
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
      color: colors.text,
      opacity: 0.8,
      marginBottom: 5,
    },
    metricValue: {
      fontSize: 34,
      fontWeight: 'bold',
      color: colors.primary,
    },
    metricDivider: {
      width: 1,
      height: '80%',
      backgroundColor: colors.border,
      marginHorizontal: 15,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
    },
    courseCard: {
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
    courseHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    courseTitleContainer: {
      marginLeft: 10,
    },
    courseTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    classInfo: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    courseTime: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
      fontWeight: 'bold',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 15,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    actionButton: {
      alignItems: 'center',
      padding: 10,
    },
    actionButtonText: {
      marginTop: 5,
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.primary,
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