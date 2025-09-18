// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// // No need for setLayoutAnimationEnabledExperimental() as the New Architecture handles it automatically.

// const ExpandableProgramList = ({ programCategory, iconName = 'laptop-outline' }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleExpand} style={styles.header}>
//         <View style={styles.iconBackground}>
//           <Ionicons name={iconName} size={20} color="#6F4EAE" />
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>{programCategory.categoryTitle}</Text>
//           <Text style={styles.subtitle}>Up to {programCategory.available} Programs available</Text>
//         </View>
//         <Ionicons 
//           name={isExpanded ? "chevron-up" : "chevron-down"} 
//           size={22} 
//           color="#888" 
//         />
//       </TouchableOpacity>
//       {isExpanded && (
//         <View style={styles.content}>
//           {programCategory.subPrograms.length > 0 ? (
//             programCategory.subPrograms.map((program, index) => (
//               <Text key={index} style={styles.programItem}>
//                 <Ionicons name="caret-forward-outline" size={14} color="#555" /> {program}
//               </Text>
//             ))
//           ) : (
//             <Text style={styles.noProgramsText}>No detailed programs listed.</Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 10,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#eee',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//   },
//   iconBackground: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#F0F2F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 2,
//   },
//   subtitle: {
//     fontSize: 13,
//     color: '#777',
//   },
//   content: {
//     paddingHorizontal: 15,
//     paddingBottom: 15,
//     paddingTop: 5,
//     backgroundColor: '#f9f9f9',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   programItem: {
//     fontSize: 14,
//     color: '#555',
//     lineHeight: 22,
//     marginLeft: 10,
//   },
//   noProgramsText: {
//     fontSize: 14,
//     color: '#888',
//     fontStyle: 'italic',
//     textAlign: 'center',
//     paddingVertical: 10,
//   },
// });

// export default ExpandableProgramList;