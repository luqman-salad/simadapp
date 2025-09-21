import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useTheme from "../../hooks/usetheme";
import { Header } from "../../components/Headrer";

const ContactScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const router = useRouter();

  const contactOptions = [
    {
      id: "1",
      title: "Call Us",
      desc: "Immediate phone support",
      icon: "call-outline",
      bg: "#FFE5E0",
    },
    {
      id: "2",
      title: "Email Us",
      desc: "Send detailed queries",
      icon: "mail-outline",
      bg: "#E6F0FF",
    },
    {
      id: "3",
      title: "Live Chat",
      desc: "Chat anytime with us",
      icon: "chatbubble-ellipses-outline",
      bg: "#E5F9F0",
    },
    {
      id: "4",
      title: "FAQs",
      desc: "Quick common answers",
      icon: "help-circle-outline",
      bg: "#FFF4CC",
    },
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="Help & Support"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.topSection}>
          <Ionicons name="headset-outline" size={60} color={colors.primary} />
          <Text style={styles.title}>We’re Here to Help</Text>
          <Text style={styles.subtitle}>
            Choose the best way to reach us
          </Text>
        </View>

        {/* Grid Options */}
        <View style={styles.grid}>
          {contactOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { backgroundColor: item.bg }]}
              onPress={() => alert(`${item.title} clicked!`)}
            >
              <Ionicons name={item.icon} size={28} color={colors.primary} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.ctaBtn} onPress={() => alert("Calling...")}>
          <Ionicons name="call" size={20} color={colors.white} />
          <Text style={styles.ctaBtnText}>Urgent Help? Tap to Call</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Our support team responds within 24 hours. We’re always happy to assist you.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;

const createStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    container: {
      padding: 20,
      paddingBottom: 40,
    },
    topSection: {
      alignItems: "center",
      marginBottom: 25,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 10,
    },
    subtitle: {
      fontSize: 15,
      color: colors.textSecondary,
      marginTop: 4,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    card: {
      width: "47%",
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginTop: 8,
    },
    cardDesc: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
    },
    ctaBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      gap: 8,
    },
    ctaBtnText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },
    footerText: {
      fontSize: 14,
      textAlign: "center",
      color: colors.textSecondary,
      marginTop: 10,
    },
  });
