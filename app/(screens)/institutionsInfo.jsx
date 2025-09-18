import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import useInstitutionsStore from '../../store/institutionsStore';
const facultyData = [
    { id: '1', name: 'Dr. Abdishakur', title: 'Professor of Computer Science', image: require('../../assets/images/fablab.jpg') },
    { id: '2', name: 'Dr. Luqman', title: 'Professor of Business Administration', image: require('../../assets/images/fablab.jpg') },
    { id: '3', name: 'Dr. Zakki', title: 'Assistant Professor of Public Policy', image: require('../../assets/images/fablab.jpg') },
];

const FacultyCard = ({ item, styles }) => {
    return (
        <View style={styles.facultyCard}>
            <Image source={item.image} style={styles.facultyImage} />
            <Text style={styles.facultyName}>{item.name}</Text>
            <Text style={styles.facultyTitle}>{item.title}</Text>
            <Pressable>
                <Text style={styles.viewProfileText}>View Profile</Text>
            </Pressable>
        </View>
    );
};

const InstitutionsInfo = ({ route }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const { selectedInstitutionTitle } = useInstitutionsStore();

    // This is sample data, in a real app you would fetch this from an API
    const allInstitutionsData = {
        '1': {
            title: 'Center for Graduate Studies',
            description: 'Fostering advanced research, critical thinking, and a culture of scholarly excellence.',
            image: require('../../assets/images/fablab.jpg'), // Add image property
            sections: [
                {
                    icon: 'book-open-page-variant',
                    title: 'Pioneering the Future of Knowledge',
                    content: 'The Center for Graduate Studies is the academic home for master\'s and doctoral students. Our mission is to provide a rigorous and supportive environment that enables students to achieve their full research potential and prepare for a life of impact and leadership.'
                },
                {
                    icon: 'brain',
                    title: 'Vision & Mission',
                    content: 'To be the leading center of advanced learning and research in the region, fostering innovative solutions to complex challenges and contributing to global knowledge. Our mission is to provide rigorous academic programs and a supportive environment that enables students to achieve their full research potential.'
                },
                {
                    icon: 'flask-outline',
                    title: 'Key Programs & Research',
                    isList: true,
                    content: [
                        'Master of Business Administration (MBA)',
                        'Master of Computer Science (M.CS)',
                        'Doctoral Programs in Management and Development Studies',
                        'Research in Sustainable Development and Public Policy'
                    ]
                }
            ],
            faculty: facultyData
        },
        '2': {
            title: 'Center for Research & Development',
            description: 'Driving innovation through cutting-edge research.',
            image: require('../../assets/images/fablab.jpg'), // Add image property
            sections: [
                {
                    icon: 'book-open-page-variant',
                    title: 'About the Center',
                    content: 'This is the description for the Center for Research & Development.'
                },
                {
                    icon: 'brain',
                    title: 'Our Vision',
                    content: 'To be a leader in research and development.'
                }
            ],
            faculty: facultyData
        }
    };

    const details = allInstitutionsData[1] || { title: 'Not Found', description: 'No description available.', image: null, sections: [], faculty: [] };

    const renderSectionContent = (content, isList) => {
        if (isList) {
            return (
                <View style={styles.listContainer}>
                    {content.map((item, index) => (
                        <Text key={index} style={styles.listItem}>• {item}</Text>
                    ))}
                </View>
            );
        }
        return <Text style={styles.cardText}>{content}</Text>;
    };

    return (
        <View style={styles.container}>
            <Header
                title={selectedInstitutionTitle}
                showLeftIcon
                leftIconName="chevron-back"
                onLeftIconPress={() => router.back()}
            />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerBackground}>
                    {details.image && (
                        <Image source={details.image} style={styles.headerImage} resizeMode="cover" />
                    )}
                    <View style={styles.overlay}>
                        <Text style={styles.institutionTitle}>{details.title}</Text>
                        <Text style={styles.institutionDescription}>{details.description}</Text>
                    </View>
                </View>

                <View style={styles.mainContent}>
                    {details.sections.map((section, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <MaterialCommunityIcons name={section.icon} size={24} color={colors.primary} />
                                <Text style={styles.cardTitle}>{section.title}</Text>
                            </View>
                            {renderSectionContent(section.content, section.isList)}
                        </View>
                    ))}

                    {details.faculty.length > 0 && (
                        <View style={styles.featuredFacultyContainer}>
                            <Text style={styles.featuredFacultyHeader}>Featured Faculty</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.facultyScrollView}>
                                {details.faculty.map((faculty) => (
                                    <FacultyCard key={faculty.id} item={faculty} styles={styles} />
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default InstitutionsInfo;

const createStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        // The header is now inside the ScrollView
        headerBackground: {
            height: 250,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 20,
        },
        headerImage: {
            ...StyleSheet.absoluteFillObject,
            width: '100%',
            height: '100%',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingBottom: 20,
        },
        institutionTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.white,
            textAlign: 'center',
            marginBottom: 5,
        },
        institutionDescription: {
            fontSize: 16,
            color: colors.white,
            textAlign: 'center',
            lineHeight: 22,

        },
        // Remove paddingTop from ScrollView, as the header is now part of it
        scrollViewContent: {
            paddingBottom: 20,
        },
        mainContent: {
            // Remove the negative margin to prevent content from going behind the header
            // marginTop: 10,
            paddingHorizontal: 20,
            // paddingBottom: 20,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 5,
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        cardTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
            marginLeft: 10,
        },
        cardText: {
            fontSize: 14,
            lineHeight: 22,
            color: colors.text,
            textAlign: 'justify',
        },
        listContainer: {
            paddingLeft: 10,
        },
        listItem: {
            fontSize: 14,
            lineHeight: 24,
            color: colors.text,
        },
        featuredFacultyHeader: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 10,
        },
        facultyScrollView: {
            paddingRight: 15,
            paddingBottom: 15
        },
        facultyCard: {
            backgroundColor: colors.surface,
            borderRadius: 15,
            padding: 15,
            marginRight: 15,
            width: 150,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            paddingBottom: 15,
        },
        facultyImage: {
            width: 80,
            height: 80,
            borderRadius: 40,
            marginBottom: 10,
            backgroundColor: colors.lightGray,
        },
        facultyName: {
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.text,
            textAlign: 'center',
        },
        facultyTitle: {
            fontSize: 12,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 5,
        },
        viewProfileText: {
            fontSize: 12,
            color: colors.primary,
            textDecorationLine: 'underline',
        },
    });
};