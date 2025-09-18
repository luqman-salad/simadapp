import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '../hooks/usetheme';

// Dummy logos (replace with actual imports)
import { default as kumluLogo, default as lshtmLogo, default as luissLogo, default as sakaryaLogo, default as selcukLogo, default as usmLogo } from '../assets/images/react-logo.png';
import { useBottomSheet } from '../context/BottomSheetContext';

const universities = [
  { id: '1', name: 'Kütahya Dumlupınar Üniversitesi', info: 'This is a detailed description for a tech partner. It collaborates on various projects related to climate science, biology, and advanced engineering. Our collaboration helps our students gain real-world experience. This is a detailed description for a tech partner. It collaborates on various projects related to climate science, biology, and advanced engineering. Our collaboration helps our students gain real-world experience.', logo: kumluLogo },
  { id: '2', name: 'Universiti Sains Malaysia', logo: usmLogo },
  { id: '3', name: 'Selçuk Üniversitesi', logo: selcukLogo },
  { id: '4', name: 'Sakarya Üniversitesi', logo: sakaryaLogo },
  { id: '5', name: 'LUISS', logo: luissLogo },
  { id: '6', name: 'London School of Hygiene & Tropical Medicine', logo: lshtmLogo },
];

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function PartnersCard() {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const { openSheet } = useBottomSheet();

  const chunkedUniversities = chunkArray(universities, 2); // 2 items per column



  const handleSeeAll = () => {
    router.push('/(screens)/ParternshipInfoScreen'); // create this screen to show the full list
  };

  return (
    <View style={styles.container}>
      {/* Header with title + See All link */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Our Partners</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

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
                onPress={() => openSheet("partner", item)}
                style={({ pressed }) => [
                  styles.card,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Image
                  source={item.logo}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      backgroundColor: colors.bg,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // paddingHorizontal: 10,
      // marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      color: colors.text,
    },
    seeAllText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.primary,
    },
    scrollContainer: {
      paddingVertical: 10,
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
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    logoImage: {
      width: '80%',
      height: '80%',
    },
  });
};

