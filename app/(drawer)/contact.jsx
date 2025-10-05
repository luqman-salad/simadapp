import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from "../../hooks/usetheme";
import { Header } from "../../components/Headrer";

const offices = [
  {
    title: "Admissions Office",
    email: "Admissions@simad.edu.so",
    icon: "person-add-outline",
    responsibilities: [
      "Recruitment of domestic students",
      "Open Campus, request for materials",
      "Student status (leave of absence, withdrawal etc.)",
      "Transcripts",
    ],
  },
  {
    title: "Student Affairs Office",
    email: "",
    icon: "people-outline",
    responsibilities: [
      "Certificates",
      "Scholarships",
      "Tuition",
      "Extracurricular Activities",
      "Clubs, student volunteer opportunities",
      "Culture weeks",
    ],
  },
  {
    title: "Academic Office",
    email: "Academics@simad.edu.so",
    icon: "school-outline",
    responsibilities: [
      "Course Registration",
      "Graduation Requirement Confirmation",
      "Class Absences (Illness / Injury or Bereavement)",
      "Final, Midterm, Re-exam, Supplementary Exams",
      "Graduate Students",
      "Library",
    ],
  },
  {
    title: "ICT Office",
    email: "ict@simad.edu.so",
    icon: "hardware-chip-outline",
    responsibilities: ["IT support", "System malfunctions"],
  },
  {
    title: "Research Office",
    email: "Research@simad.edu.so",
    icon: "flask-outline",
    responsibilities: ["Research"],
  },
  {
    title: "Public Relations Office",
    email: "Pr@simad.edu.so",
    icon: "megaphone-outline",
    responsibilities: ["Alumni Association", "Social outreach", "Campus tours"],
  },
  {
    title: "Security Guide Office",
    email: "",
    icon: "shield-checkmark-outline",
    responsibilities: ["On-campus lost-and-found", "Visitor parking"],
  },
  {
    title: "Finance Office",
    email: "",
    icon: "cash-outline",
    responsibilities: ["Fees"],
  },
];

const ContactScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState(null);

  const handleEmail = (email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Helper function to create lighter/darker variants of colors
  const adjustColor = (color, amount) => {
    // For now, we'll use solid colors since we can't manipulate hex colors easily
    // In a real app, you might want to use a color manipulation library
    return color;
  };

  const ContactCard = ({ office, index, isExpanded }) => {
    const cardScale = new Animated.Value(1);
    
    const handlePressIn = () => {
      Animated.spring(cardScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(cardScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    // Use theme colors directly without manipulation
    const cardColors = [
      colors.primary,
      colors.secondary,
      colors.success || '#4CAF50',
      colors.warning || '#FF9800',
      colors.info || '#2196F3',
      colors.tertiary || colors.primary
    ];
    const cardColor = cardColors[index % cardColors.length];

    return (
      <Animated.View style={{ transform: [{ scale: cardScale }] }}>
        <TouchableOpacity
          onPress={() => toggleCard(index)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: cardColor }]}>
                <Ionicons name={office.icon} size={24} color={colors.white} />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.officeTitle}>{office.title}</Text>
                <View style={styles.responsibilitiesPreview}>
                  {office.responsibilities.slice(0, 2).map((resp, i) => (
                    <Text key={i} style={styles.responsibilityPreview}>
                      {resp}
                    </Text>
                  ))}
                  {office.responsibilities.length > 2 && (
                    <Text style={[styles.moreText, { color: cardColor }]}>
                      +{office.responsibilities.length - 2} more
                    </Text>
                  )}
                </View>
              </View>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color={colors.textSecondary} 
              />
            </View>

            {isExpanded && (
              <View style={styles.expandedContent}>
                <View style={styles.responsibilitiesSection}>
                  <Text style={styles.sectionLabel}>Responsibilities:</Text>
                  {office.responsibilities.map((resp, i) => (
                    <View key={i} style={styles.responsibilityItem}>
                      <View style={[styles.bullet, { backgroundColor: cardColor }]} />
                      <Text style={styles.responsibility}>{resp}</Text>
                    </View>
                  ))}
                </View>

                {office.email ? (
                  <TouchableOpacity
                    onPress={() => handleEmail(office.email)}
                    style={[styles.emailBtn, { borderColor: cardColor }]}
                  >
                    <Ionicons name="mail-outline" size={20} color={cardColor} />
                    <Text style={[styles.emailText, { color: cardColor }]}>
                      {office.email}
                    </Text>
                    <Ionicons name="open-outline" size={16} color={cardColor} />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.noEmailContainer}>
                    <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
                    <Text style={styles.noEmail}>Contact through main office</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title="Contact Us"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Ionicons name="chatbubbles-outline" size={48} color={colors.white} />
            <Text style={styles.heroTitle}>Get in Touch</Text>
            <Text style={styles.heroSubtitle}>
              Reach the right department for your inquiries. Tap on any office to see details.
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => Linking.openURL('tel:+252616000000')}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.surface }]}>
                <Ionicons name="call-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => Linking.openURL('mailto:info@simad.edu.so')}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.surface }]}>
                <Ionicons name="mail-outline" size={24} color={colors.secondary} />
              </View>
              <Text style={styles.quickText}>Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => Linking.openURL('https://maps.google.com')}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.surface }]}>
                <Ionicons name="location-outline" size={24} color={colors.success || '#4CAF50'} />
              </View>
              <Text style={styles.quickText}>Location</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => Linking.openURL('https://simad.edu.so')}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.surface }]}>
                <Ionicons name="globe-outline" size={24} color={colors.info || '#2196F3'} />
              </View>
              <Text style={styles.quickText}>Website</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.officesSection}>
          <Text style={styles.sectionTitle}>University Offices</Text>
          {offices.map((office, index) => (
            <ContactCard
              key={index}
              office={office}
              index={index}
              isExpanded={expandedCard === index}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Ionicons name="business-outline" size={32} color={colors.primary} />
          <Text style={styles.footerTitle}>We're Here to Help</Text>
          <Text style={styles.footerText}>
            Our dedicated teams are ready to assist you with any questions or concerns you may have.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactScreen;

const createStyle = (colors) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    scrollViewContent: {
      paddingBottom: 40,
    },
    heroSection: {
      paddingVertical: 40,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    heroContent: {
      alignItems: "center",
    },
    heroTitle: {
      fontSize: 32,
      fontWeight: "800",
      color: colors.white,
      marginTop: 16,
      marginBottom: 8,
      textAlign: "center",
    },
    heroSubtitle: {
      fontSize: 16,
      color: colors.white,
      opacity: 0.9,
      textAlign: "center",
      lineHeight: 22,
    },
    quickActions: {
      padding: 20,
    },
    quickActionsTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
    },
    quickActionsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    quickAction: {
      alignItems: "center",
      flex: 1,
    },
    quickIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    quickText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.text,
    },
    officesSection: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 20,
    },
    card: {
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    cardHeaderText: {
      flex: 1,
    },
    officeTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    responsibilitiesPreview: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    responsibilityPreview: {
      fontSize: 12,
      color: colors.textSecondary,
      backgroundColor: colors.bg,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      marginRight: 6,
      marginBottom: 4,
    },
    moreText: {
      fontSize: 12,
      fontWeight: "600",
    },
    expandedContent: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    responsibilitiesSection: {
      marginBottom: 16,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textSecondary,
      marginBottom: 12,
    },
    responsibilityItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    bullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginTop: 6,
      marginRight: 12,
    },
    responsibility: {
      fontSize: 14,
      color: colors.text,
      flex: 1,
      lineHeight: 20,
    },
    emailBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderRadius: 12,
      padding: 12,
      gap: 8,
    },
    emailText: {
      fontSize: 14,
      fontWeight: "600",
      flex: 1,
      textAlign: "center",
    },
    noEmailContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      gap: 8,
    },
    noEmail: {
      fontSize: 14,
      color: colors.textSecondary,
      fontStyle: "italic",
    },
    footer: {
      alignItems: "center",
      padding: 30,
      backgroundColor: colors.surface,
      margin: 20,
      borderRadius: 20,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    footerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    footerText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 20,
    },
  });