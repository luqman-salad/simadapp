import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

// Dummy data for the course selector and chart
const courses = [
  { label: 'Choose a course', value: null },
  { label: 'CS 301 - Data Structures', value: 'cs301' },
  { label: 'PHYS 202 - Quantum Mechanics', value: 'phys202' },
  { label: 'MATH 101 - Calculus I', value: 'math101' },
];

const pieChartData = [
  {
    name: 'Present',
    percentage: 91,
    color: '#3498db',
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  },
  {
    name: 'Absent',
    percentage: 5,
    color: '#e74c3c',
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  },
  {
    name: 'Excuse',
    percentage: 4,
    color: '#f1c40f',
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  },
];

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const AttendanceScreen = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Course Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorTitle}>Select a course</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCourse}
              onValueChange={(itemValue) => setSelectedCourse(itemValue)}
              style={styles.picker}
            >
              {courses.map((course) => (
                <Picker.Item 
                  key={course.value} 
                  label={course.label} 
                  value={course.value} 
                  style={{ color: '#000' }} 
                />
              ))}
            </Picker>
            <Ionicons name="chevron-down" size={20} color="#000" style={styles.pickerIcon} />
          </View>
        </View>

        {/* Pie Chart and Legend */}
        <View style={styles.chartContainer}>
          <PieChart
            data={pieChartData}
            width={300}
            height={200}
            chartConfig={chartConfig}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
          />
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <Ionicons name="time-outline" size={16} color="#3498db" />
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <Ionicons name="close-circle-outline" size={16} color="#e74c3c" />
              <Text style={styles.legendText}>Absent</Text>
            </View>
            <View style={styles.legendItem}>
              <MaterialCommunityIcons name="comment-text-multiple-outline" size={16} color="#f1c40f" />
              <Text style={styles.legendText}>Excuse</Text>
            </View>
          </View>
        </View>

        {/* Attendance Details */}
        <Text style={styles.detailsTitle}>Attendance Details</Text>

        {/* Attendance Rate Card */}
        <View style={styles.rateCard}>
          <Text style={styles.rateLabel}>Attendance Rate</Text>
          <Text style={styles.rateValue}>8.57%</Text>
        </View>

        {/* Stat Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderColor: '#3498db' }]}>
            <Ionicons name="people-outline" size={30} color="#3498db" />
            <Text style={styles.statValue}>35</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#2ecc71' }]}>
            <Ionicons name="checkmark-circle-outline" size={30} color="#2ecc71" />
            <Text style={styles.statValue}>32</Text>
            <Text style={styles.statLabel}>Present</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#f1c40f' }]}>
            <FontAwesome name="star-o" size={30} color="#f1c40f" />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#9b59b6' }]}>
            <Ionicons name="person-circle-outline" size={30} color="#9b59b6" />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Excuse</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f5',
  },
  scrollViewContent: {
    padding: 20,
  },
  selectorContainer: {
    marginBottom: 30,
  },
  selectorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  pickerIcon: {
    position: 'absolute',
    right: 15,
    pointerEvents: 'none',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  legendItem: {
    alignItems: 'center',
  },
  legendText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  rateCard: {
    backgroundColor: '#2ecc71',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  rateLabel: {
    fontSize: 16,
    color: '#fff',
  },
  rateValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default AttendanceScreen;