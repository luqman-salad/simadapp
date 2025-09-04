import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';

// Data for the repeatable card sections
// Data for the senate members
const senateData = [
    {
        name: 'Dr. Abdikarim Mohaidin Ahmed',
        title: 'The Rector',
        barColor: '#28a745', // Green
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5

    },
    {
        name: 'Mr. Yusuf Moallim Ahmed',
        title: 'Senior Advisor of the Rector',
        barColor: '#ffc107', // Gold/Yellow
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5

    },
    {
        name: 'Dr. Mohamud Mohamed Alasow',
        title: 'Deputy Rector for Student Affairs',
        barColor: '#28a745', // Green
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5

    },
    {
        name: 'Dr. Mohamed Mohamud Mohamed',
        title: 'Deputy Rector of Academics',
        barColor: '#ffc107', // Gold/Yellow
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5

    },
    {
        name: 'Dr. Ahmed Hassan Mohamud',
        title: 'Deputy Rector for Admin and Finance',
        barColor: '#28a745', // Green
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5

    },
    {
        name: 'Dr. Mohamed Mohamud Mohamed',
        title: 'Deputy Rector of Academics',
        barColor: '#ffc107', // Gold/Yellow
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5

    },
    {
        name: 'Dr. Ahmed Hassan Mohamud',
        title: 'Deputy Rector for Admin and Finance',
        barColor: '#28a745', // Green
        image: require('../assets/images/fablab.jpg'), // Placeholder image 5

    },
];

const SenateList = () => {
    const { colors } = useTheme();
    const styles = createStyle(colors);


    return (
        <View style={styles.container}>
            {/* Header Section */}
            {/* <View style={styles.header}>
                <Text style={styles.backArrow}>←</Text>
                <Text style={styles.headerTitle}>The Senate</Text>
            </View> */}
            <Text style={styles.listTitle}>The Senate List Profiles</Text>

            {/* Profile List */}
            <ScrollView style={styles.senateContainer}>
                {senateData.map((member, index) => (
                    <View key={index} style={styles.card}>
                        {/* Colored vertical bar */}
                        <View style={[styles.colorBar, { backgroundColor: member.barColor }]} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{member.name}</Text>
                            <Text style={styles.title}>{member.title}</Text>
                        </View>
                        {/* Modified Pressable to display image */}
                        <Pressable style={styles.profileImageContainer}>
                            <Image source={member.image} style={styles.profileImage} />
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const createStyle = (colors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg, // Light grey background
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: colors.white,
        },
        backArrow: {
            fontSize: 24,
            fontWeight: 'bold',
            marginRight: 15,
        },
        headerTitle: {
            fontSize: 22,
            fontWeight: 'bold',
        },
        listTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.secondary,
            paddingHorizontal: 15,
            paddingVertical: 10,
        },
        senateContainer: {
            paddingHorizontal: 15,
        },
        card: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            marginVertical: 8,
            shadowColor: colors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        },
        colorBar: {
            width: 8,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
        },
        textContainer: {
            flex: 1,
            marginLeft: 15,
        },
        name: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.shadow,
        },
        title: {
            fontSize: 14,
            color: '#666',
            marginTop: 2,
        },

        profileImageContainer: {
            width: 50, // Set desired width for the image container
            height: 50, // Set desired height for the image container
            borderRadius: 25, // Half of width/height to make it a circle
            overflow: 'hidden', // Clip the image to the border radius
            marginLeft: 10, // Add some space from the text
            justifyContent: 'center', // Center image vertically
            alignItems: 'center', // Center image horizontally
        },
        profileImage: {
            width: '100%', // Image takes full width of its container
            height: '100%', // Image takes full height of its container
            resizeMode: 'cover', // Cover the container, cropping if necessary
        },

    });
    return styles;

}
export default SenateList;