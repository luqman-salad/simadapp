import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
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

const GradesScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();
  const { courseTitle, courseId } = useLocalSearchParams();

  // State to manage grades for each student
  const [grades, setGrades] = useState(
    studentsData.reduce((acc, student) => {
      acc[student.id] = ''; // Initialize with an empty string
      return acc;
    }, {})
  );

  const handleGradeChange = (studentId, value) => {
    // Only allow valid numbers for grades
    const numericValue = value.replace(/[^0-9.]/g, '');
    setGrades((prev) => ({
      ...prev,
      [studentId]: numericValue,
    }));
  };

  const saveGrades = () => {
    console.log('Saving grades for course:', courseId);
    console.log('Grades Records:', grades);
    alert('Grades saved successfully!');
    // In a real app, you would send this data to your backend
    router.back(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.waraper}>
        <Header
            title= "Grades Record"
            showLeftIcon
            leftIconName="chevron-back"
            onLeftIconPress={() => router.back()}
        />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionHeader}>Enter Grades</Text>
        {studentsData.map((student) => (
          <View key={student.id} style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
              </View>
              <Text style={styles.studentName}>{student.name}</Text>
            </View>
            <TextInput
              style={styles.gradeInput}
              placeholder="00.00"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={grades[student.id]}
              onChangeText={(value) => handleGradeChange(student.id, value)}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveGrades}>
          <Text style={styles.saveButtonText}>Save Grades</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GradesScreen;

const createStyle = (colors) => {
  return StyleSheet.create({
    waraper: {
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      flex: 1,
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
      flexShrink: 1,
    },
    gradeInput: {
      width: 80,
      height: 40,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 10,
      fontSize: 16,
      textAlign: 'center',
      color: colors.text,
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