import { MaterialCommunityIcons } from '@expo/vector-icons'; // For the institution icon
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme'; // Assuming you have this hook for theme colors
import useInstitutionsStore from '../../store/institutionsStore';

const institutionsData = [
  {
    id: '1',
    title: 'Center for Graduate Studies',
    description: 'Specializing in advanced research and education.',
    image: require('../../assets/images/fablab.jpg'), // Placeholder image 1
    // You might want to add a 'tourLink' or 'detailsScreen' property here
  },
  {
    id: '2',
    title: 'Center for Research & Development',
    description: 'Driving innovation through cutting-edge research.',
    image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

  },
  {
    id: '3',
    title: 'SIMAD Innovation Lab',
    description: 'A hub for technology and entrepreneurial ventures.',
    image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

  },
  {
    id: '4',
    title: 'Institute of Climate & Environment',
    description: 'Focus on sustainable solutions for a greener future.',
    image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

  },
  {
    id: '5',
    title: 'SIMAD Innovation Lab',
    description: 'A hub for technology and entrepreneurial ventures.',
    image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

  },
  {
    id: '6',
    title: 'Institute of Climate & Environment',
    description: 'Focus on sustainable solutions for a greener future.',
    image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

  },
  // Add more institutions as needed
];

const InstitutionCard = ({ item, colors, styles }) => {
  const router = useRouter();
  const {setSelectedInstitutionTitle} = useInstitutionsStore();

  const handlePress = (item) => {
    setSelectedInstitutionTitle(item);
    router.push('/(screens)/institutionsInfo');
  }

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.takeATourButton,
            { opacity: pressed ? 0.7 : 1 }
          ]}
          onPress={() => handlePress(item.title)}

        >
          <Text style={styles.takeATourButtonText}>Take a Tour</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Institutions = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();


  return (
    <View style={styles.container}>
      <Header
        title="Institutions"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="domain" size={24} color={colors.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Explore our institutions</Text>
        </View>

        {institutionsData.map((institution) => (
          <InstitutionCard
            key={institution.id}
            item={institution}
            colors={colors}
            styles={styles}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Institutions;

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    scrollViewContent: {
      paddingBottom: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 10,
    },
    sectionIcon: {
      marginRight: 10,
      color: colors.primary, // Using primary color for the icon
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 10,
      marginHorizontal: 15,
      marginVertical: 8,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 15,
      backgroundColor: colors.textMuted, // Placeholder background
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    cardDescription: {
      fontSize: 13,
      color: colors.text,
      marginBottom: 10,
    },
    takeATourButton: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      alignSelf: 'flex-start', // Align button to the start
    },
    takeATourButtonText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
};