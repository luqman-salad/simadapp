import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../../hooks/usetheme';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Header } from '../../components/Headrer';

// Dummy data for semesters and results
const semesters = [
  { label: 'Fall 2024', value: 'fall_2024' },
  { label: 'Spring 2024', value: 'spring_2024' },

];

const allResults = {
  'fall_2024': {
    gpa: '3.00',
    rank: '5/150',
    courses: [
      {
        id: 'cs301',
        name: 'CS 301 - Data Structures',
        components: [
          { name: 'Midterm', weight: 30, score: 28, max: 30 },
          { name: 'Final Exam', weight: 40, score: 36, max: 40 },
          { name: 'Activities', weight: 30, score: 29, max: 30 },
        ],
        totalMarks: 93,
        totalMax: 100,
        percentage: '93%',
        grade: 'A',
      },
      {
        id: 'phys202',
        name: 'PHYS 202 - Quantum Mechanics',
        components: [
          { name: 'Midterm', weight: 30, score: 25, max: 30 },
          { name: 'Final Exam', weight: 40, score: 32, max: 40 },
          { name: 'Activities', weight: 30, score: 28, max: 30 },
        ],
        totalMarks: 85,
        totalMax: 100,
        percentage: '85%',
        grade: 'B',
      },
      {
        id: 'math101',
        name: 'MATH 101 - Calculus I',
        components: [
          { name: 'Midterm', weight: 30, score: 20, max: 30 },
          { name: 'Final Exam', weight: 40, score: 30, max: 40 },
          { name: 'Activities', weight: 30, score: 25, max: 30 },
        ],
        totalMarks: 75,
        totalMax: 100,
        percentage: '75%',
        grade: 'C',
      },
    ],
  },
  'spring_2024': {
    gpa: '3.20',
    rank: '3/145',
    courses: [
      {
        id: 'cs201',
        name: 'CS 201 - Programming I',
        components: [
          { name: 'Midterm', weight: 30, score: 25, max: 30 },
          { name: 'Final Exam', weight: 40, score: 35, max: 40 },
          { name: 'Activities', weight: 30, score: 28, max: 30 },
        ],
        totalMarks: 88,
        totalMax: 100,
        percentage: '88%',
        grade: 'B+',
      },
    ],
  },
};

const ExamResultsScreen = ({ navigation }) => {
  const [selectedSemester, setSelectedSemester] = useState('fall_2024');
  const results = allResults[selectedSemester];

  const { colors } = useTheme();
  const styles = createStyle(colors);

  const router = useRouter();

  const renderProgressBar = (score, max) => {
    const percentage = (score / max) * 100;
    const barColor = percentage >= 75 ? colors.primary : percentage >= 50 ? colors.tertiary : colors.danger;

    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${percentage}%`, backgroundColor: barColor }]} />
      </View>
    );
  };

  const handleShareResults = () => {
    Alert.alert("Share Results", `Share your ${selectedSemester.replace('_', ' ').toUpperCase()} results?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Share", onPress: () => console.log("Sharing results...") }
    ]);
  };

  // New function for the 'View as Marksheet' button
  const handleViewMarksheet = () => {
    Alert.alert("View Marksheet", `Viewing the marksheet for ${selectedSemester.replace('_', ' ').toUpperCase()}.`, [
      { text: "OK", onPress: () => console.log("Viewing marksheet...") }
    ]);
  };

  return (
    <View style={styles.ContainerWrapper}>
      <Header
        title="Exams"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Exam Results</Text>
          <Text style={styles.subtitle}>Review your detailed performance from past semesters.</Text>

          {/* Semester Selector */}
          <View style={styles.semesterSelectorContainer}>
            <Text style={styles.semesterLabel}>Select Semester:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedSemester}
                onValueChange={(itemValue) => setSelectedSemester(itemValue)}
                style={styles.picker}
                dropdownIconColor="#000"
              >
                {semesters.map((s) => (
                  <Picker.Item 
                    key={s.value} 
                    label={s.label} 
                    value={s.value} 
                    color="#000"
                  />
                ))}
              </Picker>
              {/* <Ionicons name="chevron-down" size={20} color="#000" style={styles.pickerIcon} /> */}
            </View>
          </View>

          {/* GPA and Class Rank Cards */}
          <View style={styles.summaryCardsContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{results.gpa}</Text>
              <Text style={styles.summaryLabel}>Semester GPA</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{results.rank}</Text>
              <Text style={styles.summaryLabel}>Class Rank</Text>
            </View>
          </View>

          {/* Course Result Cards */}
          {results.courses.map((course) => (
            <View key={course.id} style={styles.courseCard}>
              <Text style={styles.courseTitle}>{course.name}</Text>
              <View style={styles.divider} />
              {course.components.map((comp, index) => (
                <View key={index} style={styles.gradeItem}>
                  <Text style={styles.gradeLabel}>{comp.name} ({comp.weight})</Text>
                  <Text style={styles.gradeScore}>{comp.score} / {comp.max}</Text>
                  {renderProgressBar(comp.score, comp.max)}
                </View>
              ))}
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <View>
                  <Text style={styles.totalLabel}>Total Marks</Text>
                  <Text style={styles.totalValue}>{course.totalMarks} / {course.totalMax}</Text>
                </View>
                <View>
                  <Text style={styles.totalLabel}>Percentage</Text>
                  <Text style={styles.totalValue}>{course.percentage}</Text>
                </View>
              </View>
              <View style={styles.gradeRow}>
                <Text style={styles.gradeLabel}>Grade</Text>
                <Text style={styles.gradeValue}>{course.grade}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Buttons (FABs) */}
      <TouchableOpacity style={styles.fabShare} onPress={handleShareResults}>
        <Ionicons name="share-social-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Changed fabCalculator to fabMarksheet with new style and handler */}
      <TouchableOpacity style={styles.fabMarksheet} onPress={handleViewMarksheet}>
        <Ionicons name="document-text-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const createStyle = (colors) => {
    return StyleSheet.create({
  ContainerWrapper: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  title: {
    fontSize: 26,
    fontWeight: 500,
    color: colors.text,
    marginBottom: 8,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 30,
    textAlign: "center"
  },
  semesterSelectorContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  semesterLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  pickerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    height: 60,
  },
  picker: {
    flex: 1,
    height: '100%',
    color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
  },
  pickerIcon: {
    position: 'absolute',
    right: 10,
    pointerEvents: 'none',
  },
  summaryCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  courseCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.text,
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 7,
  },
  gradeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  gradeLabel: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  gradeScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    minWidth: 70,
    textAlign: 'right',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: colors.bg,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 5,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  fabShare: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: colors.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  // New style for the marksheet FAB
  fabMarksheet: {
    position: 'absolute',
    bottom: 90,
    right: 25,
    backgroundColor: colors.primary, // Green color
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
}

export default ExamResultsScreen;