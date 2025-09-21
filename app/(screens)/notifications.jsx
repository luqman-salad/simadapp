import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useTheme from "../../hooks/usetheme";
import { Header } from "../../components/Headrer";

// Dummy notifications data
const dummyNotifications = [
  {
    id: "1",
    type: "assignment",
    title: "New Assignment",
    message: "Assignment 2 for Data Structures is due next week.",
    time: "2h ago",
    icon: "document-text-outline",
  },
  {
    id: "2",
    type: "attendance",
    title: "Attendance Reminder",
    message: "You have a pending attendance update for CS 301.",
    time: "5h ago",
    icon: "checkmark-done-circle-outline",
  },
  {
    id: "3",
    type: "system",
    title: "System Update",
    message: "The platform will undergo maintenance tomorrow at 10 PM.",
    time: "1d ago",
    icon: "settings-outline",
  },
];

const NotificationsScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const router = useRouter();

  const [notifications, setNotifications] = useState(dummyNotifications);

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Ionicons name={item.icon} size={28} color={colors.primary} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="Notifications"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications yet 🎉</Text>
        }
      />

      {notifications.length > 0 && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => setNotifications([])}
        >
          <Ionicons name="trash-outline" size={20} color={colors.white} />
          <Text style={styles.clearBtnText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const createStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    list: {
      padding: 20,
      paddingBottom: 100,
    },
    card: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 5,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
      gap: 12,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    message: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 6,
    },
    time: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    emptyText: {
      textAlign: "center",
      marginTop: 50,
      fontSize: 16,
      color: colors.textSecondary,
    },
    clearBtn: {
      position: "absolute",
      bottom: 20,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.danger,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 30,
      gap: 8,
    },
    clearBtnText: {
      color: colors.white,
      fontSize: 15,
      fontWeight: "600",
    },
  });
