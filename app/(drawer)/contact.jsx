import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../../hooks/usetheme";
import { Header } from "../../components/Headrer";

const offices = [
  {
    title: "Admissions Office",
    email: "Admissions@simad.edu.so",
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
    responsibilities: ["IT support", "System malfunctions"],
  },
  {
    title: "Research Office",
    email: "Research@simad.edu.so",
    responsibilities: ["Research"],
  },
  {
    title: "Public Relations Office",
    email: "Pr@simad.edu.so",
    responsibilities: ["Alumni Association", "Social outreach", "Campus tours"],
  },
  {
    title: "Security Guide Office",
    email: "",
    responsibilities: ["On-campus lost-and-found", "Visitor parking"],
  },
  {
    title: "Finance Office",
    email: "",
    responsibilities: ["Fees"],
  },
];

const ContactScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();

  const handleEmail = (email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title="Contact Us"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Get in Touch</Text>
          <Text style={styles.subtitle}>
            Reach out to the right department for your inquiries.
          </Text>
        </View>

        {offices.map((office, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.officeTitle}>{office.title}</Text>

            {office.responsibilities.map((resp, i) => (
              <Text key={i} style={styles.responsibility}>
                • {resp}
              </Text>
            ))}

            {office.email ? (
              <TouchableOpacity
                onPress={() => handleEmail(office.email)}
                style={styles.emailBtn}
              >
                <Ionicons name="mail-outline" size={18} color={colors.primary} />
                <Text style={styles.emailText}>{office.email}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noEmail}>No direct email available</Text>
            )}
          </View>
        ))}
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
      paddingBottom: 20,
      paddingHorizontal: 16,
    },
    header: {
      alignItems: "center",
      marginVertical: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary || "#666",
      textAlign: "center",
      marginTop: 4,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    officeTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.primary,
      marginBottom: 8,
    },
    responsibility: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 2,
    },
    emailBtn: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    emailText: {
      marginLeft: 6,
      fontSize: 14,
      fontWeight: "500",
      color: colors.primary,
    },
    noEmail: {
      fontSize: 13,
      marginTop: 8,
      color: "#888",
      fontStyle: "italic",
    },
  });
