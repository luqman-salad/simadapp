import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import useTheme from '../hooks/usetheme';

const facilities = [
  { id: '1', name: 'Center for Graduate Studies', image: require('../assets/images/smartclasses.jpg') },
  { id: '2', name: 'SIMAD Innovation Lab', image: require('../assets/images/smartclasses.jpg') },
  { id: '3', name: 'SIMAD Fabrication Lab', image: require('../assets/images/smartclasses.jpg') },
  { id: '4', name: 'Institute of Modern Languages (IML)', image: require('../assets/images/smartclasses.jpg') },
  { id: '5', name: 'Research Center', image: require('../assets/images/smartclasses.jpg') },
  { id: '6', name: 'Smart Classes', image: require('../assets/images/smartclasses.jpg') },
];

// ✅ Split into chunks of 2 for two rows per column
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function HorizontalTwoRowGrid() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const chunkedFacilities = chunkArray(facilities, 2); // 2 items per column

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {chunkedFacilities.map((column, index) => (
        <View key={`col-${index}`} style={styles.column}>
          {column.map((item) => (
            <ImageBackground
              key={item.id}
              source={item.image}
              style={styles.card}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </ImageBackground>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    scrollContainer: {
    //   paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: colors.bg,
      marginBottom: 10
    },
    column: {
      marginRight: 10,
      justifyContent: 'space-between',
    },
    card: {
      width: 160,
      height: 110,
      marginBottom: 10,
      borderRadius: 12,
      overflow: 'hidden',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)', // dark overlay for text visibility
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
      textAlign: 'center',
    },
  });
};
