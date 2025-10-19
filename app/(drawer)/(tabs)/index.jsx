import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import AcademicFacilities from '../../../components/AcademicFacilities';
import AcademicInstitutions from '../../../components/AcademicInstitutions';
import AcademicPrograms from '../../../components/AcademicPrograms';
import { Header } from '../../../components/Headrer';
import Partners from "../../../components/Partners"
import ShowCase from '../../../components/Showcase';
import SimadInNumbers from '../../../components/SimadInNumbers';
import useTheme from '../../../hooks/usetheme';
import { useRouter } from 'expo-router';
import useLoadingStore from '../../../store/loadingStore'; // Import the loading store

const Home = () => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const navigation = useNavigation();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // Renamed for clarity
    
    // Get the clear function from loading store
    const { clearAllLoadingStates } = useLoadingStore();

    const handlePress = () => {
        router.push("(screens)/notifications")
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        
        // Clear all loading states before refresh
        clearAllLoadingStates();
        
        // Increment refresh trigger to force all child components to refetch data
        setRefreshTrigger(prev => prev + 1);
        
        // Set timeout to stop refresh indicator
        setTimeout(() => {
            setRefreshing(false);
        }, 3000); // 3 seconds to allow components to reload
    }, [clearAllLoadingStates]);

    return (
        <>
            <Header
                title="SIMAD"
                showLeftIcon
                leftIconName="menu"
                onLeftIconPress={() => navigation.openDrawer()}
            />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                        title="Pull to refresh"
                        titleColor={colors.text}
                        progressBackgroundColor={colors.bg}
                    />
                }
            >
                {/* Pass componentKey and refreshTrigger to all components */}
                <ShowCase componentKey="showcase" refreshTrigger={refreshTrigger} />
                <AcademicFacilities componentKey="facilities" refreshTrigger={refreshTrigger} />

                <View style={[styles.sectionContainer, styles.topBarContainer]}>
                    <Text style={styles.sectionTitle}>Academic Programs</Text>
                    <AcademicPrograms componentKey="programs" refreshTrigger={refreshTrigger} />
                </View>

                <View style={styles.sectionContainer}>
                    {/* <Text style={styles.sectionTitle}>Academic Institutions</Text> */}
                    <AcademicInstitutions componentKey="institutions" refreshTrigger={refreshTrigger} />
                </View>

                <View style={styles.sectionContainer}>
                    <Partners componentKey="partners" refreshTrigger={refreshTrigger} />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>SIMAD In Numbers</Text>
                    <SimadInNumbers componentKey="numbers" refreshTrigger={refreshTrigger} />
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
            minHeight: 480
        }
    });
};