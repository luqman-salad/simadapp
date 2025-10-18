import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import { getSchoolInfoById } from '../../apis/academicProgramsApi';
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
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const InfoCard = ({ iconName, title, value }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  return (
    <View style={styles.infoCard}>
      <MaterialCommunityIcons name={iconName} size={22} color={colors.text} />
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

const ProgramCard = ({ title, iconName, programId }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigation = useNavigation();
  const router = useRouter();

  const handleProgramPress = () => {
        // Pass the program ID to the ProgramsInfoScreen
        router.push({
            pathname: '/(screens)/ProgramsInfoScreen',
            params: { programId: programId }
        });
    };

  return (
    <Pressable style={styles.programCard}
      onPress={handleProgramPress}
    >
      <MaterialCommunityIcons name={iconName} size={28} color={colors.text} />
      <Text style={styles.programText}>{title}</Text>
      <Ionicons name="link-outline" size={24} color={colors.text} style={{ marginLeft: 'auto' }} />
    </Pressable>
  );
};

const SchoolInfoScreen = ({ componentKey = "school-info", refreshTrigger = 0 }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigation = useNavigation();
  
  // Use useLocalSearchParams to get the parameters from the URL
  const params = useLocalSearchParams();
  const schoolId = params.schoolId;
  const schoolName = params.schoolName;

  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  

  const fetchSchoolData = async () => {
    if (!schoolId) {
      setError('No school ID provided');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching school data for ID:', schoolId);
      const result = await getSchoolInfoById(schoolId);
      
      console.log('API Response:', result);
      
      if (result?.success && result.data?.school) {
        setSchoolData(result.data.school);
      } else {
        throw new Error(result?.message || 'No school data received');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching school data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (schoolId) {
      fetchSchoolData();
    } else {
      setError('No school ID provided');
      setLoading(false);
    }
  }, [schoolId, refreshTrigger]);

  // Remove individual loading display - global overlay handles it
  if (error) {
    return (
      <View style={styles.container}>
        <Header
          title={schoolName || "Error"}
          showLeftIcon
          leftIconName="chevron-back"
          onLeftIconPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.danger }]}>
            Failed to load school details
          </Text>
          <Text style={[styles.errorDetail, { color: colors.textSecondary }]}>
            {error}
          </Text>
          <Pressable style={styles.retryButton} onPress={fetchSchoolData}>
            <Text style={[styles.retryText, { color: colors.primary }]}>
              Tap to retry
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!schoolData && !loading) {
    return (
      <View style={styles.container}>
        <Header
          title={schoolName || "Not Found"}
          showLeftIcon
          leftIconName="chevron-back"
          onLeftIconPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
            School information not available
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={schoolData?.name || schoolName || "School Info"}
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.headerBackground}>
          {schoolData?.coverImage ? (
            <Image 
              source={{ uri: schoolData.coverImage }} 
              style={styles.headerImage} 
              resizeMode="cover" 
              onError={() => console.log('Failed to load cover image')}
            />
          ) : (
            <Image 
              source={require('../../assets/images/computerlabs.jpeg')} 
              style={styles.headerImage} 
              resizeMode="cover" 
            />
          )}
          <View style={styles.overlay}>
            <Text style={styles.schoolTitle}>{schoolData?.name}</Text>
            <Text style={styles.schoolDescription}>{schoolData?.tagline || schoolData?.shortDescription}</Text>
          </View>
        </View>

        {/* Programs Section */}
        {schoolData?.programs && schoolData.programs.length > 0 && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.programsSection?.icon)}
              iconColor={colors.text}
              title={schoolData.programsSection?.title || "Programs of the Faculty"}
              subtitle={schoolData.programsSection?.subtitle || "Explore undergraduate and graduate programs"}
            />
            <View style={styles.programList}>
              {schoolData.programs.map((program, index) => (
                <ProgramCard 
                  key={program._id} 
                  title={program.name} 
                  iconName={getIconName(program.icon)}
                  programId={program._id}
                />
              ))}
            </View>
          </View>
        )}

        {/* Vision & Mission Section */}
        {(schoolData?.vision || schoolData?.mission) && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.visionAndMissionSection?.icon)}
              iconColor={colors.text}
              title={schoolData.visionAndMissionSection?.title || "Vision & Mission"}
              subtitle={schoolData.visionAndMissionSection?.subtitle || "Our Commitment to Excellence"}
            />
            {schoolData.vision && (
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>Vision</Text>
                <Text style={styles.infoBoxText}>{schoolData.vision}</Text>
              </View>
            )}
            {schoolData.mission && (
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>Mission</Text>
                <Text style={styles.infoBoxText}>{schoolData.mission}</Text>
              </View>
            )}
          </View>
        )}

        {/* Dean's Message Section */}
        {schoolData?.dean && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.dean.section?.icon)}
              iconColor={colors.text}
              title={schoolData.dean.section?.title || "Dean's Message"}
              subtitle={schoolData.dean.section?.subtitle || "Leadership & Vision"}
            />
            <View style={styles.deanContainer}>
              <View style={styles.deanImagePlaceholder}>
                <MaterialCommunityIcons name="account-tie" size={40} color={colors.white} />
              </View>
              <Text style={styles.deanName}>{schoolData.dean.name}</Text>
              <Text style={styles.deanTitle}>{schoolData.dean.title}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>{schoolData.dean.message}</Text>
            </View>
          </View>
        )}

        {/* Facts & Figures Section */}
        {schoolData?.facts && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.factsSection?.icon)}
              iconColor={colors.text}
              title={schoolData.factsSection?.title || "Facts & Figures"}
              subtitle={schoolData.factsSection?.subtitle || "Our distinctive features"}
            />
            <View style={styles.factGrid}>
              {schoolData.facts.academic_programs && (
                <View style={styles.factCard}>
                  <Text style={styles.factValue}>{schoolData.facts.academic_programs}</Text>
                  <Text style={styles.factLabel}>Academic Programs</Text>
                </View>
              )}
              {schoolData.facts.academic_staff && (
                <View style={styles.factCard}>
                  <Text style={styles.factValue}>{schoolData.facts.academic_staff}</Text>
                  <Text style={styles.factLabel}>Academic Staff</Text>
                </View>
              )}
              {schoolData.facts.student_population && (
                <View style={styles.factCard}>
                  <Text style={styles.factValue}>{schoolData.facts.student_population}</Text>
                  <Text style={styles.factLabel}>Students</Text>
                </View>
              )}
              {schoolData.facts.founded_year && (
                <View style={styles.factCard}>
                  <Text style={styles.factValue}>{schoolData.facts.founded_year}</Text>
                  <Text style={styles.factLabel}>Founded</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Student Testimonials Section */}
        {schoolData?.testimonials && schoolData.testimonials.length > 0 && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.testimonialsSection?.icon)}
              iconColor={colors.text}
              title={schoolData.testimonialsSection?.title || "Student Testimonials"}
              subtitle={schoolData.testimonialsSection?.subtitle || "Hear from our students"}
            />
            {schoolData.testimonials.map((testimonial, index) => (
              <View key={index} style={styles.testimonialCard}>
                <Text style={styles.testimonialText}>"{testimonial.message}"</Text>
                <Text style={styles.testimonialAuthor}>- {testimonial.student_name}, {testimonial.program}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Contact Info Section */}
        {schoolData?.contact && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.contactSection?.icon)}
              iconColor={colors.text}
              title={schoolData.contactSection?.title || "Contact Info"}
              subtitle={schoolData.contactSection?.subtitle || "Get in touch with us"}
            />
            {schoolData.contact.phone && (
              <InfoCard iconName="phone-outline" value={schoolData.contact.phone} />
            )}
            {schoolData.contact.email && (
              <InfoCard iconName="email-outline" value={schoolData.contact.email} />
            )}
            {schoolData.contact.location && (
              <InfoCard iconName="map-marker-outline" value={schoolData.contact.location} />
            )}
            {schoolData.contact.website && (
              <InfoCard iconName="web" value={schoolData.contact.website} />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Helper function to map API icon names to MaterialCommunityIcons
const getIconName = (apiIconName) => {
  const iconMap = {
    'fa-laptop-code': 'laptop',
    'fa-network-wired': 'lan',
    'fa-photo-video': 'image',
    'fa-user-tie': 'account-tie',
    'fa-lightbulb': 'lightbulb-outline',
    'fa-chart-bar': 'chart-bar',
    'fa-comments': 'comment-multiple-outline',
    'fa-book': 'book-open-variant',
    'fa-envelope': 'email-outline',
    'ri-computer-line': 'laptop',
    'ri-video-line': 'video'
  };
  return iconMap[apiIconName] || 'help-circle-outline';
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
    errorText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    errorDetail: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
    },
    noDataText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    retryButton: {
      marginTop: 10,
    },
    retryText: {
      fontSize: 16,
      fontWeight: '600',
    },
    headerBackground: {
      height: 220,
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
    schoolTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 5,
    },
    schoolDescription: {
      fontSize: 16,
      color: colors.white,
      textAlign: 'center',
      lineHeight: 22,
    },
    scrollViewContent: {
      paddingBottom: 20,
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
    programCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.bg,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    programText: {
      marginLeft: 15,
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    infoBox: {
      backgroundColor: colors.bg,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
    },
    infoBoxTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.textMuted,
      marginBottom: 5,
    },
    infoBoxText: {
      fontSize: 14,
      color: colors.text,
      textAlign: 'justify',
      lineHeight: 22,
    },
    deanContainer: {
      alignItems: 'center',
      marginBottom: 15,
      paddingTop: 10,
    },
    deanImagePlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deanName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    deanTitle: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 10,
    },
    factGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    factCard: {
      width: '48%',
      backgroundColor: colors.bg,
      borderRadius: 10,
      padding: 20,
      marginBottom: 10,
      alignItems: 'center',
    },
    factValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
    },
    factLabel: {
      fontSize: 14,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: 5,
    },
    testimonialCard: {
      backgroundColor: colors.bg,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
    },
    testimonialText: {
      fontSize: 14,
      fontStyle: 'italic',
      color: colors.text,
      textAlign: 'justify',
      lineHeight: 22,
      marginBottom: 5,
    },
    testimonialAuthor: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'right',
    },
    infoCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.bg,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 15,
      flex: 1,
      color: colors.text,
    },
    infoValue: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });
};

export default SchoolInfoScreen;