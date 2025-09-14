import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaScreen from "../components/SafeAreaScreen"
import { StatusBar } from "react-native";
import useTheme from "@/hooks/usetheme";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const {colors} = useTheme();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
          <SafeAreaScreen>
              <Stack>
                <Stack.Screen name="(drawer)" 
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen name="(auth)"/>
                <Stack.Screen name="(screens)/SchoolInfoScreen"/>
                
              </Stack>
          </SafeAreaScreen>
          <StatusBar barStyle={colors.statusBarStyle}/>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
