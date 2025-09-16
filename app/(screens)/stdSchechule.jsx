import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// --- Dummy data for the schedule ---
const semesterSchedule = [
  {
    day: 'Monday',
    classes: [
      {
        id: 'cs301-mon',
        name: 'CS 301 - Data Structures',
        time: '10:00 AM - 11:30 AM',
        location: 'Building A, Room 205',
        professor: 'Prof. Sarah Davis',
        color: '#4a90e2', // Blue for CS
      },
      {
        id: 'math101-mon',
        name: 'MATH 101 - Calculus I',
        time: '1:00 PM - 2:30 PM',
        location: 'Building A, Room 301',
        professor: 'Prof. Alice Johnson',
        color: '#f5a623', // Orange for Math
      },
    ],
  },
  {
    day: 'Tuesday',
    classes: [
      {
        id: 'phys202-tue',
        name: 'PHYS 202 - Quantum Mechanics',
        time: '1:00 PM - 2:30 PM',
        location: 'Building B, Room 112',
        professor: 'Prof. John Miller',
        color: '#7ed321', // Green for Physics
      },
    ],
  },
  {
    day: 'Wednesday',
    classes: [
      {
        id: 'cs301-wed',
        name: 'CS 301 - Data Structures',
        time: '10:00 AM - 11:30 AM',
        location: 'Building A, Room 205',
        professor: 'Prof. Sarah Davis',
        color: '#4a90e2', // Blue for CS
      },
    ],
  },
  {
    day: 'Thursday',
    classes: [
      {
        id: 'phys202-thu',
        name: 'PHYS 202 - Quantum Mechanics',
        time: '1:00 PM - 2:30 PM',
        location: 'Building B, Room 112',
        professor: 'Prof. John Miller',
        color: '#7ed321', // Green for Physics
      },
    ],
  },
  {
    day: 'Friday',
    classes: [], // Empty array to represent no classes
  },
];

const ScheduleScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Current Semester Schedule</Text>
          <Text style={styles.subtitle}>Fall 2024</Text>
        </View>

        {semesterSchedule.map((scheduleDay) => (
          <View key={scheduleDay.day} style={styles.dayContainer}>
            <Text style={styles.dayHeader}>{scheduleDay.day}</Text>
            <View style={styles.divider} />
            
            {scheduleDay.classes.length > 0 ? (
              <View style={styles.timelineWrapper}>
                {scheduleDay.classes.map((classInfo, index) => (
                  <TouchableOpacity 
                    key={classInfo.id} 
                    activeOpacity={0.8} 
                    style={styles.timelineItem}
                  >
                    <View style={styles.timelineMarkerContainer}>
                      <View style={[styles.timelineLine, { backgroundColor: classInfo.color }]} />
                      <View style={[styles.timelineMarker, { backgroundColor: classInfo.color }]} />
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.className}>{classInfo.name}</Text>
                      <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={16} color="#555" />
                        <Text style={styles.infoText}>{classInfo.time}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="map-marker-outline" size={16} color="#555" />
                        <Text style={styles.infoText}>{classInfo.location}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Ionicons name="person-outline" size={16} color="#555" />
                        <Text style={styles.infoText}>{classInfo.professor}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noClassesContainer}>
                <Ionicons name="sunny-outline" size={24} color="#999" />
                <Text style={styles.noClassesText}>No classes today. Enjoy your day!</Text>
              </View>
            )}
          </View>
        ))}
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
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  dayContainer: {
    marginBottom: 25,
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
  },
  // --- Timeline Specific Styles ---
  timelineWrapper: {
    paddingLeft: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineMarkerContainer: {
    width: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  timelineLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
    left: 9,
  },
  timelineMarker: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  className: {
    fontSize: 18,
    fontWeight: 500,
    color: '#333',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  noClassesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noClassesText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    marginLeft: 10,
  },
});

export default ScheduleScreen;