import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
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
  {
    id: '5',
    title: 'University Cultural Week',
    logo: simadLogo,
    date: 'Sep 22, 2025, All Week',
    time: '12:51:20 PM',
    location: 'Main Campus',
  },
];

// Extracted the render logic into a separate function
const renderEventCard = ({ item, styles }) => (
  <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
    <View style={styles.leftColumn}>
      <Image source={item.logo} style={styles.logo} />
    </View>
    <View style={styles.rightColumn}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.detailRow}>
        <Ionicons name='calendar-outline' style={styles.detailIcon} />
        <Text style={styles.detailText}>{item.date}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name='time-outline' style={styles.detailIcon} />
        <Text style={styles.detailText}>{item.time}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name='location-outline' style={styles.detailIcon} />
        <Text style={styles.detailText}>{item.location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function EventCardList() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  return (
    <FlatList
      data={eventData}
      renderItem={({ item }) => renderEventCard({ item, styles })}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    listContainer: {
      flexGrow: 1, // Ensures content fills the available space
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
      elevation: 3,
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