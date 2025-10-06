import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';
import { getSchoolInfoById } from '../../apis/academicProgramsApi';

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
      <MaterialCommunityIcons name={iconName} size={22} color={colors.primary} />
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

const ProgramCard = ({ title, iconName, programId }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigation = useNavigation();

  return (
    <Pressable style={styles.programCard}
      onPress={() => {
        navigation.navigate('ProgramsInfoScreen', { 
          programId: programId, 
          programName: title 
        });
      }}
    >
      <MaterialCommunityIcons name={iconName} size={28} color={colors.textSecondary} />
      <Text style={styles.programText}>{title}</Text>
      <Ionicons name="link-outline" size={24} color={colors.textSecondary} style={{ marginLeft: 'auto' }} />
    </Pressable>
  );
};

const SchoolInfoScreen = () => {
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

  console.log('SchoolInfoScreen received params:', params);
  console.log('Extracted schoolId:', schoolId);
  console.log('Extracted schoolName:', schoolName);

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
  }, [schoolId]);

  const handleRetry = () => {
    fetchSchoolData();
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          title={schoolName || "Loading..."}
          showLeftIcon
          leftIconName="chevron-back"
          onLeftIconPress={() => navigation.goBack()}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Loading school details...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header
          title={schoolName || "Error"}
          showLeftIcon
          leftIconName="chevron-back"
          onLeftIconPress={() => navigation.goBack()}
        />
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: colors.error }]}>
            Failed to load school details
          </Text>
          <Text style={[styles.errorDetail, { color: colors.text }]}>
            {error}
          </Text>
          <Pressable style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!schoolData) {
    return (
      <View style={styles.container}>
        <Header
          title={schoolName || "Not Found"}
          showLeftIcon
          leftIconName="chevron-back"
          onLeftIconPress={() => navigation.goBack()}
        />
        <View style={styles.center}>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            School information not available
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={schoolData.name}
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.headerBackground}>
          {schoolData.coverImage ? (
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
            <Text style={styles.schoolTitle}>{schoolData.name}</Text>
            <Text style={styles.schoolDescription}>{schoolData.tagline || schoolData.shortDescription}</Text>
          </View>
        </View>

        {/* Programs Section */}
        {schoolData.programs && schoolData.programs.length > 0 && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.programsSection?.icon)}
              iconColor={colors.primary}
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
        {(schoolData.vision || schoolData.mission) && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.visionAndMissionSection?.icon)}
              iconColor={colors.tertiary}
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
        {schoolData.dean && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.dean.section?.icon)}
              iconColor={colors.secondary}
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
        {schoolData.facts && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.factsSection?.icon)}
              iconColor={colors.primary}
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
        {schoolData.testimonials && schoolData.testimonials.length > 0 && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.testimonialsSection?.icon)}
              iconColor={colors.secondary}
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
        {schoolData.contact && (
          <View style={styles.cardSection}>
            <SectionHeader
              iconName={getIconName(schoolData.contactSection?.icon)}
              iconColor={colors.tertiary}
              title={schoolData.contactSection?.title || "Contact Info"}
              subtitle={schoolData.contactSection?.subtitle || "Get in touch with us"}
            />
            {schoolData.contact.phone && (
              <InfoCard iconName="phone-outline" title="Phone" value={schoolData.contact.phone} />
            )}
            {schoolData.contact.email && (
              <InfoCard iconName="email-outline" title="Email" value={schoolData.contact.email} />
            )}
            {schoolData.contact.location && (
              <InfoCard iconName="map-marker-outline" title="Location" value={schoolData.contact.location} />
            )}
            {schoolData.contact.website && (
              <InfoCard iconName="web" title="Website" value={schoolData.contact.website} />
            )}
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
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      textAlign: 'center',
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
    emptyText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '500',
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
      color: colors.white,
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
      color: colors.textPrimary,
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
      color: colors.textSecondary,
    },
  });
};

export default SchoolInfoScreen;