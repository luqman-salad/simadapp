import { useRouter } from 'expo-router';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '../../../../hooks/usetheme';
import useAboutStore from '../../../../store/aboutStore';

const { width } = Dimensions.get('window');

const cardData = [
  {
    id: '1',
    title: 'Learn About SIMAD University in 5 min',
    image: require('../../../../assets/images/fablab.jpg'), // Placeholder image 1
  },
  {
    id: '2',
    title: 'The Rector\'s Office',
    image: require('../../../../assets/images/fablab.jpg'), // Placeholder image 2
  },
  {
    id: '3',
    title: 'The Senate',
    image: require('../../../../assets/images/fablab.jpg'), // Placeholder image 3
  },
  {
    id: '4',
    title: 'Vision and Purpose',
    image: require('../../../../assets/images/fablab.jpg'), // Placeholder image 4
  },
  {
    id: '5',
    title: 'History & Awards',
    image: require('../../../../assets/images/fablab.jpg'), // Placeholder image 5
  },
  {
    id: '6',
    title: 'Accreditation, Ranking, & Memberships',
    image: require('../../../../assets/images/fablab.jpg'), // Placeholder image 6
  },
];

export default function ImageGrid() {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();
  const {setSelectedAboutItem} = useAboutStore();


  const handlePress = (item) => {
    setSelectedAboutItem(item);
    router.push("/detail");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cardData.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handlePress(item)}

        >
          <ImageBackground
            source={item.image}
            style={styles.card}
            imageStyle={styles.image}
          >
            <View style={styles.overlay} />
            <Text style={styles.title}>{item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const createStyle = (colors) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingTop: 10,
      backgroundColor: colors.bg, // Light grey background
    },
    card: {
      width: (width - 30) / 2, // 2 cards per row with 10px spacing on each side
      height: 160,
      marginBottom: 10,
      borderRadius: 10,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      padding: 10,
    },
    image: {
      borderRadius: 15,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for text readability
      borderRadius: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      zIndex: 1, // Ensure text is above the overlay
    },
  });
  return styles;

}