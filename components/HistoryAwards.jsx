import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';

const timelineData = [
    {
        years: '2022\n2023',
        events: [
            'Launched ICE Institute',
            'Ranked top 61-70th in THE Sub Saharan Africa University Ranking 2023',
            'Launched SIMAD iLab Executive Arena',
            'Joined the International Federation of Library Associations and Institutions (IFLA)'
        ]
    },
    {
        years: '2020\n2021',
        events: [
            'SIMAD Town Campus unveiled',
            'SIMAD Innovation Lab got established'
        ]
    },
    {
        years: '2018\n2019',
        events: [
            'Dr.Sumait Hospital officially Launched',
            'Student Loan program has been initiated'
        ]
    },
    {
        years: '2016\n2017',
        events: [
            'SIMAD joined Association of Arab Universities',
            'SIMAD established the Institute of Modern Languages (IML)'
        ]
    },
    {
        years: '2014\n2015',
        events: [
            'SIMAD joined Association of International Universities',
            'Dr. Dahir Hassan Arab became the Rector of SIMAD University',
            'SIMAD joined the Association of African Universities'
        ]
    },
    {
        years: '2012\n2013',
        events: [
            'SIMAD launched annual conferences on diverse disciplines',
            'SIMAD established the Center for Postgraduate Studies',
            'SIMAD established undergraduate faculties'
        ]
    },
    {
        years: '2010\n2011',
        events: [
            'SIMAD became a full-fledged University',
            'Abdirahman Mohamed Hussein Odowa became the first Rector of SIMAD University'
        ]
    },
    {
        years: '2012\n2013',
        events: [
            'SIMAD launched annual conferences on diverse disciplines',
            'SIMAD established the Center for Postgraduate Studies',
            'SIMAD established undergraduate faculties'
        ]
    },
    {
        years: '2010\n2011',
        events: [
            'SIMAD became a full-fledged University',
            'Abdirahman Mohamed Hussein Odowa became the first Rector of SIMAD University'
        ]
    },
    {
        years: '2012\n2013',
        events: [
            'SIMAD launched annual conferences on diverse disciplines',
            'SIMAD established the Center for Postgraduate Studies',
            'SIMAD established undergraduate faculties'
        ]
    },
    {
        years: '2010\n2011',
        events: [
            'SIMAD became a full-fledged University',
            'Abdirahman Mohamed Hussein Odowa became the first Rector of SIMAD University'
        ]
    },
    {
        years: '2012\n2013',
        events: [
            'SIMAD launched annual conferences on diverse disciplines',
            'SIMAD established the Center for Postgraduate Studies',
            'SIMAD established undergraduate faculties'
        ]
    },
    {
        years: '2010\n2011',
        events: [
            'SIMAD became a full-fledged University',
            'Abdirahman Mohamed Hussein Odowa became the first Rector of SIMAD University'
        ]
    },
    {
        years: '2012\n2013',
        events: [
            'SIMAD launched annual conferences on diverse disciplines',
            'SIMAD established the Center for Postgraduate Studies',
            'SIMAD established undergraduate faculties'
        ]
    },
    {
        years: '2010\n2011',
        events: [
            'SIMAD became a full-fledged University',
            'Abdirahman Mohamed Hussein Odowa became the first Rector of SIMAD University'
        ]
    },
    {
        years: '2012\n2013',
        events: [
            'SIMAD launched annual conferences on diverse disciplines',
            'SIMAD established the Center for Postgraduate Studies',
            'SIMAD established undergraduate faculties'
        ]
    },
    {
        years: '2010\n2011',
        events: [
            'SIMAD became a full-fledged University',
            'Abdirahman Mohamed Hussein Odowa became the first Rector of SIMAD University'
        ]
    },
    {
        years: '2008\n2009',
        events: [
            'SIMAD University started the publication of Somali Business Review'
        ]
    },
    {
        years: '2005\n2006',
        events: [
            'SIMAD University started offering postgraduate scholarships to school members'
        ]
    },
    {
        years: '1999',
        events: [
            'SIMAD was established as a higher education institute.',
            'Dr. Hassan Sheikh Mohamud was appointed as Dean',
            'SIMAD University started offering diplomas in IT, Business and Accounting'
        ]
    }
];

export default function HistoryAwards() {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <ScrollView style={styles.container}>
            {/* <Image
                source={require('../assets/images/fablab.jpg')}
                style={styles.headerImage}
            /> */
                <View style={styles.bannerContainer}>
                    <Image
                        source={require('../assets/images/fablab.jpg')} // Replace with your actual image path
                        style={styles.bannerImage}
                    />
                    <View style={styles.overlay} />

                    <Pressable style={styles.learnMoreButton}>
                        <Text style={styles.buttonText}>History & Awards</Text>
                    </Pressable>
                </View>}
            <View style={styles.content}>
                <Text style={styles.title}>SIMAD Timeline</Text>
                <View style={styles.timelineWrapper}>
                    {timelineData.map((item, index) => (
                        <View key={index} style={styles.timelineItem}>
                            <View style={styles.timelineLeft}>
                                <Text style={styles.yearText}>{item.years}</Text>
                            </View>
                            <View style={styles.timelineCenter}>
                                <View style={styles.dot}></View>
                                {index < timelineData.length - 1 && <View style={styles.line}></View>}
                            </View>
                            <View style={styles.timelineRight}>
                                <View style={styles.card}>
                                    {item.events.map((event, eventIndex) => (
                                        <React.Fragment key={eventIndex}>
                                            <View style={styles.eventItem}>
                                                <View style={styles.eventBullet}></View>
                                                <Text style={styles.eventText}>{event}</Text>
                                            </View>
                                            {eventIndex < item.events.length - 1 && (
                                                <View style={styles.separator} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
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
            transform: [{ translateX: -125 }],
            width: 250,
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



        // headerImage: {
        //     width: Dimensions.get('window').width,
        //     height: 200,
        //     resizeMode: 'cover',
        // },
        content: {
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.secondary,
            marginBottom: 20,
        },
        timelineWrapper: {
            paddingLeft: 50, // Space for the years column
        },
        timelineItem: {
            flexDirection: 'row',
            marginBottom: 20,
            position: 'relative',
        },
        timelineLeft: {
            position: 'absolute',
            left: -55, // Adjust this value to position the years to the left
            top: 0,
            width: 50,
            alignItems: 'center',
        },
        yearText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.secondary,
            textAlign: 'right',
        },
        timelineCenter: {
            alignItems: 'center',
            marginRight: 20,
        },
        dot: {
            width: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: colors.secondary,
            position: 'absolute',
            left: 0,
        },
        line: {
            width: 2,
            backgroundColor: colors.secondary,
            flex: 1,
            position: 'absolute',
            left: 6.5,

            top: 0,
            bottom: -20,
        },
        timelineRight: {
            flex: 1,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            borderWidth: 0.5,
            borderColor: colors.primary,
        },
        eventItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingBottom: 5,
        },
        separator: {
            height: 1,
            backgroundColor: colors.border,
            marginVertical: 3,
        },
        eventBullet: {
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: colors.secondary,
            marginRight: 10,
            marginTop: 7,
        },
        eventText: {
            flex: 1,
            fontSize: 13,
            lineHeight: 20,
        },
    });
};
