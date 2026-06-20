import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#111c2d', // on-surface
    background: '#f9f9ff', // background
    primary: '#006b5f',
    onPrimary: '#ffffff',
    primaryContainer: '#14b8a6',
    onPrimaryContainer: '#00423b',
    secondary: '#006591',
    onSecondary: '#ffffff',
    secondaryContainer: '#39b8fd',
    onSecondaryContainer: '#004666',
    tertiary: '#006e2f',
    onTertiary: '#ffffff',
    tertiaryContainer: '#0ebd57',
    onTertiaryContainer: '#00441a',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#93000a',
    outline: '#6c7a77',
    outlineVariant: '#bbcac6',
    surface: '#f9f9ff',
    onSurface: '#111c2d',
    surfaceVariant: '#d8e3fb',
    onSurfaceVariant: '#3c4947',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f6f9fc',
    surfaceContainer: '#eef2f9',
    surfaceContainerHigh: '#e5ebf5',
    surfaceContainerHighest: '#dce3f0',
    textSecondary: '#6c7a77', // outline
    backgroundElement: '#f0f3ff', // surface-container-low
    backgroundSelected: '#e7eeff', // surface-container
  },
  dark: {
    // Basic dark theme mapping (can be refined later)
    text: '#ffffff',
    background: '#111c2d',
    primary: '#4fdbc8',
    onPrimary: '#003730',
    primaryContainer: '#005048',
    onPrimaryContainer: '#71f8e4',
    secondary: '#89ceff',
    onSecondary: '#00344d',
    secondaryContainer: '#004c6e',
    onSecondaryContainer: '#c9e6ff',
    tertiary: '#4ae176',
    onTertiary: '#003915',
    tertiaryContainer: '#005321',
    onTertiaryContainer: '#6bff8f',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    outline: '#899390',
    outlineVariant: '#3f4947',
    surface: '#111c2d',
    onSurface: '#e1e3df',
    surfaceVariant: '#3f4947',
    onSurfaceVariant: '#bec9c6',
    surfaceContainerLowest: '#0d1521',
    surfaceContainerLow: '#111c2d',
    surfaceContainer: '#162235',
    surfaceContainerHigh: '#1c293f',
    surfaceContainerHighest: '#24324a',
    textSecondary: '#899390',
    backgroundElement: '#1b2636',
    backgroundSelected: '#263143',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  regular: 'IBMPlexSansArabic_400Regular',
  medium: 'IBMPlexSansArabic_500Medium',
  semiBold: 'IBMPlexSansArabic_600SemiBold',
  bold: 'IBMPlexSansArabic_700Bold',
};

export const Spacing = {
  half: 2,
  base: 8,
  one: 4,
  two: 8,
  three: 16, // gutter, stack-md
  four: 24, // stack-lg, container-padding-desktop
  five: 32,
  six: 40, // section-gap
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
