import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import useTheme from "../hooks/usetheme";
import { getRectorsMessage } from "../apis/rectorsOfficeApi";

export default function RectorsOffice() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [rector, setRector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getRectorsMessage();
      if (result?.success && result.data?.RectorMessage) {
        setRector(result.data.RectorMessage); // directly set the object
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEmailPress = (email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!rector) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.secondary }}>No Rector data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Image
          source={{ uri: rector.image || "https://via.placeholder.com/150" }}
          style={styles.rectorImage}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.rectorName}>{rector.name}</Text>
        </View>
      </View>

      {/* Message */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderIcon}>✉️</Text>
          <Text style={styles.cardTitle}>Message from the Rector</Text>
        </View>
        <Text style={styles.cardText}>{rector.message}</Text>
      </View>

      {/* Biography */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderIcon}>📄</Text>
          <Text style={styles.cardTitle}>Biography of the Rector</Text>
        </View>
        <Text style={styles.cardSubtitle}>{rector.name}</Text>
        <Text style={styles.cardText}>{rector.title || "Rector, SIMAD University"}</Text>
        <Text style={styles.cardText}>Mogadishu, Somalia</Text>
        <Text style={styles.cardText} selectable={true}>
          {rector.bio}
        </Text>
        <Pressable onPress={() => handleEmailPress(rector.email)}>
          <Text style={styles.emailText}>
            {rector.email ? `email: ${rector.email}` : "Visit the office"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const createStyle = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    contentContainer: {
      paddingVertical: 20,
    },
    topSection: {
      alignItems: "center",
      marginBottom: 20,
    },
    rectorImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 1,
      borderColor: colors.border,
    },
    titleContainer: {
      backgroundColor: colors.surface,
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: 10,
    },
    rectorName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: 20,
      marginHorizontal: 15,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    cardHeaderIcon: {
      fontSize: 24,
      marginRight: 10,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.secondary,
    },
    cardSubtitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    cardText: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 10,
      color: colors.text,
      textAlign: "justify",
    },
    emailText: {
      color: colors.secondary,
      textDecorationLine: "underline",
    },
  });
