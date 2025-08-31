import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ShowCase from '../../../components/Showcase'
import useTheme from '../../../hooks/usetheme'
import AcademicFacilities from "../../../components/AcademicFacilities"
import AcademicPrograms from '../../../components/AcademicPrograms'


const Home = () => {
    const {colors} = useTheme();
    const styles = createStyle(colors);
  return (
    <ScrollView style={styles.container}>
        <View style={styles.topbarmenu}>
            <Ionicons name='menu' style={styles.icon}/>
            <Ionicons name='notifications-outline' style={styles.icon}/>
        </View>

        /*Showcase Setion */
        <ShowCase/>

        /*Academic Facilities Setion */
        <AcademicFacilities/>

        /*Academic Programs Setion */
        <View style={styles.topbarcontainer}>
            <Text style={styles.academicProgramsTitle}>Academic Programs</Text>
            <AcademicPrograms/>
        </View>
        
    </ScrollView>
  )
}

export default Home;

const createStyle = (colors) => {

    const styles = StyleSheet.create({
        container:{
            backgroundColor: colors.bg,
            flex: 1
        },
        topbarmenu:{
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between"
        },
        icon:{
            fontSize: 26
        },
        topbarcontainer:{
            minHeight: 310,
            paddingHorizontal: 10
        },
        academicProgramsTitle:{
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 10,
            color: colors.text
        }
    });
    return styles;
}