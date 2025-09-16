import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ExpandableProgramList from '../../components/ExpandableProgramList';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';

// Data for the main categories
const academicCategories = [
  {
    id: 'postgraduate',
    title: 'Postgraduate',
    description: "Explore our Master's programs.",
    color: '#6F4EAE', // Purple
    icon: 'school-outline', // Example icon
    programs: [
      {
        categoryTitle: 'SIMAD Master Programs',
        available: 12,
        subPrograms: [
          'Master of Science in Finance',
          'Master of Business Administration (MBA)',
          'Master of Science in IT',
          'Master of Science in Accounting',
          'Master of procurement and logistics',
          'Master of Art in Public Policy',
          'Master of Education',
          'Master of Computer Science',
          'Master of Data Sciecne',
          'Master of Science in Telecommunication & Networking',
          'Master of Arts in international Relations & Diplomacy'
        ],
      },
      {
        categoryTitle: 'Open University Malaysia programs',
        available: 12,
        subPrograms: [],
      },
    ],
  },
  {
    id: 'undergraduates',
    title: 'Undergraduates',
    description: "Discover our Bachelor's degrees.",
    color: '#34A853', // Green
    icon: 'book-outline', // Example icon
    programs: [
      {
        categoryTitle: 'School of Accountancy',
        available: 3,
        subPrograms: [
          'Bachelor of Business Administration',
          'Bachelor of Computer Science',
          'Bachelor of Public Health',
        ],
      },
      {
        categoryTitle: 'School of Computing',
        available: 3,
        subPrograms: [],
      },
      {
        categoryTitle: 'School of Economics',
        available: 4,
        subPrograms: [],
      },
      {
        categoryTitle: 'School of Education',
        available: 4,
        subPrograms: [],
      },
      {
        categoryTitle: 'School of Engineering',
        available: 2,
        subPrograms: [],
      },
      {
        categoryTitle: 'School of Law',
        available: 2,
        subPrograms: [],
      },
    ],
  },
  {
    id: 'diploma',
    title: 'Diploma',
    description: 'Find the right diploma program for you.',
    color: '#EA4335', // Red
    icon: 'folder-outline', // Example icon
    programs: [
      {
        categoryTitle: 'Diploma in Information Technology',
        available: 5,
        subPrograms: [],
      },
      {
        categoryTitle: 'Diploma in Public Administration',
        available: 5,
        subPrograms: [],
      },
    ],
  },
];

const AcademicProgramsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();

  const bottomSheetRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const snapPoints = ['25%', '65%', '90%'];

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setSelectedCategory(null);
    }
  }, []);

  const openBottomSheet = (category) => {
    setSelectedCategory(category);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };



  return (
    <View style={styles.container}>
      <Header
        title="Schools"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
      {/* Academic Programs Section */}
      <View style={styles.academicProgramsHeader}>
        <Ionicons name="library-outline" size={24} color={colors.primary} style={styles.academicIcon} />
        <Text style={styles.academicTitle}>Academic Programs</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {academicCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.card}
            onPress={() => openBottomSheet(category)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{category.title}</Text>
              <Text style={styles.cardDescription}>{category.description}</Text>
            </View>
            <Ionicons name="arrow-forward" size={24} style={styles.icon} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        handleIndicatorStyle={styles.bottomSheetHandle}
        backgroundStyle={styles.bottomSheetBackground}
      >
        {selectedCategory && (
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>{selectedCategory.title} Programs</Text>
              <TouchableOpacity onPress={closeBottomSheet}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <BottomSheetScrollView style={styles.bottomSheetScrollContent}>
              {selectedCategory.programs.map((programCategory, index) => (
                <ExpandableProgramList
                  key={index}
                  programCategory={programCategory}
                  iconName={
                    selectedCategory.id === 'postgraduate' ? 'laptop-outline' :
                      selectedCategory.id === 'undergraduates' ? 'book-outline' :
                        'document-text-outline'
                  }
                />
              ))}
            </BottomSheetScrollView>
          </View>
        )}
      </BottomSheet>
    </View>
  );
};

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },


    academicProgramsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      paddingVertical: 20,
    },
    academicIcon: {
      marginRight: 10,
    },
    academicTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    cardsContainer: {
      padding: 16,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderRadius: 12,
      marginBottom: 15,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.1,
      // shadowRadius: 4,
      // elevation: 3,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border
    },
    cardContent: {
      flex: 1,
      marginRight: 10,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.8,
    },
    icon: {
      color: colors.text
    },
    // Bottom Sheet Styles
    bottomSheetHandle: {
      backgroundColor: colors.surface,
      width: 60,
      borderRadius: 5,
    },
    bottomSheetBackground: {
      borderRadius: 20,
    },
    bottomSheetContent: {
      flex: 1,
      paddingHorizontal: 16,
    },
    bottomSheetHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
      paddingTop: 5,
    },
    bottomSheetTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    bottomSheetScrollContent: {
      paddingBottom: 20,
    },
  });
}
export default AcademicProgramsScreen;