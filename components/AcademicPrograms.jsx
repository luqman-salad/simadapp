import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Undergratuate from './Undergratuate';
import ShowCase from './Showcase';
import useTheme from '../hooks/usetheme';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: colors.text,
        tabBarInActiveTintColor: colors.textMuted,
        // tabBarScrollEnabled: true,
        elevation: 0,
        shadowOpacity: 0,
        tabBarLabelStyle: { 
          fontSize: 14,
          fontWeight: 'bold'
          
        },
        tabBarIndicatorStyle: { 
          backgroundColor: colors.primary
          
        },
        tabBarStyle: { 
          backgroundColor: colors.bg,
          elevation: 0,
          shadowOffset: 0,
          shadowOpacity: 0,
        },
      }}
      >
        <Tab.Screen name="Undergratuate" component={Undergratuate} />
        <Tab.Screen name="Postgratuate" component={ShowCase} />
        <Tab.Screen name=" SIMAD OLearn" component={ShowCase} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ ensures tabs take full screen height
    backgroundColor: '#fff',
  },
});

export default MyTabs;
