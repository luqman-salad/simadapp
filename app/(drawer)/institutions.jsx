import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getInstitutionsSummary } from '../../apis/instituionsApi';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import useInstitutionsStore from '../../store/institutionsStore';


// --- InstitutionCard Redesign (Elevated Card Stack) ---
const InstitutionCard = ({ item, colors, styles }) => {
  const router = useRouter();
  const { setSelectedInstitutionTitle } = useInstitutionsStore();

  const handlePress = (title) => {
    setSelectedInstitutionTitle(title);
    router.push('/(screens)/institutionsInfo');
  };

  // Use a small image on the left side
  const imageResizeMode = 'stretch';

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="star-outline" size={14} color={colors.primary} />
        <Text style={styles.cardHeaderTitle}>Center of Excellence</Text>
      </View>
      <View style={styles.cardBody}>
        {/* Left Visual Area */}
        <Image
          source={{ uri: item.image }}
          style={styles.cardBodyImage}
          resizeMode={imageResizeMode}
        />

        {/* Content Area */}
        <View style={styles.cardBodyContent}>
          <Text style={styles.cardBodyTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cardBodyDescription} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Action Button/Chip */}
          <Pressable
            style={({ pressed }) => [
              styles.actionChip,
              { opacity: pressed ? 0.8 : 1 }
            ]}
            onPress={() => handlePress(item.title)}
          >
            <Text style={styles.actionChipText}>View Tour</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={14}
              color={colors.white}
              style={{ marginLeft: 5 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
// ---------------------------------

const Institutions = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();
  const [institutionsData, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... (fetchInstitutions logic remains the same)
  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getInstitutionsSummary();

      if (result?.success && result.data?.instituionsSummary) {
        setInstitutions(result.data.instituionsSummary);
      } else {
        setInstitutions([]);
        throw new Error('No institutions found or invalid data structure.');
      }
    } catch (err) {
      console.error('Error fetching institutions:', err);
      setError('Could not load institutions. Please check your connection.');
      setInstitutions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const renderHeader = () => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Institutional Directory</Text>
      <Text style={styles.sectionSubtitle}>Browse our fully accredited centers, institutes, and specialized departments.</Text>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.statusText}>Compiling directory...</Text>
        </View>
      );
    }

    if (error || institutionsData.length === 0) {
      return (
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons name={error ? "alert-circle-outline" : "domain-off"} size={32} color={error ? colors.danger : colors.textMuted} />
          <Text style={[styles.statusText, error && { color: colors.danger }]}>
            {error || "Directory is currently empty."}
          </Text>
          {error && (
            <Pressable onPress={fetchInstitutions} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Reload Data</Text>
            </Pressable>
          )}
        </View>
      );
    }

    // Using ScrollView to render the stacked cards
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {institutionsData.map((institution) => (
          <InstitutionCard
            key={institution.id}
            item={institution}
            colors={colors}
            styles={styles}
          />
        ))}
      </ScrollView>
    );
  };

  // ---------------------------------------------

  return (
    <View style={styles.container}>
      <Header
        title="Institutions"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
      {renderContent()}
    </View>
  );
};

export default Institutions;

// --- Stylesheet for Elevated Card Stack ---
const createStyle = (colors) => {
  // Define colors for better readability
  const primary = colors.primary || '#007AFF';
  const text = colors.text || '#000000';
  const background = colors.bg || '#F0F0F0';
  const surface = colors.surface || '#FFFFFF';
  const white = colors.white || '#FFFFFF';
  const textMuted = colors.textMuted || '#666666';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
    },
    scrollViewContent: {
      paddingBottom: 20,
    },

    // --- Section Header (Formal and clear) ---
    sectionHeader: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '900', // Very heavy title
      color: text,
      marginBottom: 5,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: textMuted,
    },

    // --- Card Structure ---
    cardWrapper: {
      marginHorizontal: 15,
      marginVertical: 10,
      backgroundColor: surface,
      borderRadius: 12,
      // Heavy, distinct shadow for the 'elevated stack' look
      shadowColor: primary, // Optional: use primary color for a branded glow
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15, // Higher opacity
      shadowRadius: 10,
      elevation: 8,
      overflow: 'hidden',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: colors.primaryFaded, // Light accent background
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    cardHeaderTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: primary,
      marginLeft: 5,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    cardBody: {
      flexDirection: 'row',
      padding: 15,
    },

    // Left Visual
    cardBodyImage: {
      width: 90,
      height: 70,
      borderRadius: 8,
      marginRight: 15,
      backgroundColor: colors.textMuted,
    },

    // Content
    cardBodyContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    cardBodyTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: text,
      marginBottom: 5,
    },
    cardBodyDescription: {
      fontSize: 13,
      color: textMuted,
      marginBottom: 10,
    },

    // Action Chip
    actionChip: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
      backgroundColor: primary,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
      marginTop: 5, // Space it from description
    },
    actionChipText: {
      color: white,
      fontSize: 13,
      fontWeight: '600',
    },

    // --- Status and Error Styles (reused) ---
    statusContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      minHeight: 300,
    },
    statusText: {
      marginTop: 10,
      fontSize: 16,
      color: textMuted,
      textAlign: 'center',
    },
    retryButton: {
      marginTop: 15,
      backgroundColor: primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
    },
    retryButtonText: {
      color: white,
      fontWeight: 'bold',
      fontSize: 14,
    },
  });
};
// import { MaterialCommunityIcons } from '@expo/vector-icons'; // For the institution icon
// import { useNavigation } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { getInstitutionsSummary } from '../../apis/instituionsApi';
// import { Header } from '../../components/Headrer';
// import useTheme from '../../hooks/usetheme'; // Assuming you have this hook for theme colors
// import useInstitutionsStore from '../../store/institutionsStore';

// // const institutionsData = [
// //   {
// //     id: '1',
// //     title: 'Center for Graduate Studies',
// //     description: 'Specializing in advanced research and education.',
// //     image: require('../../assets/images/fablab.jpg'), // Placeholder image 1
// //     // You might want to add a 'tourLink' or 'detailsScreen' property here
// //   },
// //   {
// //     id: '2',
// //     title: 'Center for Research & Development',
// //     description: 'Driving innovation through cutting-edge research.',
// //     image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

// //   },
// //   {
// //     id: '3',
// //     title: 'SIMAD Innovation Lab',
// //     description: 'A hub for technology and entrepreneurial ventures.',
// //     image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

// //   },
// //   {
// //     id: '4',
// //     title: 'Institute of Climate & Environment',
// //     description: 'Focus on sustainable solutions for a greener future.',
// //     image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

// //   },
// //   {
// //     id: '5',
// //     title: 'SIMAD Innovation Lab',
// //     description: 'A hub for technology and entrepreneurial ventures.',
// //     image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

// //   },
// //   {
// //     id: '6',
// //     title: 'Institute of Climate & Environment',
// //     description: 'Focus on sustainable solutions for a greener future.',
// //     image: require('../../assets/images/fablab.jpg'), // Placeholder image 1

// //   },
// //   // Add more institutions as needed
// // ];



// const InstitutionCard = ({ item, colors, styles }) => {
//   const router = useRouter();
//   const { setSelectedInstitutionTitle } = useInstitutionsStore();


//   const handlePress = (item) => {
//     setSelectedInstitutionTitle(item);
//     router.push('/(screens)/institutionsInfo');
//   }

//   return (
//     <View style={styles.card}>
//       <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode='cover' />
//       <View style={styles.cardContent}>
//         <Text style={styles.cardTitle}>{item.name}</Text>
//         <Text style={styles.cardDescription}>{item.description}</Text>
//         <Pressable
//           style={({ pressed }) => [
//             styles.takeATourButton,
//             { opacity: pressed ? 0.7 : 1 }
//           ]}
//           onPress={() => handlePress(item.title)}

//         >
//           <Text style={styles.takeATourButtonText}>Take a Tour</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// const Institutions = ({ navigation }) => {
//   const { colors } = useTheme();
//   const styles = createStyle(colors);
//   const navigationTab = useNavigation();
//   const [institutionsData, setInstitutions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   const fetchInstitutions = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const result = await getInstitutionsSummary();

//       if (result?.success && result.data?.instituionsSummary) {
//         setInstitutions(result.data.instituionsSummary);
//       } else {
//         throw new Error('Invalid data structure from API');
//       }
//     } catch (err) {
//       console.error('Error fetching institutions:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInstitutions();
//   }, []);


//   return (
//     <View style={styles.container}>
//       <Header
//         title="Institutions"
//         showLeftIcon
//         leftIconName="menu"
//         onLeftIconPress={() => navigationTab.openDrawer()}
//       />

//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.sectionHeader}>
//           <MaterialCommunityIcons name="domain" size={24} color={colors.primary} style={styles.sectionIcon} />
//           <Text style={styles.sectionTitle}>Explore our institutions</Text>
//         </View>

//         {institutionsData.map((institution) => (
//           <InstitutionCard
//             key={institution.id}
//             item={institution}
//             colors={colors}
//             styles={styles}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default Institutions;

// const createStyle = (colors) => {
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: colors.bg,
//     },
//     scrollViewContent: {
//       paddingBottom: 20,
//     },
//     sectionHeader: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingHorizontal: 15,
//       paddingVertical: 20,
//       borderBottomWidth: 1,
//       borderBottomColor: colors.border,
//       marginBottom: 10,
//     },
//     sectionIcon: {
//       marginRight: 10,
//       color: colors.primary, // Using primary color for the icon
//     },
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: colors.text,
//     },
//     card: {
//       flexDirection: 'row',
//       backgroundColor: colors.surface,
//       borderRadius: 10,
//       marginHorizontal: 15,
//       marginVertical: 8,
//       padding: 15,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     cardImage: {
//       width: 100,
//       height: 100,
//       borderRadius: 8,
//       marginRight: 15,
//       backgroundColor: colors.textMuted, // Placeholder background
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     cardContent: {
//       flex: 1,
//       justifyContent: 'space-between',
//     },
//     cardTitle: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: colors.text,
//       marginBottom: 5,
//     },
//     cardDescription: {
//       fontSize: 13,
//       color: colors.text,
//       marginBottom: 10,
//     },
//     takeATourButton: {
//       backgroundColor: colors.primary,
//       paddingVertical: 8,
//       paddingHorizontal: 15,
//       borderRadius: 20,
//       alignSelf: 'flex-start', // Align button to the start
//     },
//     takeATourButtonText: {
//       color: colors.white,
//       fontSize: 14,
//       fontWeight: 'bold',
//     },
//   });
// };