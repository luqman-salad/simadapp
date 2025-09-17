import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';

const schoolDetails = {
  title: 'School of Computing',
  description: 'Home of Digital innovative computing education',
  vision: "Our vision is to establish ourselves as a premier hub for academic and professional excellence in computing and information technology, committed to nurturing innovation, promoting ethical leadership, and driving digital transformation across Somalia.",
  mission: [
    "Deliver high-quality education that blends solid theoretical foundations with hands-on technical training across computing disciplines.",
    "Advance research and innovation in emerging technologies to address real-world challenges.",
  ],
  facts: [
    { label: 'Academic Programs', value: '3' },
    { label: 'Academic Staff', value: '35+' },
    { label: 'Student Population', value: '1.1k+' },
    { label: 'Foundation Year', value: '1999' },
  ],
  testimonials: [
    { text: "The hands-on experience at the Innovation Lab has been incredible. I feel so well-prepared for my future career.", name: "Abdishakur, CS Student" },
    { text: "The professors are not only knowledgeable but also genuinely supportive. I am thriving in this environment.", name: "Luqman, IT Student" },
  ],
  dean: {
    name: 'Eng. Abdifitah Farah Ali',
    title: 'Dean Faculty of Computing',
    message: "Welcome to the Faculty of Computing, where education meets innovation. As the Dean of this vibrant faculty, I am proud to lead a team of dedicated educators and researchers committed to nurturing the next generation of technology leaders. Our faculty offers three distinct programs designed to meet the diverse interests and career goals of our students: Information Technology, Computer Science, and Graphics & Multimedia. Each program is carefully crafted to provide a comprehensive education, combining theoretical knowledge with practical skills to ensure our graduates are well-prepared for the dynamic world of technology. At the Faculty of Computing, we are dedicated to fostering a learning environment that encourages innovation, collaboration, and critical thinking. Our students are challenged to solve real-world problems, engage in hands-on projects, and apply their knowledge in ways that can create a tangible impact. Thank you for visiting the Faculty of Computing. Together, we can create the future.",
  },
  contact: {
    phone: '+252617522228',
    email: 'foc@simad.edu.so',
    location: 'Taleh Campus, Mogadishu',
  },
  programs: [
    { title: 'Bachelor of Computer Science', icon: 'monitor' },
    { title: 'Bachelor of Information Technology', icon: 'monitor' },
    { title: 'Bachelor of Graphics & Multimedia', icon: 'image-outline' },
  ]
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

const ProgramCard = ({ title, iconName }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  return (
    <Pressable style={styles.programCard}
      onPress={() => {
        router.push('/(screens)/ProgramsInfoScreen');
      }}
    >
      <MaterialCommunityIcons name={iconName} size={28} color={colors.textSecondary} />
      <Text style={styles.programText}>{title}</Text>
      <Ionicons name="link-outline" size={24} color={colors.textSecondary} style={{ marginLeft: 'auto' }} />
    </Pressable>
  );
};

const SchoolDetails = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        title="School of Computing"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => navigationTab.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>


        <View style={styles.headerBackground}>
          <Image source={require('../../assets/images/computerlabs.jpeg')} style={styles.headerImage} resizeMode="cover" />
          <View style={styles.overlay}>
            <Text style={styles.schoolTitle}>{schoolDetails.title}</Text>
            <Text style={styles.schoolDescription}>{schoolDetails.description}</Text>
          </View>
        </View>



        {/* Departments of the School Section */}
        <View style={styles.cardSection}>
          <SectionHeader
            iconName="view-list"
            iconColor={colors.primary}
            title="Departments of the School"
            subtitle="Explore the Specializations Programs of the School"
          />
          <View style={styles.programList}>
            {schoolDetails.programs.map((program, index) => (
              <ProgramCard key={index} title={program.title} iconName={program.icon} />
            ))}
          </View>
        </View>

        {/* Vision & Mission Section */}
        <View style={styles.cardSection}>
          <SectionHeader
            iconName="star-outline"
            iconColor={colors.tertiary}
            title="Vision & Mission"
            subtitle="Our Commitment to Technological Innovation & Excellence"
          />
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>Vision</Text>
            <Text style={styles.infoBoxText}>{schoolDetails.vision}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>Mission</Text>
            {schoolDetails.mission.map((item, index) => (
              <Text key={index} style={styles.infoBoxText}>
                <Text style={{ fontSize: 18 }}>• </Text>{item}
              </Text>
            ))}
          </View>
        </View>

        {/* Dean's Message Section */}
        <View style={styles.cardSection}>
          <SectionHeader
            iconName="account-outline"
            iconColor={colors.secondary}
            title="Dean's Message"
            subtitle="Leadership & Vision for Technological Excellence"
          />
          <View style={styles.deanContainer}>
            <View style={styles.deanImagePlaceholder} />
            <Text style={styles.deanName}>{schoolDetails.dean.name}</Text>
            <Text style={styles.deanTitle}>{schoolDetails.dean.title}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>{schoolDetails.dean.message}</Text>
          </View>
        </View>

        {/* Facts & Figures Section */}
        <View style={styles.cardSection}>
          <SectionHeader
            iconName="information-outline"
            iconColor={colors.primary}
            title="Facts & Figures"
            subtitle="Our distinctive features and technological advantages"
          />
          <View style={styles.factGrid}>
            {schoolDetails.facts.map((fact, index) => (
              <View key={index} style={styles.factCard}>
                <Text style={styles.factValue}>{fact.value}</Text>
                <Text style={styles.factLabel}>{fact.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Student Testimonials Section */}
        <View style={styles.cardSection}>
          <SectionHeader
            iconName="comment-quote-outline"
            iconColor={colors.secondary}
            title="Student Testimonials"
            subtitle="Hear from our students"
          />
          {schoolDetails.testimonials.map((testimonial, index) => (
            <View key={index} style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              <Text style={styles.testimonialAuthor}>- {testimonial.name}</Text>
            </View>
          ))}
        </View>

        {/* Contact Info Section */}
        <View style={styles.cardSection}>
          <SectionHeader
            iconName="phone-settings-outline"
            iconColor={colors.tertiary}
            title="Contact Info"
            subtitle="Get in touch with us"
          />
          <InfoCard iconName="phone-outline" title="Phone" value={schoolDetails.contact.phone} />
          <InfoCard iconName="email-outline" title="Email" value={schoolDetails.contact.email} />
          <InfoCard iconName="map-marker-outline" title="Location" value={schoolDetails.contact.location} />
        </View>

        {/* Call to Action Section */}
        {/* <View style={[styles.ctaCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
          <Text style={styles.ctaSubtitle}>Join our community of innovators and start building your future today.</Text>
          <Pressable style={({ pressed }) => [styles.applyButton, { opacity: pressed ? 0.8 : 1 }]}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </Pressable>
        </View> */}
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
    // The header is now inside the ScrollView
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

    // // ... other styles ...
    // scrollViewContent: {
    //   paddingBottom: 20,
    // },
    // headerBackground: {
    //   width: '100%',
    //   // paddingTop and marginBottom moved here to make the image cover the space
    //   paddingTop: 120,
    //   marginBottom: 20,
    // },
    // schoolHeaderContent: {
    //   paddingHorizontal: 20,
    // },
    // schoolTitle: {
    //   fontSize: 28,
    //   fontWeight: 'bold',
    //   color: colors.text,
    //   marginBottom: 5,
    // },
    // schoolDescription: {
    //   fontSize: 16,
    //   color: colors.textSecondary,
    // },
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
      backgroundColor: colors.textMuted,
      marginBottom: 10,
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

export default SchoolDetails;