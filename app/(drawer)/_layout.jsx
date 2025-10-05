
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import CustomeDrawer from '../../components/CustomeDrawer';
import useTheme from '../../hooks/usetheme';

import { useNavigation } from '@react-navigation/native';

export default function Layout() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <Drawer
      drawerContent={CustomeDrawer}
      screenOptions={{
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,

        drawerStyle: {
          // Add top and bottom margins
          // marginTop: 10,
          // marginBottom: 10,
          // Add a background color to be visible behind the border radius
          backgroundColor: colors.bg,
          // Apply border radius to specific corners
          // borderTopRightRadius: 30,
          // borderBottomRightRadius: 30,
        },
        drawerContentContainerStyle: {
          backgroundColor: 'transparent',
        },
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.3)', // Optional: Adds a dimming effect
      }}
    >
      <Drawer.Screen name='(tabs)' options={{
        headerShown: false,
        title: "Home",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }} />
      <Drawer.Screen name='message' options={{
        headerShown: false,
        title: "Message",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="information-circle-outline" size={size} color={color} />
        ),
      }} />
      <Drawer.Screen name='schools' options={{
        headerShown: false,
        title: "Schools",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="bookmark-outline" size={size} color={color} />
        ),
      }} />
      <Drawer.Screen name='institutions' options={{
        headerShown: false,
        title: "Institutions",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="location-outline" size={size} color={color} />
        ),
      }} />
      <Drawer.Screen name='ocms' options={{
        headerShown: false,
        title: "OCMS",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }} />

      {/* <Drawer.Screen name='parent' options={{
        headerShown: false,
        // title: "Parent",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }} /> */}

      {/* <Drawer.Screen name='lecturer' options={{
        headerShown: false,
        title: "Lecturer",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }} /> */}
      
      <Drawer.Screen name='contact' options={{
        headerShown: false,
        title: "Contact",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="call-outline" size={size} color={color} />
        ),
      }} />

    </Drawer>
  );
}
