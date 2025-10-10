import { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { getInstitutionsSummary } from '../apis/instituionsApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';
import useTheme from '../hooks/usetheme';

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export default function Institutions({ componentKey = 'institutions', refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useGlobalLoading(componentKey, loading);

  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getInstitutionsSummary();

      if (result?.success && result.data?.instituionsSummary) {
        setInstitutions(result.data.instituionsSummary);
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (err) {
      console.error('Error fetching institutions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, [refreshTrigger]);

  const chunkedInstitutions = chunkArray(institutions, 2); // two per column

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        {/* <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading Institutions...</Text> */}
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Failed to load institutions</Text>
        <Text style={[styles.errorDetail, { color: colors.text }]}>{error}</Text>
      </View>
    );
  }

  if (institutions.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={[styles.emptyText, { color: colors.text }]}>No institutions found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Academic Institutions</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {chunkedInstitutions.map((column, index) => (
          <View key={`col-${index}`} style={styles.column}>
            {column.map((item) => (
              <ImageBackground
                key={item.id}
                source={{ uri: item.image }}
                style={styles.card}
                imageStyle={{ borderRadius: 12 }}
                resizeMode="stretch"
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>{item.name}</Text>

                </View>
              </ImageBackground>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const createStyle = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    header: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      color: colors.text
    },
    scrollContainer: {
      paddingVertical: 10,
      marginBottom: 10,
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
      color: colors.white,
      textAlign: 'center',
    },

    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    errorDetail: {
      fontSize: 14,
      textAlign: 'center',
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
    },
  });

// import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
// import useTheme from '../hooks/usetheme';

// const facilities = [
//   { id: '1', name: 'Center for Graduate Studies', image: require('../assets/images/smartclasses.jpg') },
//   { id: '2', name: 'SIMAD Innovation Lab', image: require('../assets/images/smartclasses.jpg') },
//   { id: '3', name: 'SIMAD Fabrication Lab', image: require('../assets/images/smartclasses.jpg') },
//   { id: '4', name: 'Institute of Modern Languages (IML)', image: require('../assets/images/smartclasses.jpg') },
//   { id: '5', name: 'Research Center', image: require('../assets/images/smartclasses.jpg') },
//   { id: '6', name: 'Smart Classes', image: require('../assets/images/smartclasses.jpg') },
// ];


// const chunkArray = (array, size) => {
//   const result = [];
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   return result;
// };

// export default function HorizontalTwoRowGrid() {
//   const { colors } = useTheme();
//   const styles = createStyle(colors);

//   const chunkedFacilities = chunkArray(facilities, 2); // 2 items per column

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.scrollContainer}
//     >
//       {chunkedFacilities.map((column, index) => (
//         <View key={`col-${index}`} style={styles.column}>
//           {column.map((item) => (
//             <ImageBackground
//               key={item.id}
//               source={item.image}
//               style={styles.card}
//               imageStyle={{ borderRadius: 12 }}
//             >
//               <View style={styles.overlay}>
//                 <Text style={styles.title}>{item.name}</Text>
//               </View>
//             </ImageBackground>
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const createStyle = (colors) => {
//   return StyleSheet.create({
//     scrollContainer: {
//       //   paddingHorizontal: 10,
//       paddingVertical: 10,
//       backgroundColor: colors.bg,
//       marginBottom: 10
//     },
//     column: {
//       marginRight: 10,
//       justifyContent: 'space-between',
//     },
//     card: {
//       width: 160,
//       height: 110,
//       marginBottom: 10,
//       borderRadius: 12,
//       overflow: 'hidden',
//     },
//     overlay: {
//       flex: 1,
//       backgroundColor: 'rgba(0,0,0,0.4)', // dark overlay for text visibility
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 5,
//     },
//     title: {
//       fontSize: 14,
//       fontWeight: '600',
//       color: colors.white,
//       textAlign: 'center',
//     },
//   });
// };
