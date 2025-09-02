import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import useTheme from '../hooks/usetheme'; // Assuming useTheme is correctly located

// Import your specific images for each card
import erasmusImage1 from '../assets/images/computerlabs.jpeg'; // Placeholder for first Erasmus image
import erasmusImage2 from '../assets/images/computerlabs.jpeg'; // Placeholder for second Erasmus image (boy with papers)
import announcementImage from '../assets/images/computerlabs.jpeg'; // Placeholder for important announcement image
import erasmusImage3 from '../assets/images/computerlabs.jpeg'; // Placeholder for third Erasmus image (boy with papers)

const cardData = [
  {
    id: '1',
    image: erasmusImage1,
    title: 'CALL FOR APPLICATIONS: ERASMUS+ KA107 STUDENT MOBILITY PROGRAM',
    description: 'All applications must be submitted by March 8, 2025.',
    link: 'https://simad.edu.so/erasmus-program-1', // Example link
  },
  {
    id: '2',
    image: erasmusImage2,
    title: 'CALL FOR APPLICATIONS: ERASMUS+ KA107 STUDENT MOBILITY PROGRAM',
    description: 'All applications must be submitted by March 8, 2025.',
    link: 'https://simad.edu.so/erasmus-program-2',
  },
  {
    id: '3',
    image: announcementImage,
    title: 'CALL FOR APPLICATIONS: ERASMUS+ KA107 STUDENT MOBILITY PROGRAM', // Note: Title in image is same as above
    description: 'Preliminary Evaluation Result for Erasmus+ Staff Training Mobility Program 2025',
    link: 'https://simad.edu.so/announcement-erasmus',
  },
  {
    id: '4',
    image: erasmusImage3,
    title: 'CALL FOR APPLICATIONS: ERASMUS+ KA107 STUDENT MOBILITY PROGRAM',
    description: 'All applications must be submitted by March 8, 2025.',
    link: 'https://simad.edu.so/erasmus-program-3',
  },
  {
    id: '5',
    image: erasmusImage3,
    title: 'CALL FOR APPLICATIONS: ERASMUS+ KA107 STUDENT MOBILITY PROGRAM',
    description: 'All applications must be submitted by March 8, 2025.',
    link: 'https://simad.edu.so/erasmus-program-3',
  },
];

export default function AnnouncementList() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const handleReadMore = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      {cardData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => handleReadMore(item.link)} // Make the whole card tappable to the link
        >
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => handleReadMore(item.link)}>
              <Text style={styles.readMore}>Read More...</Text>
            </TouchableOpacity>
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
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      overflow: 'hidden', 
    },
    cardImage: {
      width: 120, 
      height: 120, 
      borderRadius: 12, 
      margin: 10, 
      resizeMode: 'cover', 
    },
    cardContent: {
      flex: 1, 
      paddingVertical: 10,
      paddingRight: 10, 
      justifyContent: 'center', 
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    cardDescription: {
      fontSize: 12,
      color: colors.text,
      marginBottom: 5,
    },
    readMore: {
      fontSize: 12,
      color: colors.primary, 
      fontWeight: '600',
    },
  });
};