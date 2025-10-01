import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import useTheme from '../hooks/usetheme';
import simadLogo from '../assets/images/react-logo.png';
import { Ionicons } from '@expo/vector-icons';
import { getUpcomingEvents } from '../apis/upcomingEvents';

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

export default function EventCardList() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  const handleRetry = () => {
    fetchEvents();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
        <Text style={styles.errorText}>Failed to load events</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="calendar-outline" size={48} color={colors.textSecondary} />
        <Text style={styles.emptyText}>No upcoming events</Text>
        <Text style={styles.emptyDetail}>Check back later for new events</Text>
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
      // width: 20,
      // height: 20,
      fontSize: 16,
      marginRight: 5,
      resizeMode: 'contain',
      color: colors.primary
    },
    detailText: {
      fontSize: 14,
      color: colors.text,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
      padding: 20,
    },
    loadingText: {
      marginTop: 10,
      color: colors.text,
      fontSize: 16,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
      padding: 20,
    },
    errorText: {
      color: colors.error,
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
    },
    errorDetail: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
      padding: 20,
    },
    emptyText: {
      color: colors.textSecondary,
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
    },
    emptyDetail: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    retryText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '500',
    },
  });
};