import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';


// Data for the repeatable card sections
const cardData = [
    {
        title: 'A Legacy of Excellence and Opportunity',
        description: 'Founded in 1999, SIMAD University has been a symbol of knowledge and wisdom for over two decades. With a diverse range of academic programs and a team of 500+ experienced lecturers, ',
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5
    },
    {
        title: 'A Legacy of Excellence and Opportunity',
        description: 'Founded in 1999, SIMAD University has been a symbol of knowledge and wisdom for over two decades. With a diverse range of academic programs and a team of 500+ experienced lecturers, ',
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5
    },
    {
        title: 'A Legacy of Excellence and Opportunity',
        description: 'Founded in 1999, SIMAD University has been a symbol of knowledge and wisdom for over two decades. With a diverse range of academic programs and a team of 500+ experienced lecturers, ',
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5
    },
    {
        title: 'A Legacy of Excellence and Opportunity',
        description: 'Founded in 1999, SIMAD University has been a symbol of knowledge and wisdom for over two decades. With a diverse range of academic programs and a team of 500+ experienced lecturers, ',
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5
    },
    {
        title: 'A Legacy of Excellence and Opportunity',
        description: 'Founded in 1999, SIMAD University has been a symbol of knowledge and wisdom for over two decades. With a diverse range of academic programs and a team of 500+ experienced lecturers, ',
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5
    },
    {
        title: 'A Legacy of Excellence and Opportunity',
        description: 'Founded in 1999, SIMAD University has been a symbol of knowledge and wisdom for over two decades. With a diverse range of academic programs and a team of 500+ experienced lecturers, ',
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5
    },
    {
        title: 'A Legacy of Excellence and Opportunity',
        description: 'Founded in 1999, SIMAD University has been a symbol of knowledge and wisdom for over two decades. With a diverse range of academic programs and a team of 500+ experienced lecturers, ',
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5
    },
];

const LearnAboutSIMAD = () => {
    const { colors } = useTheme();
    const styles = createStyle(colors);


    return (


        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Top Banner Section */}
            <View style={styles.bannerContainer}>
                <Image
                    source={require('../assets/images/fablab.jpg')} // Replace with your actual image path
                    style={styles.bannerImage}
                />
                <View style={styles.overlay} />

                <Pressable style={styles.learnMoreButton}>
                    <Text style={styles.buttonText}>Learn About SIMAD UNIVERSITY in 5 min</Text>
                </Pressable>
            </View>

            {/* "Why Simad ?" Section */}
            <View style={styles.whySimadContainer}>
                <Text style={styles.whySimadTitle}>Why Simad ?</Text>
            </View>

            {/* Dynamic Card Sections */}
            {cardData.map((card, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardDescription}>
                        {card.description}
                        <Text style={styles.seeMore}>See More...</Text>
                    </Text>
                    <Image source={card.image} style={styles.cardImage} />
                </View>
            ))}
        </ScrollView>

    );
};

const createStyle = (colors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1, // Keep flex: 1 on the container to fill the screen space
            backgroundColor: colors.bg,
        },
        contentContainer: {
            // paddingVertical: 20, // Move padding here to apply to content
        },
        bannerContainer: {
            height: 200,
            position: 'relative',
        },
        bannerImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        topBar: {
            position: 'absolute',
            top: 50,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            alignItems: 'center',
        },

        learnMoreButton: {
            position: 'absolute',
            bottom: 5,
            left: '50%',
            transform: [{ translateX: -160 }],
            width: 320,
            height: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: colors.white,
            fontSize: 16,
            fontWeight: '500',
        },
        whySimadContainer: {
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 0,
        },
        whySimadTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.secondary,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 8,
            marginHorizontal: 15,
            marginVertical: 10,
            padding: 15,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        },
        cardTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.shadow,
            marginBottom: 5,
        },
        cardDescription: {
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
            marginBottom: 10,
        },
        seeMore: {
            color: colors.secondary, // A standard blue for links
            fontWeight: 'bold',
        },
        cardImage: {
            width: '100%',
            height: 200, // Adjust height as needed
            borderRadius: 8,
            resizeMode: 'cover',
        },
    });
    return styles;

}
export default LearnAboutSIMAD;