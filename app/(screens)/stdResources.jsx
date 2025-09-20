import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useTheme from '../../hooks/usetheme';
import { Header } from '../../components/Headrer';

// Dummy data for the semester and course materials
const semesters = [
  { label: 'Fall 2024', value: 'fall_2024' },
  { label: 'Spring 2024', value: 'spring_2024' },
  { label: 'Fall 2023', value: 'fall_2023' },
];

const courseMaterials = {
  'fall_2024': [
    {
      id: 'cs301',
      name: 'CS 301 - Data Structures',
      materials: {
        'Chapters & Slides': [
          { name: 'Lecture 1: Introduction.pdf', type: 'pdf' },
          { name: 'Lecture 2: Arrays & Lists.pdf', type: 'pdf' },
          { name: 'Chapter 1-3 Slides.pptx', type: 'pptx' },
        ],
        'Assignments': [
          { name: 'Assignment 1: Stacks & Queues.pdf', type: 'pdf' },
          { name: 'Assignment 2: Binary Trees.pdf', type: 'pdf' },
        ],
        'Homeworks': [
          { name: 'Homework 1.pdf', type: 'pdf' },
          { name: 'Homework 2.pdf', type: 'pdf' },
        ],
      },
    },
    {
      id: 'ph302',
      name: 'PH 301 - Physics 2',
      materials: {
        'Chapters & Slides': [
          { name: 'Lecture 1: Introduction.pdf', type: 'pdf' },
          { name: 'Lecture 2: Arrays & Lists.pdf', type: 'pdf' },
          { name: 'Chapter 1-3 Slides.pptx', type: 'pptx' },
        ],
        'Assignments': [
          { name: 'Assignment 1: Stacks & Queues.pdf', type: 'pdf' },
          { name: 'Assignment 2: Binary Trees.pdf', type: 'pdf' },
        ],
        'Homeworks': [
          { name: 'Homework 1.pdf', type: 'pdf' },
          { name: 'Homework 2.pdf', type: 'pdf' },
        ],
      },
    },
    
    // Add more courses as needed
  ],
};

const CourseMaterialsScreen = () => {
  const [selectedSemester, setSelectedSemester] = useState('fall_2024');
  const materials = courseMaterials[selectedSemester];

  const { colors } = useTheme();
  const router = useRouter();
  const styles = createStyle(colors);

  // Function to handle file download
  const handleDownload = (fileName) => {
    Alert.alert("Download File", `Are you sure you want to download "${fileName}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Download", onPress: () => console.log(`Downloading ${fileName}...`) }
    ]);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return 'document-text-outline';
      case 'pptx':
        return 'easel-outline';
      default:
        return 'document-outline';
    }
  };

  return (
    <View style={styles.Wraper}>
      <Header
        title="Resources"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Course Materials</Text>
          <Text style={styles.subtitle}>Download lecture notes, slides, and assignments.</Text>
        </View>

        {/* Semester Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Select Semester:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedSemester}
              onValueChange={(itemValue) => setSelectedSemester(itemValue)}
              style={styles.picker}
            >
              {semesters.map((s) => (
                <Picker.Item key={s.value} label={s.label} value={s.value} />
              ))}
            </Picker>
            {/* <Ionicons name="chevron-down" size={20} color="#000" style={styles.pickerIcon} /> */}
          </View>
        </View>

        {/* Course Cards */}
        {materials.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <Text style={styles.courseTitle}>{course.name}</Text>
            <View style={styles.divider} />

            {Object.keys(course.materials).map((category) => (
              <View key={category} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category}</Text>
                {course.materials[category].map((file, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.fileItem}
                    onPress={() => handleDownload(file.name)}
                  >
                    <Ionicons name={getFileIcon(file.type)} size={20} color="#666" style={styles.fileIcon} />
                    <Text style={styles.fileName}>{file.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyle = (colors) => {
  return StyleSheet.create({
  Wraper: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollViewContent: {
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 500,
    color: colors.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  selectorLabel: {
    fontSize: 16,
    color: colors.text,
    marginRight: 10,
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
    height: 45,
  },
  picker: {
    flex: 1,
    height: '100%',
    color: colors.text,
    height: 100
  },
  pickerIcon: {
    position: 'absolute',
    right: 15,
    pointerEvents: 'none',
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
    elevation: 3,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 400,
    color: colors.text,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 15,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.text,
    marginBottom: 10,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fileIcon: {
    marginRight: 10,
  },
  fileName: {
    fontSize: 14,
    color: colors.text,
  },
});
}

export default CourseMaterialsScreen;