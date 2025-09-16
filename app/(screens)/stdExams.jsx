import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

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

  const renderProgressBar = (score, max) => {
    const percentage = (score / max) * 100;
    const barColor = percentage >= 75 ? '#4CAF50' : percentage >= 50 ? '#FFD700' : '#F44336';

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
    <SafeAreaView style={styles.safeArea}>
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
              <Ionicons name="chevron-down" size={20} color="#000" style={styles.pickerIcon} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  semesterSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  semesterLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    height: 50,
  },
  picker: {
    flex: 1,
    height: '100%',
    color: '#000',
  },
  pickerItem: {
    fontSize: 16,
  },
  pickerIcon: {
    position: 'absolute',
    right: 15,
    pointerEvents: 'none',
  },
  summaryCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  gradeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  gradeLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  gradeScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    minWidth: 70,
    textAlign: 'right',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 3,
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
    color: '#666',
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  fabShare: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#007AFF',
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
    backgroundColor: '#00A86B', // Green color
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

export default ExamResultsScreen;