import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import AcademicFacilities from '../../../../components/AcademicFacilities';
import AcademicInstitutions from '../../../../components/AcademicInstitutions';
import AcademicPrograms from '../../../../components/AcademicPrograms';
import { Header } from '../../../../components/Headrer';
import InternationalPartners from '../../../../components/InternationalPartners';
import ShowCase from '../../../../components/Showcase';
import SimadInNumbers from '../../../../components/SimadInNumbers';
import useTheme from '../../../../hooks/usetheme';
import { useRouter } from 'expo-router';

const Home = () => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const navigation = useNavigation();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handlePress = () => {
        router.push("(screens)/notifications")
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        
        // Increment the refresh key to force all child components to re-render and refetch data
        setRefreshKey(prevKey => prevKey + 1);
        
        // Simulate refresh delay
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // 2 second delay to show the refresh indicator
    }, []);

    return (
        <>
            <Header
                title="SIMAD"
                showLeftIcon
                leftIconName="menu"
                // showNotifiction
                // NotificationItemCount={6}
                onLeftIconPress={() => navigation.openDrawer()}
                // onNotificationPress={() => handlePress()}
            />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]} // Android
                        tintColor={colors.primary} // iOS
                        title="Pull to refresh"
                        titleColor={colors.text}
                        progressBackgroundColor={colors.bg}
                    />
                }
            >
                <ShowCase key={`showcase-${refreshKey}`} />
                <AcademicFacilities key={`facilities-${refreshKey}`} />

                <View style={[styles.sectionContainer, styles.topBarContainer]}>
                    <Text style={styles.sectionTitle}>Academic Programs</Text>
                    <AcademicPrograms key={`programs-${refreshKey}`} />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Academic Institutions</Text>
                    <AcademicInstitutions key={`institutions-${refreshKey}`} />
                </View>

                <View style={styles.sectionContainer}>
                    {/* <Text style={styles.sectionTitle}>International Partners</Text> */}
                    <InternationalPartners key={`partners-${refreshKey}`} />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>SIMAD In Numbers</Text>
                    <SimadInNumbers key={`numbers-${refreshKey}`} />
                </View>
            </ScrollView>
        </>
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
            marginBottom: 0
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 10,
            color: colors.text,
        },
        topBarContainer: {
            minHeight: 340
        }
    });
};