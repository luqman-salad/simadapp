import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PartnerBottomSheet from '../components/PartnerBottomSheet';
import ProgramsBottomSheet from '../components/ProgramsBottomSheet';

import SafeAreaScreen from "../components/SafeAreaScreen";
import { useBottomSheet } from '../context/BottomSheetContext';
import useTheme from "../hooks/usetheme";
import useInstitutionsStore from "../store/institutionsStore";
export default function RootLayout() {
  const { colors } = useTheme();
  const { selectedInstitutionTitle } = useInstitutionsStore();
  const { isSheetVisible, closeSheet, content, sheetType } = useBottomSheet();
  return (

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
              title: selectedInstitutionTitle,
              headerShown: false

            }}
          />

          <Stack.Screen name="(screens)/ParternshipInfoScreen"
            options={{
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
      {sheetType === 'programs' && (
        <ProgramsBottomSheet
          visible={isSheetVisible}
          onClose={closeSheet}
          programsData={content}
        />
      )}

      {sheetType === 'partner' && (
        <PartnerBottomSheet
          visible={isSheetVisible}
          onClose={closeSheet}
          partner={content}
        />
      )}
    </SafeAreaProvider>

  );
}
