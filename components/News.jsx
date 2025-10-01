import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import useTheme from '../hooks/usetheme';
import computerlabsImage from '../assets/images/computerlabs.jpeg';
import { getActiveNews } from '../apis/newsApi';

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

export default function AnnouncementList() {
  const { colors } = useTheme();
  const styles = createStyle(colors);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  const handleReadMore = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleRetry = () => {
    fetchNews();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading announcements...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load announcements</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (news.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No announcements available</Text>
        <Text style={styles.emptyDetail}>Check back later for new updates</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={news}
      renderItem={({ item }) => renderItem({ item, styles, handleReadMore, colors })}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
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
      marginBottom: 10,
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
      marginBottom: 10,
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