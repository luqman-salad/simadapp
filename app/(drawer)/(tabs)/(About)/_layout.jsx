import { Stack } from "expo-router";
import useAboutStore from "../../../../store/aboutStore";

export default function AboutLayout() {
  const { selectedAboutItem } = useAboutStore();
  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
