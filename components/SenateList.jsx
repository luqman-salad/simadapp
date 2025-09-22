import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';

// Data for the repeatable card sections
// Data for the senate members
const senateData = [
    {
        name: 'Dr. Abdikarim Mohaidin Ahmed',
        title: 'The Rector',
        barColor: '#ffc107', // Green
        image: require('../assets/images/dr_abdikarim.png'), // Placeholder image 5

    },
    {
        name: 'Mr. Yusuf Moallim Ahmed',
        title: 'Senior Advisor of the Rector',
        barColor: '#28a745', // Gold/Yellow
        image: require('../assets/images/mr_yusuf.png'), // Placeholder image 5

    },
    {
        name: 'Dr. Mohamud Mohamed Alasow',
        title: 'Deputy Rector for Student Affairs',
        barColor: '#28a745', // Green
        image: require('../assets/images/dr_alasow.png'), // Placeholder image 5

    },
    {
        name: 'Dr. Ahmed Hassan Mohamud',
        title: 'Deputy Rector for Admin and Finance',
        barColor: '#28a745', // Green
        image: require('../assets/images/dr_ahmed_hassan.png'), // Placeholder image 5

    },
    {
        name: 'Abdullahi Ahmed Abdirahman',
        title: 'Deputy Rector for institutional development',
        barColor: '#28a745', // Green
        image: require('../assets/images/abdullahi_yarre.png'), // Placeholder image 5

    },
];

const SenateList = () => {
    const { colors } = useTheme();
    const styles = createStyle(colors);


    return (
        <View style={styles.container}>
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
            borderRadius: 4,
            padding: 8,
            marginVertical: 8,
            shadowColor: colors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        },
        colorBar: {
            width: 8,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
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
            width: 70, 
            height: 70,
            borderRadius: 5,
            overflow: 'hidden',
            marginLeft: 10,
            justifyContent: 'center', 
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: colors.border
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