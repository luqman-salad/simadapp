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
                <Stack.Screen name="(screens)/institutionsInfo"
                  options={{
                    title: "Institutions Ara"
                  }}
                />
                <Stack.Screen name="(screens)/studentPortalHomePage"
                  options={{
                    title: "Student Portal"
                  }}
                />
                <Stack.Screen name="(screens)/stdExams"
                  options={{
                    title: "Exams"
                  }}
                />
                <Stack.Screen name="(screens)/stdFinances"
                  options={{
                    title: "Finances"
                  }}
                />
                <Stack.Screen name="(screens)/stdSchechule"
                  options={{
                    title: "Schedule"
                  }}
                />
                <Stack.Screen name="(screens)/stdAttendence"
                  options={{
                    title: "Attendences"
                  }}
                />
                <Stack.Screen name="(screens)/stdResources"
                  options={{
                    title: "Resources"
                  }}
                />
                <Stack.Screen name="(screens)/stdSupport"
                  options={{
                    title: "Support"
                  }}
                />
                <Stack.Screen name="(screens)/stdNews"
                  options={{
                    title: "News"
                  }}
                />
                <Stack.Screen name="(screens)/stdProfile"
                  options={{
                    title: "Profile"
                  }}
                />
                
              </Stack>
          </SafeAreaScreen>
          <StatusBar barStyle={colors.statusBarStyle}/>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
