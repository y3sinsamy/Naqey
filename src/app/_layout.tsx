import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider as ExpoThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import 'react-native-reanimated';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { ThemeProvider, useThemeContext } from '@/hooks/use-theme';

import {
  IBMPlexSansArabic_400Regular,
  IBMPlexSansArabic_500Medium,
  IBMPlexSansArabic_600SemiBold,
  IBMPlexSansArabic_700Bold,
} from '@expo-google-fonts/ibm-plex-sans-arabic';
import { MaterialSymbolsOutlined_400Regular } from '@expo-google-fonts/material-symbols-outlined';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    IBMPlexSansArabic_400Regular,
    IBMPlexSansArabic_500Medium,
    IBMPlexSansArabic_600SemiBold,
    IBMPlexSansArabic_700Bold,
    MaterialSymbolsOutlined_400Regular,
    'MaterialSymbolsOutlined-Variable': require('@/assets/fonts/MaterialSymbolsOutlined-Variable.ttf'),
    'MaterialSymbolsOutlined-Filled': require('@/assets/fonts/MaterialSymbolsOutlined-Filled.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, colors } = useThemeContext();
  return (
    <ExpoThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, backgroundColor: colors.surfaceContainerHighest }}>
        <View style={{ flex: 1, width: '100%', maxWidth: 440, alignSelf: 'center', backgroundColor: colors.background, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <AnimatedSplashOverlay />
        </View>
      </View>
    </ExpoThemeProvider>
  );
}
