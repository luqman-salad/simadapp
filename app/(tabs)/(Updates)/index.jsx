import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Events from '../../../components/Events';
import News from '../../../components/News';
import useTheme from '../../../hooks/usetheme';

const Tab = createMaterialTopTabNavigator();

function UpdatesTabs() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true, // This line was missing a comma after it
          tabBarActiveTintColor: colors.text,
          tabBarInActiveTintColor: colors.textMuted,
          elevation: 0,
          shadowOpacity: 0,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
          },
          tabBarStyle: {
            backgroundColor: colors.bg,
            elevation: 0,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
          },
        }}
      >
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="News" component={News} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default UpdatesTabs;