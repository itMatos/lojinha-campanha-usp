import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const { theme } = useMaterial3Theme();
    const [loaded] = useFonts({
        FontParaTexto: require('../assets/fonts/Comfortaa-Bold.ttf'),
        FontParaTitulo: require('../assets/fonts/MilkyNice.ttf'),
    });

    const paperTheme =
        colorScheme !== 'dark' ? { ...MD3DarkTheme, colors: theme.light } : { ...MD3LightTheme, colors: theme.light };

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <PaperProvider theme={paperTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </PaperProvider>
    );
}
