//school.jsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Headrer';
import { useBottomSheet } from '../../context/BottomSheetContext';
import useTheme from '../../hooks/usetheme';

const programsData = {
  Postgraduate: {
    title: 'Postgraduate Programs',
    color: '#f1f8f2', // Indigo 500
    subPrograms: [
      {
        id: '1', name: 'SIMAD Master Programs', type: 'category', programs: [
          { id: '1a', name: 'Master of Business Administration (MBA)', icon: 'flask-outline' },
          { id: '1b', name: 'Master of Science in IT', icon: 'server-outline' },
        ]
      },
      {
        id: '2', name: 'Open University Malaysia programs', type: 'category', programs: [
          { id: '2a', name: 'Master of Islamic Finance', icon: 'book-outline' },
          { id: '2b', name: 'Master of Education', icon: 'pencil-outline' },
        ]
      }
    ]
  },
  Undergraduate: {
    title: 'Undergraduate Programs',
    color: '#f1f8f2', // Emerald 500
    subPrograms: [
      {
        id: '3', name: 'Faculty of Economics', type: 'category', programs: [
          { id: '3a', name: 'Bachelor of Science in Economics', icon: 'cash-outline' },
          { id: '3b', name: 'Bachelor of Business Administration', icon: 'briefcase-outline' },
        ]
      },
      {
        id: '4', name: 'Faculty of Computing', type: 'category', programs: [
          { id: '4a', name: 'Bachelor of Science in IT', icon: 'desktop-outline' },
          { id: '4b', name: 'Bachelor of Software Engineering', icon: 'code-slash-outline' },
        ]
      },

      {
        id: '14', name: 'Faculty of Accontancy', type: 'category', programs: [
          { id: 'sa', name: 'Bachelor of Science in IT', icon: 'desktop-outline' },
          { id: 'sb', name: 'Bachelor of Software Engineering', icon: 'code-slash-outline' },
        ]
      },
      {
        id: '15', name: 'Faculty of Social Science', type: 'category', programs: [
          { id: '1', name: 'Bachelor of Science in IT', icon: 'desktop-outline' },
          { id: '2', name: 'Bachelor of Software Engineering', icon: 'code-slash-outline' },
        ]
      },
      {
        id: '16', name: 'Faculty of Health', type: 'category', programs: [
          { id: '3', name: 'Bachelor of Science in IT', icon: 'desktop-outline' },
          { id: '4', name: 'Bachelor of Software Engineering', icon: 'code-slash-outline' },
        ]
      },
      {
        id: '17', name: 'Faculty of Engineering', type: 'category', programs: [
          { id: '5', name: 'Bachelor of Science in IT', icon: 'desktop-outline' },
          { id: '6', name: 'Bachelor of Software Engineering', icon: 'code-slash-outline' },
        ]
      },
      {
        id: '27', name: 'Faculty of Law', type: 'category', programs: [
          { id: '35', name: 'Bachelor of Science in IT', icon: 'desktop-outline' },
          { id: '36', name: 'Bachelor of Software Engineering', icon: 'code-slash-outline' },
        ]
      },
      {
        id: '127', name: 'Faculty of Education', type: 'category', programs: [
          { id: '222', name: 'Bachelor of Science in IT', icon: 'desktop-outline' },
          { id: '6222', name: 'Bachelor of Software Engineering', icon: 'code-slash-outline' },
        ]
      },

    ]
  },
  Diploma: {
    title: 'Diploma Programs',
    color: '#f1f8f2', // Red 500
    subPrograms: [
      { id: '5', name: 'Diploma in Information Technology', type: 'program', icon: 'laptop-outline' },
      { id: '6', name: 'Diploma in Public Administration', type: 'program', icon: 'library-outline' },
    ]
  }
};

const AcademicProgramsScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();
  const { openSheet } = useBottomSheet();



  return (
    <View style={styles.container}>
      <Header
        title="Academic Programs"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
      <View style={styles.content}>
        {Object.keys(programsData).map((key) => {
          const program = programsData[key];
          return (
            <Pressable
              key={key}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: program.color, opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={() => openSheet(program)}
            >
              <View>
                <Text style={styles.cardTitle}>{program.title.replace(' Programs', '')}</Text>
                <Text style={styles.cardDescription}>{`Explore our ${program.title.replace(' Programs', '')}'s programs.`}</Text>
              </View>
              <Ionicons name="arrow-forward" size={24} color={colors.textPrimary} />
            </Pressable>
          );
        })}
      </View>


    </View>

  );
};

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    content: {
      padding: 20,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 15,
      padding: 25,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.text,
      marginTop: 5,
    },
  });
};

export default AcademicProgramsScreen;