import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import useTheme from '../hooks/usetheme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomeDrawer = (props) => {
    const { top, bottom } = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = createStyle(colors, bottom);
    const router = useRouter();

    const handleSettingsPress = () => {
        // Navigate to Settings screen
        router.push('/(drawer)/(tabs)/(Settings)');
        props.navigation.closeDrawer();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
            <DrawerContentScrollView
                {...props}
                scrollEnabled={true}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator= {false}
            >
                {/* Header Section with Gradient */}
                <LinearGradient
                    colors={[colors.primary, colors.secondary || colors.primary + 'DD']}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../assets/images/simadlogo.png")}
                            style={styles.logo}
                            contentFit="contain"
                        />
                    </View>
                    
                    <View style={styles.headerText}>
                        <Text style={styles.welcomeText}>Welcome to</Text>
                        <Text style={styles.appName}>SIMAD University</Text>
                        <Text style={styles.appSubtitle}>The Fountain of Knowledge and Wisdom</Text>
                    </View>
                </LinearGradient>

                {/* Drawer Items */}
                <View style={styles.drawerItems}>
                    <DrawerItemList 
                        {...props} 
                        itemStyle={styles.drawerItem}
                        labelStyle={styles.drawerLabel}
                    />
                </View>

                {/* User Info Section (Optional)
                <View style={styles.userInfo}>
                    <View style={styles.userAvatar}>
                        <Ionicons name="person" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>Guest User</Text>
                        <Text style={styles.userEmail}>Welcome!</Text>
                    </View>
                </View> */}
            </DrawerContentScrollView>

            {/* Footer Section */}
            <View style={styles.footer}>
                <LinearGradient
                    colors={[colors.surface + '00', colors.surface]}
                    style={styles.footerGradient}
                >

                    <TouchableOpacity 
                        style={styles.settingsButton} 
                        onPress={handleSettingsPress}
                    >
                        <Ionicons name='settings-outline' size={20} color={colors.primary}/>
                        <Text style={styles.settingsText}>Settings</Text>
                    </TouchableOpacity>

                    {/* App Version */}
                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>Version 1.0.0</Text>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    )
}

export default CustomeDrawer;

const createStyle = (colors, bottom) => {
    const styles = StyleSheet.create({
        scrollContainer: {
            flexGrow: 1,
            paddingBottom: -30,
            marginTop: -40
        },
        header: {
            paddingHorizontal: 20,
            paddingVertical: 25,
            paddingTop: 40,
            borderRadius: 20,
            marginBottom: 10,
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
        },
        logoContainer: {
            alignItems: 'center',
            marginBottom: 15,
        },
        logo: {
            width: 100,
            height: 100,
            borderRadius: 40,
            backgroundColor: colors.white + '20',
        },
        headerText: {
            alignItems: 'center',
        },
        welcomeText: {
            color: colors.white,
            fontSize: 14,
            opacity: 0.9,
            marginBottom: 2,
        },
        appName: {
            color: colors.white,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 4,
        },
        appSubtitle: {
            color: colors.white,
            fontSize: 12,
            opacity: 0.8,
        },
        drawerItems: {
            flex: 1,
            paddingHorizontal: 10,
            marginTop: 10,
        },
        drawerItem: {
            borderRadius: 12,
            marginVertical: 2,
            marginHorizontal: 8,
            paddingHorizontal: 12,
        },
        drawerLabel: {
            fontSize: 14,
            fontWeight: '500',
            color: colors.text,
            marginLeft: -10,
        },
        userInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            paddingVertical: 15,
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: colors.surface,
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
        },
        userAvatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.primary + '20',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
        },
        userDetails: {
            flex: 1,
        },
        userName: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 2,
        },
        userEmail: {
            fontSize: 12,
            color: colors.textSecondary,
        },
        footer: {
            borderTopWidth: 1,
            borderTopColor: colors.border,
        },
        footerGradient: {
            padding: 20,
            paddingBottom: 20 + bottom,
        },
        supportButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 15,
            // backgroundColor: colors.primary + '15',
            borderRadius: 12,
            marginBottom: 10,
        },
        supportText: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '600',
            marginLeft: 12,
        },
        settingsButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 15,
            marginBottom: 15,
            backgroundColor: colors.primary + '15',
            borderRadius: 15
        },
        settingsText: {
            color: colors.primary,
            fontSize: 14,
            fontWeight: '500',
            marginLeft: 12,
        },
        versionContainer: {
            alignItems: 'center',
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: colors.border + '40',
        },
        versionText: {
            color: colors.text,
            fontSize: 12,
            opacity: 0.7,
        },
    });
    return styles;
};