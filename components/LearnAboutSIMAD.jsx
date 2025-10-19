import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import useTheme from "../hooks/usetheme";
import { getWhySimadData } from "../apis/learnAboutSimadApi";
import { useGlobalLoading } from "../hooks/useGlobalLoading";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableCard = ({ card, index }) => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const [expanded, setExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [fullTextHeight, setFullTextHeight] = useState(0);

  // Measure full text height without line limit
  const onFullTextLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setFullTextHeight(height);
    
    // If full text height is more than 3 lines worth, show "See More"
    // Approx height for 3 lines: lineHeight (20) * 3 = 60 + some padding
    const maxHeightFor3Lines = 70;
    setShowSeeMore(height > maxHeightFor3Lines);
  };

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{card.title}</Text>
      
      <View>
        {/* Hidden text to measure full height */}
        {!expanded && (
          <Text 
            style={[styles.cardDescription, styles.hiddenText]}
            onLayout={onFullTextLayout}
          >
            {card.description}
          </Text>
        )}
        
        {/* Visible text */}
        <Text 
          style={styles.cardDescription}
          numberOfLines={expanded ? undefined : 3}
        >
          {card.description}
        </Text>
        
        {showSeeMore && (
          <Pressable 
            onPress={toggleExpanded} 
            style={styles.seeMoreButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.seeMoreText}>
              {expanded ? '▲ See Less' : '▼ See More'}
            </Text>
          </Pressable>
        )}
      </View>
      
      {card.image && (
        <Image source={{ uri: card.image }} style={styles.cardImage} />
      )}
    </View>
  );
};

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
  }, []);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer} 
      showsVerticalScrollIndicator={false}
    >
      {/* Title */}
      <View style={styles.whySimadContainer}>
        <Text style={styles.whySimadTitle}>Why SIMAD?</Text>
      </View>

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Pressable onPress={fetchData} style={styles.retryButton}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </Pressable>
        </View>
      )}


      {/* Cards */}
      {!loading && !error && cards.map((card, index) => (
        <ExpandableCard 
          key={index} 
          card={card} 
          index={index} 
        />
      ))}

      {/* Fallback if no cards */}
      {!loading && !error && cards.length === 0 && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data available</Text>
          <Pressable onPress={fetchData} style={styles.retryButton}>
            <Text style={styles.retryText}>Refresh</Text>
          </Pressable>
        </View>
      )}
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
    whySimadContainer: {
      paddingHorizontal: 20,
      paddingTop: 15,
      paddingBottom: 10,
    },
    whySimadTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginHorizontal: 15,
      marginVertical: 8,
      padding: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border + '20',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    hiddenText: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
    },
    seeMoreButton: {
      marginTop: 8,
      alignSelf: 'flex-start',
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: colors.primary + '15',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary + '30',
    },
    seeMoreText: {
      color: colors.primary,
      fontWeight: "700",
      fontSize: 14,
    },
    cardImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      resizeMode: "cover",
      marginTop: 12,
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
    retryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.primary,
      borderRadius: 6,
    },
    retryText: {
      color: colors.white,
      fontWeight: "bold",
      fontSize: 14,
    },
    noDataContainer: {
      alignItems: "center",
      padding: 40,
    },
    noDataText: {
      color: colors.textSecondary,
      fontSize: 16,
      marginBottom: 16,
    },
    debugInfo: {
      padding: 10,
      margin: 15,
      backgroundColor: '#ffeb3b20',
      borderRadius: 6,
      borderLeftWidth: 4,
      borderLeftColor: '#ffeb3b',
    },
    debugText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 2,
    },
  });

export default LearnAboutSIMAD;