import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';

const departmentDetails = {
    title: 'Computer Science Program',
    subtitle: 'Your journey into the future of technology starts here.',
    about: 'Our Bachelor of Computer Science program provides a strong foundation in the theoretical principles and practical application of computing. You will learn to think critically, solve complex problems, and innovate across various technological domains. The curriculum is designed to be rigorous, up-to-date, and globally competitive, preparing you for a successful career or further academic pursuits.',
    fees: {
        semester: '$1,200',
        duration: '4 Years',
    },
    curriculum: [
        {
            title: 'Programming Fundamentals',
            subtitle: 'Master core programming concepts and languages like Python, Java, and C++ to build a solid foundation.',
            icon: 'code-tags',
        },
        {
            title: 'Data & Algorithms',
            subtitle: 'Study data structures, algorithm design, and computational theory, which are essential for solving complex problems efficiently.',
            icon: 'database',
        },
        {
            title: 'Computer Systems & Architecture',
            subtitle: 'Understand the inner workings of computers, including operating systems, networking, and hardware principles.',
            icon: 'desktop-classic',
        },
    ],
    admissions: [
        'Completion of a recognized high school diploma or equivalent.',
        'Strong academic performance in mathematics and science-related subjects.',
        'Submission of a completed application form with all required documents.',
        "Successful completion of the university's entrance examination.",
        'A personal statement outlining your passion for technology and computer science.',
    ],
    careers: [
        {
            title: 'Software Engineer',
            subtitle: 'Design, develop, and maintain software applications and systems.',
            icon: 'monitor-edit',
        },
        {
            title: 'Data Scientist',
            subtitle: 'Analyze complex datasets to extract insights and drive data-driven decisions.',
            icon: 'chart-line',
        },
        {
            title: 'Cybersecurity Analyst',
            subtitle: 'Protect networks and systems from malicious cyberattacks and threats.',
            icon: 'shield-lock',
        },
        {
            title: 'Cloud Engineer',
            subtitle: 'Design and manage cloud infrastructure on platforms like AWS, Azure, and Google Cloud.',
            icon: 'cloud',
        },
    ],
};

const SectionHeader = ({ iconName, iconColor, title, subtitle }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconContainer, { backgroundColor: iconColor + '15' }]}>
                <MaterialCommunityIcons name={iconName} size={28} color={iconColor} />
            </View>
            <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
            </View>
        </View>
    );
};

const CurriculumCard = ({ iconName, title, subtitle }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);

    return (
        <View style={styles.curriculumCard}>
            <MaterialCommunityIcons name={iconName} size={24} color={colors.textSecondary} />
            <View style={styles.curriculumTextContainer}>
                <Text style={styles.curriculumTitle}>{title}</Text>
                <Text style={styles.curriculumSubtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

const DepartmentDetails = () => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header
                title="CS Program"
                showLeftIcon
                leftIconName="chevron-back"
                onLeftIconPress={() => navigation.goBack()}
            />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <LinearGradient
                    colors={[colors.primary, colors.secondary]}
                    style={styles.departmentHeader}
                >
                    <Text style={styles.departmentTitle}>{departmentDetails.title}</Text>
                    <Text style={styles.departmentSubtitle}>{departmentDetails.subtitle}</Text>
                </LinearGradient>


                <View style={styles.cardSection}>
                    <SectionHeader
                        iconName="book-open-variant"
                        iconColor={colors.primary}
                        title="About the Program"
                    />
                    <Text style={styles.aboutText}>{departmentDetails.about}</Text>
                    {/* New container for fee and duration */}
                    <View style={styles.feeInfoContainer}>
                        <View style={styles.feeInfoCard}>
                            <MaterialCommunityIcons name="currency-usd" size={24} color={colors.text} />
                            <Text style={styles.feeTitle}>Semester Fee</Text>
                            <Text style={styles.feeValue}>{departmentDetails.fees.semester}</Text>
                        </View>
                        <View style={styles.feeInfoCard}>
                            <MaterialCommunityIcons name="clock-outline" size={24} color={colors.text} />
                            <Text style={styles.feeTitle}>Duration</Text>
                            <Text style={styles.feeValue}>{departmentDetails.fees.duration}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardSection}>
                    <SectionHeader
                        iconName="format-list-checks"
                        iconColor={colors.primary}
                        title="Curriculum Highlights"
                        subtitle="The program is structured to provide a comprehensive and hands-on learning experience. Key areas of study include:"
                    />
                    {departmentDetails.curriculum.map((item, index) => (
                        <CurriculumCard
                            key={index}
                            iconName={item.icon}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
                    ))}
                </View>

                <View style={styles.cardSection}>
                    <SectionHeader
                        iconName="clipboard-list-outline"
                        iconColor={colors.secondary}
                        title="Admission Requirements"
                        subtitle="To be considered for admission, applicants must meet the following criteria:"
                    />
                    <View style={styles.requirementsList}>
                        {departmentDetails.admissions.map((item, index) => (
                            <View key={index} style={styles.requirementItem}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.requirementText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.cardSection}>
                    <SectionHeader
                        iconName="briefcase-outline"
                        iconColor={colors.tertiary}
                        title="Career Paths"
                    />
                    <Text style={styles.careerIntroText}>A Computer Science degree opens up a vast number of high-demand career opportunities across a wide range of industries. Graduates are prepared for roles such as:</Text>
                    {departmentDetails.careers.map((item, index) => (
                        <CurriculumCard
                            key={index}
                            iconName={item.icon}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
                    ))}
                </View>

                <LinearGradient colors={[colors.secondary, colors.primary]} style={[styles.ctaCard, { backgroundColor: colors.primary }]}>
                    <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
                    <Text style={styles.ctaSubtitle}>Join our community of innovators and start building your future today.</Text>
                    <Pressable style={({ pressed }) => [styles.applyButton, { opacity: pressed ? 0.8 : 1 }]}>
                        <Text style={styles.applyButtonText}>Apply Now</Text>
                    </Pressable>
                </LinearGradient>

            </ScrollView>
        </View>
    );
};

const createStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        customHeader: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
        },
        scrollViewContent: {
            paddingBottom: 20,
        },
        departmentHeader: {
            backgroundColor: colors.primary,
            padding: 20,
            marginBottom: 20,
        },
        departmentTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 5,
        },
        departmentSubtitle: {
            fontSize: 16,
            color: '#fff',
        },
        cardSection: {
            backgroundColor: colors.surface,
            marginHorizontal: 15,
            borderRadius: 15,
            padding: 15,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        sectionIconContainer: {
            padding: 10,
            borderRadius: 12,
            marginRight: 10,
        },
        sectionTextContainer: {
            flex: 1,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
        },
        sectionSubtitle: {
            fontSize: 13,
            color: colors.textMuted,
            marginTop: 2,
        },
        aboutText: {
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 22,
            marginBottom: 15,
        },
        feeInfoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: colors.bg,
            borderRadius: 10,
        },
        feeInfoCard: {
            alignItems: 'center',
            flex: 1,
            padding: 10,
        },
        feeTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.text,
            marginTop: 5,
        },
        feeValue: {
            fontSize: 14,
            color: colors.textSecondary,
            marginTop: 2,
        },
        curriculumCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bg,
            borderRadius: 10,
            padding: 15,
            marginBottom: 10,
        },
        curriculumTextContainer: {
            marginLeft: 15,
            flex: 1,
        },
        curriculumTitle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: colors.text,
        },
        curriculumSubtitle: {
            fontSize: 13,
            color: colors.textMuted,
            marginTop: 2,
        },
        requirementsList: {
            paddingLeft: 10,
        },
        requirementItem: {
            flexDirection: 'row',
            marginBottom: 8,
        },
        bullet: {
            fontSize: 18,
            marginRight: 10,
            color: colors.textSecondary,
            lineHeight: 22,
        },
        requirementText: {
            fontSize: 14,
            color: colors.textSecondary,
            flex: 1,
            lineHeight: 22,
        },
        careerIntroText: {
            fontSize: 14,
            color: colors.textSecondary,
            lineHeight: 22,
            marginBottom: 15,
        },
        ctaCard: {
            marginHorizontal: 15,
            borderRadius: 15,
            padding: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
        },
        ctaTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: colors.white,
            textAlign: 'center',
            marginBottom: 5,
        },
        ctaSubtitle: {
            fontSize: 14,
            color: colors.white,
            textAlign: 'center',
            marginBottom: 20,
        },
        applyButton: {
            backgroundColor: colors.white,
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 30,
        },
        applyButtonText: {
            color: colors.primary,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });
};

export default DepartmentDetails;

