import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Added TouchableOpacity
import useTheme from '../hooks/usetheme';

// ⚠️ IMPORTANT: Update these image paths to your actual local assets
import masterProgramsIcon from '../assets/icons/desktop-computer.png'; // Placeholder for graduation cap
import oumProgramsIcon from '../assets/icons/desktop-computer.png';     // Placeholder for OUM logo

const programs = [
  { id: '1', name: 'SIMAD Master Programs', icon: masterProgramsIcon },
  { id: '2', name: 'OUM Programs', icon: oumProgramsIcon },
];

export default function ProgramCards() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const handleCardPress = (programName) => {
    console.log(`${programName} card pressed!`);
    // Add navigation logic here, e.g.,
    // navigation.navigate('ProgramDetails', { program: programName });
  };

  return (
    <View style={styles.container}>
      {programs.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.7} // Visual feedback on press
          onPress={() => handleCardPress(item.name)}
        >
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: colors.bg,
    },
    card: {
      backgroundColor: colors.surface, 
      width: 160, 
      height: 200, 
      borderRadius: 12,
      padding: 10,
      alignItems: 'center', 
      justifyContent: 'center', 
      marginHorizontal: 5, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3, 
    },
    icon: {
      width: 50, 
      height: 50, 
      marginBottom: 10, 
      resizeMode: 'contain',
    },
    title: {
      fontSize: 14, 
      fontWeight: '500',
      color: colors.text,
      textAlign: 'center',
    },
  });
};