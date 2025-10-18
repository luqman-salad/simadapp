import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import useTheme from "../hooks/usetheme";
import { getRectorsMessage } from "../apis/rectorsOfficeApi";
import { useGlobalLoading } from "../hooks/useGlobalLoading"; // Import the global loading hook

export default function RectorsOffice({ componentKey = "rectors-office" }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [rector, setRector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
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

  // Remove individual loading display - global overlay handles it
  if (error) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={[styles.errorText, { color: colors.danger }]}>
          Error: {error}
        </Text>
        <Pressable onPress={fetchData} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: colors.primary }]}>
            Tap to retry
          </Text>
        </Pressable>
      </View>
    );
  }

  if (!rector && !loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
          No Rector data available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Image
          source={{ uri: rector?.image || "https://via.placeholder.com/150" }}
          style={styles.rectorImage}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.rectorName}>{rector?.name || "Rector"}</Text>
        </View>
      </View>

      {/* Message */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderIcon}>✉️</Text>
          <Text style={styles.cardTitle}>Message from the Rector</Text>
        </View>
        <Text style={styles.cardText}>{rector?.message || "No message available"}</Text>
      </View>

      {/* Biography */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderIcon}>📄</Text>
          <Text style={styles.cardTitle}>Biography of the Rector</Text>
        </View>
        <Text style={styles.cardSubtitle}>{rector?.name || "Rector"}</Text>
        <Text style={styles.cardText}>{rector?.title || "Rector, SIMAD University"}</Text>
        <Text style={styles.cardText}>Mogadishu, Somalia</Text>
        <Text style={styles.cardText} selectable={true}>
          {rector?.bio || "Biography not available"}
        </Text>
        {rector?.email && (
          <Pressable onPress={() => handleEmailPress(rector.email)}>
            <Text style={styles.emailText}>
              email: {rector.email}
            </Text>
          </Pressable>
        )}
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
    centerContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
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
      color: colors.text
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    cardSubtitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: colors.text
    },
    cardText: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 10,
      color: colors.text,
      textAlign: "justify",
    },
    emailText: {
      color: colors.primary,
      textDecorationLine: "underline",
      marginTop: 10,
    },
    errorText: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    noDataText: {
      fontSize: 16,
      textAlign: 'center',
    },
    retryButton: {
      marginTop: 10,
    },
    retryText: {
      fontSize: 16,
      fontWeight: "bold",
    },
  });