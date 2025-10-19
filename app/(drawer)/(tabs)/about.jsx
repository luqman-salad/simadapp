import { useRouter } from 'expo-router';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import useTheme from '../../../hooks/usetheme';
import useAboutStore from '../../../store/aboutStore';
import { Header } from '../../../components/Headrer';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

const { width } = Dimensions.get('window');

const cardData = [
  {
    id: '1',
    title: 'Learn About SIMAD University in 5 min',
    image: require('../../../assets/images/simadMainCampus.png'),
    icon: 'play-circle',
    color: '#20a147',
    description: 'Quick overview'
  },
  {
    id: '2',
    title: 'The Rector\'s Office',
    image: require('../../../assets/images/simadMeeting.png'),
    icon: 'person',
    color: '#4791ce',
    description: 'Leadership & Message'
  },
  {
    id: '3',
    title: 'The Senate',
    image: require('../../../assets/images/simadMeeting2.png'),
    icon: 'groups',
    color: '#f7b519',
    description: 'Governance & Structure'
  },
  {
    id: '4',
    title: 'Vision and Purpose',
    image: require('../../../assets/images/missionvisinvalue.png'),
    icon: 'visibility',
    color: '#20a147',
    description: 'Mission & Values'
  },
  {
    id: '5',
    title: 'History & Awards',
    image: require('../../../assets/images/simadAwards.png'),
    icon: 'history-edu',
    color: '#4791ce',
    description: 'Legacy & Achievements'
  },
  {
    id: '6',
    title: 'Accreditation, Ranking, & Memberships',
    image: require('../../../assets/images/simadAccreditation.png'),
    icon: 'verified',
    color: '#f7b519',
    description: 'Quality & Recognition'
  },
];

export default function ImageGrid() {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();
  const navigation = useNavigation();
  const { setSelectedAboutItem } = useAboutStore();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handlePress = (item) => {
    setSelectedAboutItem(item);
    router.push("(screens)/aboutDetail");
  };

  const handleNotificationPress = () => {
    router.push("(screens)/notifications");
  };

  const Card = ({ item, index }) => (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={styles.cardTouchable}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={item.image}
          style={styles.card}
          imageStyle={styles.image}
        >
          {/* Gradient Overlay */}
          <View style={[styles.gradientOverlay, { backgroundColor: item.color + '40' }]} />
          
          {/* Dark Overlay */}
          <View style={styles.darkOverlay} />
          
          {/* Icon Badge */}
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <MaterialIcons name={item.icon} size={20} color="#FFFFFF" />
          </View>
          
          {/* Content */}
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            
            {/* Action Button */}
            <View style={[styles.actionButton, { backgroundColor: item.color }]}>
              <Text style={styles.actionText}>Explore</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.wrapper}>
      <Header
        title="About SIMAD"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigation.openDrawer()}
      />
      
      

      {/* Grid Section */}
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {cardData.map((item, index) => (
            <Card key={item.id} item={item} index={index} />
          ))}
        </View>
        
        
      </ScrollView>
    </View>
  );
}

const createStyle = (colors) => {
  const cardWidth = (width - 48) / 2; // Adjusted for better spacing
  
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.bg
    },
    container: {
      paddingHorizontal: 16,
      paddingBottom: 30,
    },
    
    // Hero Section
    heroSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 20,
      backgroundColor: colors.surface,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border + '20',
    },
    heroContent: {
      flex: 1,
    },
    heroTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    heroSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    heroDecoration: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 16,
    },
    
    // Grid Container
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    
    // Card Styles
    cardContainer: {
      width: cardWidth,
      marginBottom: 16,
    },
    cardTouchable: {
      borderRadius: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    card: {
      width: '100%',
      height: 200,
      borderRadius: 20,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      padding: 16,
    },
    image: {
      borderRadius: 20,
    },
    gradientOverlay: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.6,
    },
    darkOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: 20,
    },
    iconContainer: {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    cardContent: {
      zIndex: 2,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 6,
      lineHeight: 20,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    description: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: 12,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      gap: 4,
    },
    actionText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    
    // Footer
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      marginTop: 10,
      backgroundColor: colors.surface,
      borderRadius: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    footerIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    footerText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
  });
};