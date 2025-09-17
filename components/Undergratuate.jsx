import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';

const schools = [
  { id: '1', name: 'School of Accountancy', icon: require('../assets/icons/desktop-computer.png') },
  { id: '2', name: 'School of Computing', icon: require('../assets/icons/desktop-computer.png') },
  { id: '3', name: 'School of Economics', icon: require('../assets/icons/desktop-computer.png') },
  { id: '4', name: 'School of Education', icon: require('../assets/icons/desktop-computer.png') },
  { id: '5', 'name': 'School of Law', icon: require('../assets/icons/desktop-computer.png') },
  { id: '6', 'name': 'School of Medicine', icon: require('../assets/icons/desktop-computer.png') },
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
  const navigation = useNavigation(); // Get the navigation object

  const chunkedSchools = chunkArray(schools, 2);

  const handlePress = (schoolId) => {
    router.push('/(screens)/SchoolInfoScreen');
    // store SchoolId 
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {chunkedSchools.map((column, index) => (
        <View key={`col-${index}`} style={styles.column}>
          {column.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handlePress(item.id)}
              style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.title}>{item.name}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: colors.bg,
      paddingBottom: 20,
    },
    column: {
      marginRight: 10,
      justifyContent: 'space-between',
    },
    card: {
      backgroundColor: colors.surface,
      width: 140,
      height: 100,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    icon: {
      width: 40,
      height: 40,
      marginBottom: 8,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.text,
      textAlign: 'center',
    },
  });
};

// import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
// import useTheme from '../hooks/usetheme';

// const schools = [
//   { id: '1', name: 'School of Accountancy', icon: require('../assets/icons/desktop-computer.png') },
//   { id: '2', name: 'School of Computing', icon: require('../assets/icons/desktop-computer.png') },
//   { id: '3', name: 'School of Economics', icon: require('../assets/icons/desktop-computer.png') },
//   { id: '4', name: 'School of Education', icon: require('../assets/icons/desktop-computer.png') },
//   { id: '5', name: 'School of Law', icon: require('../assets/icons/desktop-computer.png') },
//   { id: '6', name: 'School of Medicine', icon: require('../assets/icons/desktop-computer.png') },
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

//   const chunkedSchools = chunkArray(schools, 2); // 2 items per column

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.scrollContainer}
//     >
//       {chunkedSchools.map((column, index) => (
//         <View key={`col-${index}`} style={styles.column}>
//           {column.map((item) => (
//             <View key={item.id} style={styles.card}>
//               <Image source={item.icon} style={styles.icon} />
//               <Text style={styles.title}>{item.name}</Text>
//             </View>
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const createStyle = (colors) => {
//   return StyleSheet.create({
//     scrollContainer: {
//       paddingHorizontal: 10,
//       paddingVertical: 20,
//       backgroundColor: colors.bg,
//       paddingBottom: 20
//     },
//     column: {
//       marginRight: 10,
//       justifyContent: 'space-between',
//     },
//     card: {
//       backgroundColor: colors.surface,
//       width: 140,
//       height: 100,
//       borderRadius: 10,
//       padding: 10,
//       marginBottom: 10,
//       alignItems: 'center',
//       justifyContent: 'center',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 3.84,
//       elevation: 3,
//       borderWidth: 1,
//       borderColor: colors.border,
//     },
//     icon: {
//       width: 40,
//       height: 40,
//       marginBottom: 8,
//       resizeMode: 'contain',
//     },
//     title: {
//       fontSize: 13,
//       fontWeight: '500',
//       color: colors.text,
//       textAlign: 'center',
//     },
//   });
// };
