import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import useTheme from '../hooks/usetheme';

const facilities = [
  { id: '1', name: 'Smart Classes', image: require('../assets/images/smartclasses.jpg') },
  { id: '2', name: 'SIMAD Library', image: require('../assets/images/simadlibrary.jpg') },
  { id: '3', name: 'Nap Room', image: require('../assets/images/naproom.webp') },
  { id: '4', name: 'Computer Labs', image: require('../assets/images/computerlabs.jpeg') },
  { id: '5', name: 'Research Center', image: require('../assets/images/researchcenter.jpg') },
  { id: '6', name: 'Fabrican Lab', image: require('../assets/images/fablab.jpg') },
  { id: '7', name: 'Laboratoties', image: require('../assets/images/laboratories.avif') },
  { id: '8', name: 'Student Loan', image: require('../assets/images/studentloan.jpg') },
  { id: '9', name: 'Co-Working Space', image: require('../assets/images/coworkingspace.jpg') },
];

// ✅ Split into chunks of 2 for vertical stacking inside each horizontal column
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function TwoRowHorizontalList() {
  const chunkedTools = chunkArray(facilities, 2);

  const {colors} = useTheme();
  const styles = createStyle(colors);

  return (
    <View style={{ padding: 10 }}>

      <FlatList
        data={chunkedTools}
        horizontal
        keyExtractor={(item, index) => `col-${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: column }) => (
          <View style={styles.column}>
            {column.map((facility) => (
              <ImageBackground
                key={facility.id}
                source={facility.image}
                style={styles.background}
                imageStyle={styles.imageStyle} // For rounded corners
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>{facility.name}</Text>
                </View>
              </ImageBackground>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const createStyle = (colors) => {
    const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        color: colors.text
    },
    column: {
        marginRight: 8,
        justifyContent: 'space-between',
    },
    background: {
        width: 120,
        height: 90,
        marginBottom: 10,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: 10,
        borderColor: colors.border,
        borderWidth: 2
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "500",
        textAlign: 'center',
    },
    });

    return styles;


}
