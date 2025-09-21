import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
    const router = useRouter()

    const handlePress = () => {
        router.push("(screens)/notifications")
    }

    return (
        <>
            <Header
                title="SIMAD"
                showLeftIcon
                leftIconName="menu"
                showNotifiction
                NotificationItemCount={6}
                onLeftIconPress={() => navigation.openDrawer()}
                onNotificationPress={() => handlePress()}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <ShowCase />
                <AcademicFacilities />

                <View style={[styles.sectionContainer, styles.topBarContainer]}>
                    <Text style={styles.sectionTitle}>Academic Programs</Text>
                    <AcademicPrograms />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Academic Institutions</Text>
                    <AcademicInstitutions />
                </View>

                <View style={styles.sectionContainer}>
                    {/* <Text style={styles.sectionTitle}>International Partners</Text> */}
                    <InternationalPartners />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>SIMAD In Numbers</Text>
                    <SimadInNumbers />
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