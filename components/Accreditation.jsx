import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';

const data = [
    {
        title: "Ministry Of Education, Culture, And Higher Education (MOECHE)",
        subtitle: "",
        description: "SIMAD University is officially recognized by the Ministry of Education, Culture, and Higher Education of the Republic of Somalia. Registered as a private, non-profit institution of higher education, the university is committed to advancing and disseminating",
        logo: require('../assets/images/fablab.jpg')
    },
    {
        title: "Times Higher Education Sub-Saharan Africa University Ranking",
        description: "SIMAD University has been ranked among the top 10 universities in Sub Saharan Africa by Times Higher Education in the latest 2024 THE Sub-Saharan Africa University Ranking.",
        list: [
            "1st in Somalia",
            "7th in Sub-Saharan Africa"
        ],
        logo: require('../assets/images/fablab.jpg')
    },
    {
        title: "Webometrics",
        description: "SIMAD University has been ranked among the top 10 universities in Sub Saharan Africa by Times Higher Education in the latest 2024 THE Sub-Saharan Africa University Ranking.",
        list: [
            "1st in Somalia",
            "7th in Sub-Saharan Africa"
        ],
        logo: require('../assets/images/fablab.jpg')
    },
    {
        title: "Times Higher Education Sub-Saharan Africa University Ranking",
        description: "SIMAD University has been ranked among the top 10 universities in Sub Saharan Africa by Times Higher Education in the latest 2024 THE Sub-Saharan Africa University Ranking.",
        list: [
            "1st in Somalia",
            "7th in Sub-Saharan Africa"
        ],
        logo: require('../assets/images/fablab.jpg')
    },
    {
        title: "Webometrics",
        description: "SIMAD University has been ranked among the top 10 universities in Sub Saharan Africa by Times Higher Education in the latest 2024 THE Sub-Saharan Africa University Ranking.",
        list: [
            "1st in Somalia",
            "7th in Sub-Saharan Africa"
        ],
        logo: require('../assets/images/fablab.jpg')
    },
    {
        title: "Times Higher Education Sub-Saharan Africa University Ranking",
        description: "SIMAD University has been ranked among the top 10 universities in Sub Saharan Africa by Times Higher Education in the latest 2024 THE Sub-Saharan Africa University Ranking.",
        list: [
            "1st in Somalia",
            "7th in Sub-Saharan Africa"
        ],
        logo: require('../assets/images/fablab.jpg')
    },
    {
        title: "Webometrics",
        description: "SIMAD University has been ranked among the top 10 universities in Sub Saharan Africa by Times Higher Education in the latest 2024 THE Sub-Saharan Africa University Ranking.",
        list: [
            "1st in Somalia",
            "7th in Sub-Saharan Africa"
        ],
        logo: require('../assets/images/fablab.jpg')
    }
];

const AccreditationCard = ({ title, subtitle, description, list, logo }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{title}</Text>

                    <Text style={styles.cardText}>{description}</Text>
                    {list && list.length > 0 && (
                        <View style={styles.list}>
                            {list.map((item, index) => (
                                <View key={index} style={styles.listItem}>
                                    <Text style={styles.bulletPoint}>•</Text>
                                    <Text style={styles.listItemText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
                <Image
                    source={logo}
                    style={styles.cardLogo}
                    onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}
                />
            </View>
        </View>
    );
};

export default function Accreditation() {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.pageTitle}>Accreditation, Ranking, and Memberships</Text>

                {data.map((item, index) => (
                    <AccreditationCard
                        key={index}
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.description}
                        list={item.list}
                        logo={item.logo}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const createStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        content: {
            padding: 20,
        },
        pageTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 20,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            borderWidth: 0.5,
            borderColor: colors.primary,
            marginBottom: 20,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        cardTitleContainer: {
            flex: 1,
            marginRight: 10,
        },
        cardTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 5,
        },
        cardLogo: {
            width: 100,
            height: 100,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: colors.primary,

        },
        cardText: {
            fontSize: 12,
            lineHeight: 20,
        },
        list: {
            marginTop: 5,
            marginLeft: 10,
        },
        listItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 5,
        },
        bulletPoint: {
            fontSize: 14,
            marginRight: 5,
            color: colors.primary,
        },
        listItemText: {
            flex: 1,
            fontSize: 14,
            lineHeight: 20,
        },
    });
};
