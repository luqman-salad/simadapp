import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'; // Added Image for potential direct use
import useTheme from '../hooks/usetheme';

// Import university logos (YOU MUST CROP AND SAVE THESE INDIVIDUALLY)
import { router } from 'expo-router';
import { default as kumluLogo, default as lshtmLogo, default as luissLogo, default as sakaryaLogo, default as selcukLogo, default as usmLogo } from '../assets/images/react-logo.png';
// ... you would add imports for any other logos if they were present in the original image

const universities = [
  { id: '1', name: 'Kütahya Dumlupınar Üniversitesi', image: kumluLogo },
  { id: '2', name: 'Universiti Sains Malaysia', image: usmLogo },
  { id: '3', name: 'Selçuk Üniversitesi', image: selcukLogo },
  { id: '4', name: 'Sakarya Üniversitesi', image: sakaryaLogo },
  { id: '5', name: 'LUISS', image: luissLogo },
  { id: '6', name: 'London School of Hygiene & Tropical Medicine', image: lshtmLogo },
];

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

  const chunkedUniversities = chunkArray(universities, 2); // 2 items per column

  const handlePress = () => {
    router.push('/(screens)/ParternshipInfoScreen');
    // store parternshipId 
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {chunkedUniversities.map((column, index) => (
        <View key={`col-${index}`} style={styles.column}>
          {column.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handlePress()}
              style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              {/* Using Image component directly for the logo */}
              <Image
                source={item.image}
                style={styles.logoImage}
                resizeMode="contain" // Ensures the whole logo is visible
              />
            </Pressable>

            // <View key={`col-${index}`} style={styles.column}>
            //         {column.map((item) => (
            //           <Pressable
            //             key={item.id}
            //             onPress={() => handlePress(item.id)}
            //             style={({ pressed }) => [
            //               styles.card,
            //               { opacity: pressed ? 0.7 : 1 },
            //             ]}
            //           >
            //             <Image source={item.icon} style={styles.icon} />
            //             <Text style={styles.title}>{item.name}</Text>
            //           </Pressable>
            //         ))}
            //       </View>



          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    scrollContainer: {
      paddingVertical: 10,
      backgroundColor: colors.bg,
      marginBottom: 20,
    },
    column: {
      marginRight: 10,
      justifyContent: 'space-between',
    },
    card: {
      width: 150,
      height: 100,
      marginBottom: 10,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.surface, // White background for the card
      justifyContent: 'center', // Center the logo vertically
      alignItems: 'center',    // Center the logo horizontally
      borderWidth: 1, // Add a subtle border
      borderColor: colors.border, // Light grey border color
    },
    logoImage: {
      width: '80%', // Make logo take up 80% of card width
      height: '80%', // Make logo take up 80% of card height
    },
    // The following styles are no longer needed for this specific render
    // overlay: {},
    // title: {},
  });
};