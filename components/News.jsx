import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import useTheme from '../hooks/usetheme';
import computerlabsImage from '../assets/images/computerlabs.jpeg';
import { getActiveNews } from '../apis/newsApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const renderItem = ({ item, styles, handleReadMore, colors }) => (
  <TouchableOpacity
    key={item._id}
    style={styles.card}
    activeOpacity={0.8}
    onPress={() => handleReadMore(item.infoLink)}
  >
    {item.image ? (
      <Image source={{ uri: item.image }} style={styles.cardImage} />
    ) : (
      <Image source={computerlabsImage} style={styles.cardImage} />
    )}
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity onPress={() => handleReadMore(item.infoLink)}>
        <Text style={styles.readMore}>Read More...</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default function AnnouncementList({ componentKey = "announcements", refreshTrigger = 0 }) {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Connect to global loading state
  useGlobalLoading(componentKey, loading);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getActiveNews();
      
      if (result?.success && Array.isArray(result.data)) {
        setNews(result.data);
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [refreshTrigger]);

  const handleReadMore = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  // Remove individual loading display - global overlay handles it
  if (error) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={[styles.errorText, { color: colors.danger }]}>
          Failed to load announcements
        </Text>
        <Text style={[styles.errorDetail, { color: colors.textSecondary }]}>
          {error}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchNews}>
          <Text style={[styles.retryText, { color: colors.primary }]}>
            Tap to retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!news.length && !loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No announcements available
        </Text>
        <Text style={[styles.emptyDetail, { color: colors.textSecondary }]}>
          Check back later for new updates
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={news}
      renderItem={({ item }) => renderItem({ item, styles, handleReadMore, colors })}
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
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 3,
      overflow: 'hidden',
    },
    cardImage: {
      width: 120,
      height: 120,
      borderRadius: 10,
      margin: 10,
      resizeMode: 'cover',
    },
    cardContent: {
      flex: 1,
      paddingVertical: 10,
      paddingRight: 10,
      justifyContent: 'center',
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    cardDescription: {
      fontSize: 12,
      color: colors.text,
      marginBottom: 5,
    },
    readMore: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: '600',
    },
    errorText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
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
      marginBottom: 10,
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