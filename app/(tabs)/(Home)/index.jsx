import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import ShowCase from '../../../components/Showcase';
import useTheme from '../../../hooks/usetheme';
import AcademicFacilities from '../../../components/AcademicFacilities';
import AcademicPrograms from '../../../components/AcademicPrograms';
import AcademicInstitutions from '../../../components/AcademicInstitutions';
import InternationalPartners from '../../../components/InternationalPartners';
import SimadInNumbers from '../../../components/SimadInNumbers';


const Home = () => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

  return (
    <ScrollView style={styles.container}>
        <View style={styles.topbarmenu}>
            <Ionicons name='menu' style={styles.icon}/>
            <Ionicons name='notifications-outline' style={styles.icon}/>
        </View>

        <ShowCase/>
        <AcademicFacilities/>
        
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Academic Programs</Text>
            <AcademicPrograms/>
        </View>

        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Academic Institutions</Text>
            <AcademicInstitutions/>
        </View>

        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>International Partners</Text>
            <InternationalPartners/>
        </View>

        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>SIMAD In Numbers</Text>
            <SimadInNumbers/>
        </View>
    </ScrollView>
  );
};

export default Home;

const createStyle = (colors) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.bg,
            flex: 1
        },
        topbarmenu: {
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between"
        },
        icon: {
            fontSize: 26,
            color: colors.text
        },
        sectionContainer: {
            paddingHorizontal: 10,
            marginBottom: 10
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 10,
            color: colors.text,
        }
    });
};