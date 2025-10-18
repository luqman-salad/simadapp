import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useTheme from "../hooks/usetheme";
import { getWhySimadData } from "../apis/learnAboutSimadApi";
import { useGlobalLoading } from "../hooks/useGlobalLoading"; // Import the global loading hook

const LearnAboutSIMAD = ({ componentKey = "learn-about" }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getWhySimadData();
      if (result?.success && Array.isArray(result.data.whySimadItems)) {
        setCards(result.data.whySimadItems);
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
  }, []); // No refreshTrigger needed for dedicated screen

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View style={styles.whySimadContainer}>
        <Text style={styles.whySimadTitle}>Why Simad ?</Text>
      </View>

      {/* Error State - Global loading handles the loading state */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.retryText} onPress={fetchData}>
            Tap to retry
          </Text>
        </View>
      )}

      {/* Data - Only show when not loading and no error */}
      {!loading && !error && cards.map((card, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardDescription}>
            {card.description}{" "}
            <Text style={styles.seeMore}>See More...</Text>
          </Text>
          {card.image && (
            <Image source={{ uri: card.image }} style={styles.cardImage} />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const createStyle = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    contentContainer: {
      paddingBottom: 30,
    },
    bannerContainer: {
      height: 200,
      position: "relative",
    },
    bannerImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    learnMoreButton: {
      position: "absolute",
      bottom: 5,
      left: "50%",
      transform: [{ translateX: -160 }],
      width: 320,
      height: 50,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "500",
    },
    whySimadContainer: {
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    whySimadTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      marginHorizontal: 15,
      marginVertical: 10,
      padding: 15,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 5,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
      marginBottom: 10,
    },
    seeMore: {
      color: colors.primary,
      fontWeight: "bold",
    },
    cardImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      resizeMode: "cover",
    },
    errorContainer: {
      alignItems: "center",
      marginTop: 20,
      padding: 20,
    },
    errorText: {
      color: colors.danger,
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    retryText: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 16,
    },
  });

export default LearnAboutSIMAD;