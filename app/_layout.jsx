import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaScreen from "../components/SafeAreaScreen"
import { ThemeProvider } from "@/hooks/usetheme";
import LayoutContent from "@/components/LayoutContent"

export default function RootLayout() {
  
  return (
    <ThemeProvider>
      <LayoutContent/>
    </ThemeProvider>
  );
}
