import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import useTheme from '../hooks/usetheme';

// Import your icons. Remember to replace these with your actual image file paths.
import graduatesIcon from '../assets/images/react-logo.png';
import studentsIcon from '../assets/images/react-logo.png';
import schoolsIcon from '../assets/images/react-logo.png';
import campusesIcon from '../assets/images/react-logo.png';
import programsIcon from '../assets/images/react-logo.png';
import labsIcon from '../assets/images/react-logo.png';
import relationsIcon from '../assets/images/react-logo.png';

const timelineData = [
  {
    id: '1',
    number: '8400+',
    description: 'Graduates',
    icon: graduatesIcon,
    position: 'left',
  },
  {
    id: '2',
    number: '4500+',
    description: 'Students',
    icon: studentsIcon,
    position: 'right',
  },
  {
    id: '3',
    number: '9+',
    description: 'Schools',
    icon: schoolsIcon,
    position: 'left',
  },
  {
    id: '4',
    number: '2',
    description: 'Campuses',
    icon: campusesIcon,
    position: 'right',
  },
  {
    id: '5',
    number: '40+',
    description: 'Programs',
    icon: programsIcon,
    position: 'left',
  },
  {
    id: '6',
    number: '8+',
    description: 'Labs',
    icon: labsIcon,
    position: 'right',
  },
  {
    id: '7',
    number: '25+',
    description: 'Inter-Relations',
    icon: relationsIcon,
    position: 'left',
  },
];

const TimelineCard = ({ item, styles, isLeft }) => (
  <View style={isLeft ? styles.cardContainerLeft : styles.cardContainerRight}>
    <View style={styles.card}>
      {isLeft && <Image source={item.icon} style={styles.cardIcon} />}
      <View style={[styles.textColumn, isLeft && styles.textColumnLeft]}>
        <Text style={styles.cardNumber}>{item.number}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      {!isLeft && <Image source={item.icon} style={styles.cardIcon} />}
    </View>
  </View>
);

export default function PerfectTimeline() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  return (
      <View style={styles.timelineWrapper}>
        <View style={styles.timelineLine} />
        {timelineData.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <TimelineCard item={item} styles={styles} isLeft={item.position === 'left'} />
            <View style={styles.timelineDot} />
          </View>
        ))}
      </View>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingVertical: 20,
    },
    timelineWrapper: {
      position: 'relative',
      paddingHorizontal: 20,
    },
    timelineLine: {
      position: 'absolute',
      left: '50%',
      width: 4,
      backgroundColor: colors.primary,
      top: 0,
      bottom: 0,
      borderRadius: 2,
      marginLeft: 10,
    },
    timelineItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 0,
      minHeight: 100,
    },
    timelineDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.primary,
      position: 'absolute',
      left: '50%',
      marginLeft: -15,
      zIndex: 1,
    },
    cardContainerLeft: {
      flex: 1,
      paddingRight: 15,
      alignItems: 'flex-end',
    },
    cardContainerRight: {
      flex: 1,
      paddingLeft: -20,
      alignItems: 'flex-start',
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingVertical: 15,
      paddingHorizontal: 8,
      width: 150,
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textColumn: {
      flex: 1,
      marginLeft: 10,
    },
    textColumnLeft: {
      marginRight: 10,
      marginLeft: 0,
      alignItems: 'flex-end',
    },
    cardNumber: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 2,
    },
    cardDescription: {
      fontSize: 13,
      color: colors.text,
      fontWeight: '500',
    },
    cardIcon: {
      width: 45,
      height: 45,
      resizeMode: 'contain',
    },
  });
};