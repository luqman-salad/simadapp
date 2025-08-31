import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import useTheme from "../../hooks/usetheme"

export default function AuthLayout() {
    const {colors} = useTheme();
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.success,
        }}
    >
        <Tabs.Screen 
            name="(Home)"
            options={{
                headerShown: false,
                title: "Home",
                tabBarIcon: ({size, color}) => (
                    <Ionicons name="home-outline" size={size} color={color}/>
                )
            }}
        />
        <Tabs.Screen 
            name="(About)"
            options={{
                headerShown: false,
                title: "About",
                tabBarIcon: ({size, color}) => (
                    <Ionicons name="information-circle-outline" size={size} color={color}/>
                )
            }}
        />
        <Tabs.Screen 
            name="(Updates)"
            options={{
                headerShown: false,
                title: "Updates",
                tabBarIcon: ({size, color}) => (
                    <Ionicons name="timer-outline" size={size} color={color}/>
                )
            }}
        />
        <Tabs.Screen 
            name="(Settings)"
            options={{
                headerShown: false,
                title: "Settings",
                tabBarIcon: ({size, color}) => (
                    <Ionicons name="settings-outline" size={size} color={color}/>
                )
            }}
        />
    </Tabs>
  );
}
