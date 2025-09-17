import useTheme from "@/hooks/usetheme";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaScreen from "../components/SafeAreaScreen";

export default function RootLayout() {
  const { colors } = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaScreen>
          <Stack>
            <Stack.Screen name="(drawer)"
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(screens)/SchoolInfoScreen"
              options={{
                // title: "Institutions Ara"
                headerShown: false

              }}
            />
            <Stack.Screen name="(screens)/institutionsInfo"
              options={{
                // title: "Institutions Ara"
                headerShown: false

              }}
            />


            <Stack.Screen name="(screens)/ProgramsInfoScreen"
              options={{
                headerShown: false

              }}
            />

            <Stack.Screen name="(screens)/studentPortalHomePage"
              options={{
                headerShown: false
                // title: "Student Portal"
              }}
            />
            <Stack.Screen name="(screens)/stdExams"
              options={{
                title: "Exams"
                // headerShown: false
              }}
            />
            <Stack.Screen name="(screens)/stdFinances"
              options={{
                title: "Finances"
                // headerShown: false
              }}
            />
            <Stack.Screen name="(screens)/stdSchechule"
              options={{
                title: "Schedule"
                // headerShown: false
              }}
            />
            <Stack.Screen name="(screens)/stdAttendence"
              options={{
                title: "Attendences"
                // headerShown: false
              }}
            />
            <Stack.Screen name="(screens)/stdResources"
              options={{
                title: "Resources"
                // headerShown: false
              }}
            />
            <Stack.Screen name="(screens)/stdSupport"
              options={{
                title: "Support"
                // headerShown: false
              }}
            />
            <Stack.Screen name="(screens)/stdNews"
              options={{
                title: "News"
                // headerShown: false
              }}
            />
            <Stack.Screen name="(screens)/stdProfile"
              options={{
                title: "Profile"
                // headerShown: false
              }}
            />

          </Stack>
        </SafeAreaScreen>
        <StatusBar barStyle={colors.statusBarStyle} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
