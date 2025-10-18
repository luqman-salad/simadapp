import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import useTheme from '../../../../hooks/usetheme';

// Import the new, separate bottom sheet components
import { Header } from '../../../../components/Headrer';
import { useBottomSheet } from '../../../../context/BottomSheetContext';
import { useRouter } from 'expo-router';



const SettingsItem = ({ icon, title, subtitle, onPress, colors }) => {
  const isSpecialItem = title === 'Theme' || title === 'Select the interface language';
  return (
    <TouchableOpacity style={createStyles(colors).itemContainer} onPress={onPress}>
      <View style={createStyles(colors).itemLeft}>
        <View style={[createStyles(colors).iconWrapper, isSpecialItem && createStyles(colors).specialIconWrapper]}>
          <Ionicons name={icon} size={24} color={isSpecialItem ? colors.textSecondary : colors.text} />
        </View>
        <View style={createStyles(colors).textContainer}>
          <Text style={createStyles(colors).titleText}>{title}</Text>
          {subtitle && <Text style={createStyles(colors).subtitleText}>{subtitle}</Text>}
        </View>
      </View>
      <View style={createStyles(colors).itemRight}>
        {/* {showIndicator && (
          <View style={createStyles(colors).indicatorContainer}>
            <Text style={createStyles(colors).indicatorText}>{indicatorCount}</Text>
          </View>
        )} */}
        <Ionicons name="chevron-forward" size={24} color={colors.text} />
      </View>
    </TouchableOpacity>
  );
};

const Setting = ({ navigation }) => {
  const { colors } = useTheme();
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');
  const [isThemeSheetVisible, setIsThemeSheetVisible] = useState(false);
  const [isLanguageSheetVisible, setIsLanguageSheetVisible] = useState(false);
  const { openSheet } = useBottomSheet();

  const router = useRouter()

  const handleThemeSelection = useCallback((selectedTheme) => {
    setTheme(selectedTheme);
    setIsThemeSheetVisible(false);
  }, []);

  const handleLanguageSelection = useCallback((selectedLanguage) => {
    setLanguage(selectedLanguage);
    setIsLanguageSheetVisible(false);
  }, []);

  // const handleNavigation = (screenName) => {
  //   if (navigation && navigation.navigate) {
  //     navigation.navigate(screenName);
  //   } else {
  //     console.log(`Navigating to ${screenName}`);
  //   }
  // };

  return (
    <>
      <Header
        title="Settings"
      />
      <View style={createStyles(colors).screenContainer}>
        <ScrollView contentContainerStyle={createStyles(colors).contentContainer}>
          <Text style={createStyles(colors).sectionHeader}>General</Text>
          <View style={createStyles(colors).section}>
            <SettingsItem
              icon="settings-outline"
              title="Theme"
              subtitle={theme.charAt(0).toUpperCase() + theme.slice(1)}
              onPress={() => openSheet('theme', {
                theme: {
                  selectedTheme: theme,
                  onSelectTheme: handleThemeSelection,
                },
              })}
              colors={colors}
            />
            {/* <SettingsItem
              icon="earth-outline"
              title="Select the interface language"
              subtitle={language}
              onPress={() => openSheet('language', {
                language: { selectedLanguage: language, onSelectLanguage: handleLanguageSelection }

              })}
              colors={colors}
            /> */}
            {/* <SettingsItem
              icon="notifications-outline"
              title="Notification"
              // onPress={}
              colors={colors}
            /> */}
          </View>

          <Text style={createStyles(colors).sectionHeader}>About</Text>

          <View style={createStyles(colors).section}>
            <SettingsItem
              icon="information-circle-outline"
              title="About SIMAD University"
              onPress={() => router.push("(screens)/aboutSimad")}
              colors={colors}
            />
            <SettingsItem
              icon="code-slash-outline"
              title="About developers Team"
              onPress={() => router.push("(screens)/aboutTeam")}
              colors={colors}
            />
          </View>

          <Text style={createStyles(colors).sectionHeader}>Support</Text>

          <View style={createStyles(colors).section}>
            <SettingsItem
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => router.push("../../contact")}
              colors={colors}
            />
            <SettingsItem
              icon="lock-closed-outline"
              title="Privacy Policy"
              // onPress={() => handleNavigation('PrivacyPolicy')}
              colors={colors}
            />
          </View>

          <Text style={createStyles(colors).sectionHeader}>Connect</Text>

          <View style={createStyles(colors).section}>
            <SettingsItem
              icon="share-outline"
              title="Share App"
              onPress={() => console.log('Share App')}
              colors={colors}
            />
            <SettingsItem
              icon="people-outline"
              title="Follow us"
              onPress={() => openSheet("follow-us")}
              colors={colors}
            />
          </View>

          <View style={createStyles(colors).appVersionContainer}>
            <Text style={createStyles(colors).appVersionText}>App Version 1.0.0</Text>
          </View>

        </ScrollView>




      </View>
    </>
  );
};

const createStyles = (colors = {}) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  specialIconWrapper: {
    backgroundColor: 'transparent',
  },
  textContainer: {
    marginLeft: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text || '#000',
  },
  subtitleText: {
    fontSize: 13,
    color: colors.textSecondary || '#888',
    marginTop: 2,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorContainer: {
    backgroundColor: colors.primary || '#007AFF',
    borderRadius: 12,
    minWidth: 24,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  indicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appVersionContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  appVersionText: {
    fontSize: 12,
    color: colors.textSecondary || '#888',
  },
});

export default Setting;