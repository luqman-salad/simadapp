import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LayoutContent from "../components/LayoutContent";
import { BottomSheetProvider } from '../context/BottomSheetContext';
import { ThemeProvider } from "../hooks/usetheme";
export default function RootLayout() {

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetProvider>
          <LayoutContent />
        </BottomSheetProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
