import { ScrollView, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/usetheme';

const data = {
    vision: "To become a leading center of academic and professional excellence and virtues.",
    mission: {
        text: "To provide high-quality education, research, and community services committed to excellence, integrity, and professionalism. The university produces competent scholars and leaders of high quality and moral uprightness.",
        points: [
            "Excellence (E)",
            "Integrity (I)",
            "and Professionalism (P)"
        ]
    },
    guidingPrinciples: {
        text: "The university strives to achieve the following strategic goals:",
        points: [
            "To provide the highest quality academic and professional programs at all levels.",
            "To develop and disseminate contemporary learning techniques and models in a supportive academic environment.",
            "To enhance the knowledge, skills, and attitudes of the learners, developing them into great scholars and effective leaders of tomorrow.",
            "To facilitate scholarly research and scientific studies in various areas that address national issues.",
            "To serve as a specialized center for training, research, and consultancy in Somalia."
        ]
    }
};

const SectionCard = ({ title, icon, contentText, listPoints }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{icon}</Text>
                </View>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.contentText}>{contentText}</Text>
                {listPoints && listPoints.length > 0 && (
                    <View style={styles.list}>
                        {listPoints.map((point, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>{point}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

export default function VisionPurpose() {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <SectionCard
                    title="Vision"
                    icon="🎯"
                    contentText={data.vision}
                />
                <SectionCard
                    title="Mission"
                    icon="🚀"
                    contentText={data.mission.text}
                    listPoints={data.mission.points}
                />
                <SectionCard
                    title="Guiding Principles"
                    icon="🧭"
                    contentText={data.guidingPrinciples.text}
                    listPoints={data.guidingPrinciples.points}
                />
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
        sectionContainer: {
            marginBottom: 20,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        iconContainer: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#C3E6CB',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        },
        icon: {
            fontSize: 18,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.secondary,
        },
        card: {
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 15,
            borderWidth: 1,
            borderColor: '#C3E6CB',
            borderLeftWidth: 5, // Adds the thicker left border
            borderLeftColor: '#C3E6CB', // Color of the left border
            marginBottom: 10,
            marginLeft: 20,
        },
        contentText: {
            fontSize: 14,
            lineHeight: 20,
        },
        list: {
            marginTop: 10,
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
