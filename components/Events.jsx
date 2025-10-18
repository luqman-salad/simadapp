import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import useTheme from '../hooks/usetheme';
import simadLogo from '../assets/images/react-logo.png';
import { Ionicons } from '@expo/vector-icons';
import { getUpcomingEvents } from '../apis/upcomingEvents';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

// Helper function to format date from API
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Extracted the render logic into a separate function
const renderEventCard = ({ item, styles }) => (
  <TouchableOpacity key={item._id} style={styles.card} activeOpacity={0.8}>
    <View style={styles.leftColumn}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.logo} />
      ) : (
        <Image source={simadLogo} style={styles.logo} />
      )}
    </View>
    <View style={styles.rightColumn}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.detailRow}>
        <Ionicons name='calendar-outline' style={styles.detailIcon} />
        <Text style={styles.detailText}>{formatDate(item.date)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name='time-outline' style={styles.detailIcon} />
        <Text style={styles.detailText}>{item.startTime} • {item.duration}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name='location-outline' style={styles.detailIcon} />
        <Text style={styles.detailText}>{item.location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function EventCardList({ componentKey = "events", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getUpcomingEvents();
      
      if (result?.success && Array.isArray(result.data)) {
        setEvents(result.data);
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [refreshTrigger]);

  // Remove individual loading display - global overlay handles it
  if (error) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.danger} />
        <Text style={[styles.errorText, { color: colors.danger }]}>
          Failed to load events
        </Text>
        <Text style={[styles.errorDetail, { color: colors.textSecondary }]}>
          {error}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchEvents}>
          <Text style={[styles.retryText, { color: colors.primary }]}>
            Tap to retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!events.length && !loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Ionicons name="calendar-outline" size={48} color={colors.textSecondary} />
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No upcoming events
        </Text>
        <Text style={[styles.emptyDetail, { color: colors.textSecondary }]}>
          Check back later for new events
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      renderItem={({ item }) => renderEventCard({ item, styles })}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    centerContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    listContainer: {
      flexGrow: 1,
      backgroundColor: colors.bg,
      padding: 10,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: 15,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
    },
    leftColumn: {
      marginRight: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    rightColumn: {
      flex: 1,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    detailIcon: {
      fontSize: 16,
      marginRight: 5,
      color: colors.primary
    },
    detailText: {
      fontSize: 14,
      color: colors.text,
    },
    errorText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
      textAlign: 'center',
    },
    errorDetail: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
      textAlign: 'center',
    },
    emptyDetail: {
      fontSize: 14,
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
};