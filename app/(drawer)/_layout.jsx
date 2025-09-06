
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import useTheme from '../../hooks/usetheme';
import CustomeDrawer from '../../components/CustomeDrawer';

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
        // headerLeft: () => (
        //     <Ionicons
        //       name="arrow-back"
        //       size={24}
        //       color="black"
        //       style={{ marginLeft: 20 }}
              
        //     />
        //   ),
        drawerStyle:{
          backgroundColor: colors.bg,
          top: 20,
          bottom: 20,
        }
      }}
    >
      <Drawer.Screen name='(tabs)' options={{
        headerShown: false,
        title: "Home",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
      }}/>
      <Drawer.Screen name='message' options={{
        // headerShown: false,
        title: "Message",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
      }}/>
      <Drawer.Screen name='schools' options={{
        // headerShown: false,
        title: "Schools",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
      }}/>
      <Drawer.Screen name='institutions' options={{
        // headerShown: false,
        title: "Institutions",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
      }}/>
      <Drawer.Screen name='events' options={{
        // headerShown: false,
        title: "Events",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
          ),
      }}/>
      <Drawer.Screen name='student' options={{
        // headerShown: false,
        title: "Student",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
      }}/>
      <Drawer.Screen name='parent' options={{
        // headerShown: false,
        title: "Parent",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
      }}/>
      <Drawer.Screen name='lecturer' options={{
        // headerShown: false,
        title: "Lecturer",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
      }}/>
      <Drawer.Screen name='contact' options={{
        // headerShown: false,
        title: "Contact",
        drawerIcon: ({ size, color }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
      }}/>
      
    </Drawer>
  );
}
