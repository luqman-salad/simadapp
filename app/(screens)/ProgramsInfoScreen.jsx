import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import { getProgramInfoById } from '../../apis/academicProgramsApi';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalLoading } from '../../hooks/useGlobalLoading';

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
            <MaterialCommunityIcons name={iconName} size={24} color={colors.text} />
            <View style={styles.curriculumTextContainer}>
                <Text style={styles.curriculumTitle}>{title}</Text>
                <Text style={styles.curriculumSubtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

const DepartmentDetails = ({ componentKey = "program-details", refreshTrigger = 0 }) => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const navigation = useNavigation();
    const { programId } = useLocalSearchParams();
    
    const [programData, setProgramData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Connect to global loading state
    useGlobalLoading(componentKey, loading);

    // Map FontAwesome icons to MaterialCommunityIcons
    const getMaterialIconName = (faIcon) => {
        const iconMap = {
            'fa-info-circle': 'information-outline',
            'fa-book': 'book-open-variant',
            'fa-university': 'school-outline',
            'fa-briefcase': 'briefcase-outline',
            'fa-clock': 'clock-outline',
            'fa-dollar-sign': 'currency-usd',
            'fa-code': 'code-tags',
            'fa-project-diagram': 'chart-tree',
            'fa-laptop-code': 'monitor-edit',
            'fa-robot': 'robot-outline'
        };
        return iconMap[faIcon] || 'information-outline';
    };

    useEffect(() => {
        if (programId) {
            fetchProgramData();
        } else {
            setError('No program ID provided');
            setLoading(false);
        }
    }, [programId, refreshTrigger]);

    const fetchProgramData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getProgramInfoById(programId);
            
            if (response.success && response.data?.program) {
                setProgramData(response.data.program);
            } else {
                throw new Error('Program data not found');
            }
        } catch (err) {
            console.error('Error fetching program data:', err);
            setError(err.message || 'Failed to load program details');
        } finally {
            setLoading(false);
        }
    };

    // Remove individual loading display - global overlay handles it
    if (error) {
        return (
            <View style={styles.container}>
                <Header
                    title="Program Details"
                    showLeftIcon
                    leftIconName="chevron-back"
                    onLeftIconPress={() => navigation.goBack()}
                />
                <View style={styles.centerContainer}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={64} color={colors.danger} />
                    <Text style={[styles.errorText, { color: colors.danger }]}>
                        Unable to Load Program
                    </Text>
                    <Text style={[styles.errorDetail, { color: colors.textSecondary }]}>
                        {error}
                    </Text>
                    <Pressable style={styles.retryButton} onPress={fetchProgramData}>
                        <Text style={[styles.retryText, { color: colors.primary }]}>
                            Tap to retry
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    if (!programData && !loading) {
        return (
            <View style={styles.container}>
                <Header
                    title="Program Details"
                    showLeftIcon
                    leftIconName="chevron-back"
                    onLeftIconPress={() => navigation.goBack()}
                />
                <View style={styles.centerContainer}>
                    <MaterialCommunityIcons name="school-outline" size={64} color={colors.textSecondary} />
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                        Program Not Found
                    </Text>
                    <Text style={[styles.emptyDetail, { color: colors.textSecondary }]}>
                        The program you're looking for is not available.
                    </Text>
                    <Pressable style={styles.retryButton} onPress={() => navigation.goBack()}>
                        <Text style={[styles.retryText, { color: colors.primary }]}>
                            Go Back
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                title={programData?.title || "Program Details"}
                showLeftIcon
                leftIconName="chevron-back"
                onLeftIconPress={() => navigation.goBack()}
            />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Safe LinearGradient with fallback */}
                {colors.primary && colors.secondary ? (
                    <LinearGradient
                        colors={[colors.primary, colors.secondary]}
                        style={styles.departmentHeader}
                    >
                        <Text style={styles.departmentTitle}>{programData?.title}</Text>
                        <Text style={styles.departmentSubtitle}>{programData?.subtitle}</Text>
                    </LinearGradient>
                ) : (
                    <View style={[styles.departmentHeader, { backgroundColor: colors.primary || '#0066cc' }]}>
                        <Text style={styles.departmentTitle}>{programData?.title}</Text>
                        <Text style={styles.departmentSubtitle}>{programData?.subtitle}</Text>
                    </View>
                )}

                {/* About Section */}
                {programData?.about && (
                    <View style={styles.cardSection}>
                        <SectionHeader
                            iconName="book-open-variant"
                            iconColor={colors.primary}
                            title={programData.about.title || "About the Program"}
                        />
                        <Text style={styles.aboutText}>{programData.about.subtitle}</Text>
                        {/* Fee and Duration Container */}
                        {programData.fees && (
                            <View style={styles.feeInfoContainer}>
                                <View style={styles.feeInfoCard}>
                                    <MaterialCommunityIcons name="currency-usd" size={24} color={colors.text} />
                                    <Text style={styles.feeTitle}>Semester Fee</Text>
                                    <Text style={styles.feeValue}>{programData.fees.semester}</Text>
                                </View>
                                <View style={styles.feeInfoCard}>
                                    <MaterialCommunityIcons name="clock-outline" size={24} color={colors.text} />
                                    <Text style={styles.feeTitle}>Duration</Text>
                                    <Text style={styles.feeValue}>{programData.fees.duration}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                )}

                {/* Curriculum Section */}
                {programData?.curriculum && programData.curriculum.list && (
                    <View style={styles.cardSection}>
                        <SectionHeader
                            iconName="format-list-checks"
                            iconColor={colors.primary}
                            title={programData.curriculum.title || "Curriculum Highlights"}
                            subtitle={programData.curriculum.subtitle}
                        />
                        {programData.curriculum.list.map((item, index) => (
                            <CurriculumCard
                                key={index}
                                iconName={getMaterialIconName(item.icon)}
                                title={item.title}
                                subtitle={item.subtitle}
                            />
                        ))}
                    </View>
                )}

                {/* Admissions Section */}
                {programData?.admissions && (
                    <View style={styles.cardSection}>
                        <SectionHeader
                            iconName="clipboard-list-outline"
                            iconColor={colors.primary}
                            title={programData.admissions.title || "Admission Requirements"}
                            subtitle={programData.admissions.subtitle}
                        />
                        <View style={styles.requirementsList}>
                            {programData.admissions.list?.map((item, index) => (
                                <View key={index} style={styles.requirementItem}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.requirementText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Careers Section */}
                {programData?.careers && programData.careers.list && (
                    <View style={styles.cardSection}>
                        <SectionHeader
                            iconName="briefcase-outline"
                            iconColor={colors.primary}
                            title={programData.careers.title || "Career Paths"}
                        />
                        <Text style={styles.careerIntroText}>{programData.careers.subtitle}</Text>
                        {programData.careers.list.map((item, index) => (
                            <CurriculumCard
                                key={index}
                                iconName={getMaterialIconName(item.icon)}
                                title={item.title}
                                subtitle={item.subtitle}
                            />
                        ))}
                    </View>
                )}

                {/* CTA Section with safe LinearGradient */}
                {colors.primary && colors.secondary ? (
                    <LinearGradient 
                        colors={[colors.secondary, colors.primary]} 
                        style={styles.ctaCard}
                    >
                        <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
                        <Text style={styles.ctaSubtitle}>Join our community of innovators and start building your future today.</Text>
                        <Pressable style={({ pressed }) => [styles.applyButton, { opacity: pressed ? 0.8 : 1 }]}>
                            <Text style={styles.applyButtonText}>Apply Now</Text>
                        </Pressable>
                    </LinearGradient>
                ) : (
                    <View style={[styles.ctaCard, { backgroundColor: colors.primary || '#0066cc' }]}>
                        <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
                        <Text style={styles.ctaSubtitle}>Join our community of innovators and start building your future today.</Text>
                        <Pressable style={({ pressed }) => [styles.applyButton, { opacity: pressed ? 0.8 : 1 }]}>
                            <Text style={styles.applyButtonText}>Apply Now</Text>
                        </Pressable>
                    </View>
                )}
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
        centerContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        scrollViewContent: {
            paddingBottom: 20,
        },
        departmentHeader: {
            paddingVertical: 20,
            paddingHorizontal: 10,
            margin: 18,
            marginBottom: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        departmentTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.white,
            marginBottom: 5,
        },
        departmentSubtitle: {
            fontSize: 16,
            color: colors.white,
            textAlign: "center"
        },
        cardSection: {
            backgroundColor: colors.surface,
            marginHorizontal: 15,
            borderRadius: 15,
            padding: 15,
            marginBottom: 20,
            backgroundColor: colors.surface, 
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
            color: colors.text,
            marginTop: 2,
        },
        aboutText: {
            fontSize: 14,
            color: colors.text,
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
            color: colors.text,
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
            color: colors.text,
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
            color: colors.text,
            lineHeight: 22,
        },
        requirementText: {
            fontSize: 14,
            color: colors.text,
            flex: 1,
            lineHeight: 22,
        },
        careerIntroText: {
            fontSize: 14,
            color: colors.text,
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
        // Error States
        errorText: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
            marginTop: 10,
        },
        errorDetail: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 20,
        },
        emptyText: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
            marginTop: 10,
        },
        emptyDetail: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 20,
        },
        retryButton: {
            marginTop: 10,
        },
        retryText: {
            fontSize: 16,
            fontWeight: '600',
        },
    });
};

export default DepartmentDetails;