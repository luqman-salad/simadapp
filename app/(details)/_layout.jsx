// (details)/_layout.jsx
import { Stack } from 'expo-router';

export default function DetailsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Details",
                    animation: 'slide_from_right',
                }}
            />
        </Stack>
    );
}