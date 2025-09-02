import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import useTheme from '../hooks/usetheme';
import simadLogo from '../assets/images/react-logo.png';
import { Ionicons } from '@expo/vector-icons';

const eventData = [
  {
    id: '1',
    title: 'University Cultural Week',
    logo: simadLogo,
    date: 'Sep 22, 2025, All Week',
    time: '12:51:20 PM',
    location: 'Main Campus',
  },
  {
    id: '2',
    title: 'University Cultural Week',
    logo: simadLogo,
    date: 'Sep 22, 2025, All Week',
    time: '12:51:20 PM',
    location: 'Main Campus',
  },
  {
    id: '3',
    title: 'University Cultural Week',
    logo: simadLogo,
    date: 'Sep 22, 2025, All Week',
    time: '12:51:20 PM',
    location: 'Main Campus',
  },
  {
    id: '4',
    title: 'University Cultural Week',
    logo: simadLogo,
    date: 'Sep 22, 2025, All Week',
    time: '12:51:20 PM',
    location: 'Main Campus',
  },
];

export default function EventCardList() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  return (
    <ScrollView style={styles.container}>
      {eventData.map((event) => (
        <TouchableOpacity key={event.id} style={styles.card} activeOpacity={0.8}>
          <View style={styles.leftColumn}>
            <Image source={event.logo} style={styles.logo} />
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <View style={styles.detailRow}>
              <Ionicons name='calendar-outline' style={styles.detailIcon}/>
              <Text style={styles.detailText}>{event.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name='time-outline' style={styles.detailIcon}/>
              <Text style={styles.detailText}>{event.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name='location-outline' style={styles.detailIcon}/>
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      padding: 10,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    leftColumn: {
      marginRight: 15, 
      justifyContent: "center",
      alignItems: "center",
    },
    rightColumn: {
      flex: 1,
    },
    logo: {
      width: 70,
      height: 70,
      borderRadius: 20,
      resizeMode: 'contain',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    detailIcon: {
      width: 16,
      height: 16,
      marginRight: 5,
      resizeMode: 'contain',
      color: colors.primary
    },
    detailText: {
      fontSize: 14,
      color: colors.text,
    },
  });
};