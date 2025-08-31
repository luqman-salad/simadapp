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
        tabBarActiveTintColor: colors.text,
        tabBarInActiveTintColor: colors.textMuted,
        // tabBarScrollEnabled: true,
        tabBarLabelStyle: { 
          fontSize: 14,
          
        },
        tabBarIndicatorStyle: { 
          backgroundColor: colors.primary
        },
        tabBarStyle: { 
          backgroundColor: colors.bg,
          elevation: 5,
          shadowOffset: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0.5,
          borderColor: colors.text
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
    backgroundColor: '#f8f8f8',
  },
});

export default MyTabs;
