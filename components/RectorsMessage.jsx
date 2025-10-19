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
import { useGlobalLoading } from "../hooks/useGlobalLoading";
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
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
        setRector(result.data.RectorMessage);
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

  const handlePhonePress = (phone) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  // Remove individual loading display - global overlay handles it
  if (error) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <View style={styles.errorIcon}>
          <Ionicons name="warning-outline" size={64} color={colors.danger} />
        </View>
        <Text style={[styles.errorText, { color: colors.danger }]}>
          Unable to load data
        </Text>
        <Text style={[styles.errorSubtext, { color: colors.textSecondary }]}>
          {error}
        </Text>
        <Pressable onPress={fetchData} style={[styles.retryButton, { backgroundColor: colors.primary }]}>
          <Ionicons name="refresh" size={20} color="#FFFFFF" />
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (!rector && !loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <View style={styles.emptyIcon}>
          <FontAwesome5 name="user-tie" size={64} color={colors.textSecondary} />
        </View>
        <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
          No rector information available
        </Text>
        <Pressable onPress={fetchData} style={[styles.retryButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.retryText}>Refresh</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: rector?.image || "https://via.placeholder.com/150" }}
            style={styles.rectorImage}
          />
          <View style={[styles.verifiedBadge, { backgroundColor: colors.success }]}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.rectorName}>{rector?.name || "Rector"}</Text>
          <Text style={styles.rectorTitle}>{rector?.title || "Rector, SIMAD University"}</Text>
          
        </View>
      </View>

      {/* Message Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <MaterialIcons name="record-voice-over" size={24} color={colors.primary} />
          </View>
          <Text style={styles.cardTitle}>Message from the Rector</Text>
        </View>
        <View style={styles.messageContent}>
          <Ionicons name="quote" size={24} color={colors.primary + '40'} style={styles.quoteIcon} />
          <Text style={styles.cardText}>{rector?.message || "No message available"}</Text>
        </View>
      </View>

      {/* Biography Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: colors.accent + '20' }]}>
            <FontAwesome5 name="user-graduate" size={20} color={colors.text} />
          </View>
          <Text style={styles.cardTitle}>Biography of the Rector</Text>
        </View>
        
        <View style={styles.bioHeader}>
          <Ionicons name="person" size={16} color={colors.text} />
          <Text style={styles.cardSubtitle}>{rector?.name || "Rector"}</Text>
        </View>
        
        <View style={styles.bioHeader}>
          <Ionicons name="business" size={16} color={colors.text} />
          <Text style={styles.cardText}>{rector?.title || "Rector, SIMAD University"}</Text>
        </View>
        
        <View style={styles.bioHeader}>
          <Ionicons name="location" size={16} color={colors.text} />
          <Text style={styles.cardText}>Mogadishu, Somalia</Text>
        </View>
        
        <View style={styles.bioContent}>
          <Text style={styles.cardText} selectable={true}>
            {rector?.bio || "Biography not available"}
          </Text>
        </View>

        {rector?.email && (
          <Pressable 
            onPress={() => handleEmailPress(rector.email)} 
            style={styles.emailContainer}
          >
            <Ionicons name="mail-open" size={20} color={colors.primary} />
            <Text style={styles.emailText}>Email: {rector.email}</Text>
            <Ionicons name="open-outline" size={16} color={colors.primary} />
          </Pressable>
        )}

        {rector?.phone && (
          <Pressable 
            onPress={() => handlePhonePress(rector.phone)} 
            style={styles.emailContainer}
          >
            <Ionicons name="call" size={20} color={colors.primary} />
            <Text style={styles.emailText}>Phone: {rector.phone}</Text>
            <Ionicons name="call" size={16} color={colors.primary} />
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
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
    },
    
    // Top Section
    topSection: {
      alignItems: "center",
      marginBottom: 30,
      paddingHorizontal: 20,
    },
    imageContainer: {
      position: 'relative',
      marginBottom: 16,
    },
    rectorImage: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 4,
      borderColor: colors.primary + '30',
    },
    verifiedBadge: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.surface,
    },
    titleContainer: {
      alignItems: 'center',
    },
    rectorName: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 4,
      textAlign: 'center',
    },
    rectorTitle: {
      fontSize: 16,
      color: colors.textMuted,
      marginBottom: 16,
      textAlign: 'center',
    },
    contactIcons: {
      flexDirection: 'row',
      gap: 16,
    },
    contactIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary + '30',
    },
    
    // Cards
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border + '30',
      shadowColor: colors.shadow || '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      flex: 1,
    },
    
    // Message Card
    messageContent: {
      position: 'relative',
    },
    quoteIcon: {
      position: 'absolute',
      top: -8,
      left: -8,
    },
    cardText: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      textAlign: "justify",
    },
    
    // Biography Card
    bioHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 8,
    },
    cardSubtitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    bioContent: {
      marginTop: 12,
      marginBottom: 16,
    },
    emailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: colors.primary + '10',
      borderRadius: 8,
      marginTop: 8,
      gap: 8,
    },
    emailText: {
      flex: 1,
      color: colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    
    // Actions
    actionsContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 12,
      borderRadius: 10,
    },
    actionText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    
    // Error States
    errorIcon: {
      marginBottom: 16,
    },
    emptyIcon: {
      marginBottom: 16,
    },
    errorText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    errorSubtext: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
    },
    noDataText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 24,
    },
    retryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 25,
      gap: 8,
      minWidth: 140,
    },
    retryText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });