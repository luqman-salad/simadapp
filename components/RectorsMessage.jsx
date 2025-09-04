import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';

// This component combines the two designs you provided into a single page.
export default function RectorsOffice() {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    // The data is split to correspond to the different sections of the design.
    const rectorsData = {
        name: 'Dr. Abdikarim Mohaidin Ahmed',
        title: 'The Rector',
        image: require('../assets/images/fablab.jpg'),
        email: 'muhudiin@simad.edu.so',
        bio: 'Dr. Abdikarim Mohaidin Ahmed is the current Rector of SIMAD University, having officially assumed the position on August 10, 2024, following his appointment by the Board of Trustees. His career, marked by a profound dedication to academia, leadership, and community service, reflects his unwavering commitment to excellence and collaboration.\n\nDr. Mohaidin earned his doctoral degree in Business Administration from Atilim University, Turkey, in 2023. He also holds an MBA in Logistics from the Cyprus Institute of Marketing in Nicosia, Cyprus, a Master’s degree in Development Studies from Kampala International University, Uganda, and a Bachelor’s degree in Information Technology from SIMAD University, Somalia.\n\nThroughout his tenure at SIMAD University, Dr. Mohaidin has held several key positions that showcase his leadership and vision. His previous roles include Deputy Rector for Institutional Development, University Senate Secretary, and Director for International Cooperation. He has also served as the Director for Public Relations, Director of the PFM Academy, Dean of the Faculty of Computing, and senior lecturer at the Faculty of Management Sciences.',
        message: 'Since its foundation in 1999, SIMAD University has played a vital role in meeting the growing demand for higher education in Somalia. We believe in the importance of delivering quality education for young Somalis.\n\nAll our staff and Schools are motivated, knowing that by preparing our youth for the future, they are directly contributing to the development and success of Somalia.\n\nWe are proud of the notable achievements our team has made in such a short time. Responding to the needs of the local population, we have successfully implemented a number of undergraduate academic programs, among them Medicine and Health Sciences, Telecommunications and Engineering, Computers and IT, Business, Banking and Economics, Political Sciences, Law, and Sharia as well as specializations in Math, Statistics and Natural Sciences offerings designed to empower our students with the knowledge and skills needed to thrive in the modern world.\n\nCongratulations again, and may your journey ahead be filled with success, happiness, and fulfillment.\n\nWarm regards,\n\nDr. Abdikarim Mohaidin\nThe Rector'
    };

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${rectorsData.email}`);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.topSection}>
                <Image
                    source={rectorsData.image}
                    style={styles.rectorImage}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.rectorName}>{rectorsData.name}</Text>
                </View>
            </View>



            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderIcon}>✉️</Text>
                    <Text style={styles.cardTitle}>Message from the Rector</Text>
                </View>
                <Text style={styles.cardText}>{rectorsData.message}</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderIcon}>📄</Text>
                    <Text style={styles.cardTitle}>Biography of the Rector</Text>
                </View>
                <Text style={styles.cardSubtitle}>{rectorsData.name}</Text>
                <Text style={styles.cardText}>Rector, SIMAD University</Text>
                <Text style={styles.cardText}>Mogadishu, Somalia</Text>
                <Text style={styles.cardText} selectable={true}>{rectorsData.bio}</Text>
                <Pressable onPress={handleEmailPress}>
                    <Text style={styles.emailText}>email: {rectorsData.email}</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const createStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1, // Keep flex: 1 on the container to fill the screen space
            backgroundColor: colors.bg,
        },
        contentContainer: {
            paddingVertical: 20, // Move padding here to apply to content
        },
        topSection: {
            alignItems: 'center',
            marginBottom: 20,
        },
        rectorImage: {
            width: 150,
            height: 150,
            borderRadius: 75,
            borderWidth: 1,
            borderColor: colors.primary,
        },
        titleContainer: {
            backgroundColor: colors.surface,
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 0.5,

            borderColor: colors.primary,

            marginTop: 10,
        },
        rectorName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.primary,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 20,
            marginHorizontal: 15,
            marginBottom: 20,
            borderWidth: 0.5,
            borderColor: colors.primary,
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        cardHeaderIcon: {
            fontSize: 24,
            marginRight: 10,
        },
        cardTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.secondary,
        },
        cardSubtitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        cardText: {
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 10,
        },
        emailText: {
            color: colors.secondary,
            textDecorationLine: 'underline',
        },
    });
};
