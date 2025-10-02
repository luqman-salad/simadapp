import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import useTheme from "../../../hooks/usetheme";

export default function AuthLayout() {
    const { colors } = useTheme();
    return (
        <Tabs
            initialRouteName="(Home)"
            screenOptions={{
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: colors.success,
                tabBarStyle: {
                    backgroundColor: colors.bg,
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 80,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="(Home)"
                options={{
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ fontSize: 12, color: focused ? colors.primary : colors.success, fontWeight: focused ? 'bold' : 'normal' }}>
                            Home
                        </Text>
                    ),

                    tabBarIcon: ({ focused, size, color }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="(About)"
                options={{
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ fontSize: 12, color: focused ? colors.primary : colors.success, fontWeight: focused ? 'bold' : 'normal' }}>
                            About
                        </Text>
                    ),
                    tabBarIcon: ({ focused, size, color }) => (
                        <Ionicons
                            name={focused ? "information-circle" : "information-circle-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="(Updates)"
                options={{
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ fontSize: 12, color: focused ? colors.primary : colors.success, fontWeight: focused ? 'bold' : 'normal' }}>
                            Updates
                        </Text>
                    ),
                    tabBarIcon: ({ focused, size, color }) => (
                        <Ionicons
                            name={focused ? "timer" : "timer-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="(Settings)"
                options={{
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ fontSize: 12, color: focused ? colors.primary : colors.success, fontWeight: focused ? 'bold' : 'normal' }}>
                            Settings
                        </Text>
                    ),
                    tabBarIcon: ({ focused, size, color }) => (
                        <Ionicons
                            name={focused ? "settings" : "settings-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tabs>
    );
}
// import { Ionicons } from "@expo/vector-icons";
// import { Stack, Tabs } from "expo-router";
// import useTheme from "../../../hooks/usetheme"
// import { DrawerToggleButton } from "@react-navigation/drawer";


// export default function AuthLayout() {
//     const {colors} = useTheme();
//   return (
//     <Tabs
//         screenOptions={{
//             tabBarActiveTintColor: colors.secondary,
//             tabBarInactiveTintColor: colors.success,
//         }}
//     >
//         <Tabs.Screen 
//             name="(Home)"
//             options={{
//                 headerShown: false,
//                 title: "Home",
//                 tabBarIcon: ({size, color}) => (
//                     <Ionicons name="home-outline" size={size} color={color}/>
//                 )
//             }}
//         />
//         <Tabs.Screen 
//             name="(About)"
//             options={{
//                 headerShown: false,
//                 title: "About",
//                 tabBarIcon: ({size, color}) => (
//                     <Ionicons name="information-circle-outline" size={size} color={color}/>
//                 )
//             }}
//         />
//         <Tabs.Screen 
//             name="(Updates)"
//             options={{
//                 headerShown: false,
//                 title: "Updates",
//                 tabBarIcon: ({size, color}) => (
//                     <Ionicons name="timer-outline" size={size} color={color}/>
//                 )
//             }}
//         />
//         <Tabs.Screen 
//             name="(Settings)"
//             options={{
//                 headerShown: false,
//                 title: "Settings",
//                 tabBarIcon: ({size, color}) => (
//                     <Ionicons name="settings-outline" size={size} color={color}/>
//                 )
//             }}
//         />
//     </Tabs>
//   );
// }
