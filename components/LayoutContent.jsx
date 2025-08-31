import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaScreen from "../components/SafeAreaScreen"
import { StatusBar } from "react-native";
import useTheme from "@/hooks/usetheme";

export default function RootLayout() {
  const {colors} = useTheme();
  return (
    <SafeAreaProvider>
        <SafeAreaScreen>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(auth)"/>
          </Stack>
        </SafeAreaScreen>
        <StatusBar barStyle={colors.statusBarStyle}/>
    </SafeAreaProvider>
  );
}
