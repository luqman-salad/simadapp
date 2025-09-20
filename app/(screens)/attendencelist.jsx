import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import useTheme from '../../hooks/usetheme';
import { Header } from '../../components/Headrer';

// Dummy data for the list of students in a class
const studentsData = [
  { id: 'S001', name: 'Ahmed Ali Yusuf' },
  { id: 'S002', name: 'Fadumo Hassan Jama' },
  { id: 'S003', name: 'Mohamed Abdi Omar' },
  { id: 'S004', name: 'Aisha Muse Ibrahim' },
  { id: 'S005', name: 'Hussein Aden Nur' },
  { id: 'S006', name: 'Layla Said Farah' },
  { id: 'S007', name: 'Abdi Hassan Said' },
  { id: 'S008', name: 'Nimco Ali Warsame' },
  { id: 'S009', name: 'Omar Dahir Jama' },
  { id: 'S010', name: 'Safia Ismail Adan' },
];

const AttendanceScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();
  const { courseTitle, courseId } = useLocalSearchParams();

  // State to manage attendance status for each student
  const [attendance, setAttendance] = useState(
    studentsData.reduce((acc, student) => {
      acc[student.id] = 'present'; // Default to 'present' for new attendance
      return acc;
    }, {})
  );

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const saveAttendance = () => {
    console.log('Saving attendance for course:', courseId);
    console.log('Attendance Records:', attendance);
    alert('Attendance saved successfully!');
    // In a real app, you would send this data to your backend
    router.back(); // Navigate back to the previous screen
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return { name: 'checkmark-circle', color: colors.success };
      case 'absent':
        return { name: 'close-circle', color: colors.danger };
      case 'excused':
        return { name: 'information-circle', color: colors.warning };
      default:
        return { name: 'help-circle', color: colors.textSecondary };
    }
  };

  return (
    <View style={styles.wapper}>
        <Header
            title= "Attendence"
            showLeftIcon
            leftIconName="chevron-back"
            onLeftIconPress={() => router.back()}
        />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionHeader}>Mark Attendance</Text>
        {studentsData.map((student) => {
          const status = attendance[student.id];
          const icon = getStatusIcon(status);

          return (
            <View key={student.id} style={styles.studentCard}>
              <View style={styles.studentInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                </View>
                <Text style={styles.studentName}>{student.name}</Text>
              </View>
              <View style={styles.statusButtons}>
                <TouchableOpacity
                  style={[styles.statusButton, status === 'present' && { backgroundColor: colors.successTransparent }]}
                  onPress={() => handleStatusChange(student.id, 'present')}
                >
                  <Ionicons name="checkmark-circle-outline" size={24} color={colors.success} />
                  <Text style={[styles.statusButtonText, { color: colors.success }]}>Present</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.statusButton, status === 'absent' && { backgroundColor: colors.dangerTransparent }]}
                  onPress={() => handleStatusChange(student.id, 'absent')}
                >
                  <Ionicons name="close-circle-outline" size={24} color={colors.danger} />
                  <Text style={[styles.statusButtonText, { color: colors.danger }]}>Absent</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.statusButton, status === 'excused' && { backgroundColor: colors.warningTransparent }]}
                  onPress={() => handleStatusChange(student.id, 'excused')}
                >
                  <Ionicons name="information-circle-outline" size={24} color={colors.warning} />
                  <Text style={[styles.statusButtonText, { color: colors.warning }]}>Excused</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveAttendance}>
          <Text style={styles.saveButtonText}>Save Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AttendanceScreen;

const createStyle = (colors) => {
  return StyleSheet.create({
    wapper: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      paddingTop: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      paddingRight: 10,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
    },
    scrollViewContent: {
      padding: 20,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
    },
    studentCard: {
      backgroundColor: colors.surface,
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    studentInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    avatarText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 18,
    },
    studentName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    statusButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    statusButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 20,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statusButtonText: {
      marginLeft: 5,
      fontSize: 12,
      fontWeight: 'bold',
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.surface,
    },
    saveButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    saveButtonText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
};