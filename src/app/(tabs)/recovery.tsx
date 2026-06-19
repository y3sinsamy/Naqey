import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

export default function RecoveryScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>التعافي</Text>
      </View>
      
      <View style={styles.content}>
        <MaterialIcons name="construction" size={64} color={colors.primary} />
        <Text style={styles.title}>قريباً</Text>
        <Text style={styles.subtitle}>أدوات وموارد التعافي ستكون متاحة هنا قريباً.</Text>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: Spacing.four,
    paddingTop: Spacing.six,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.six,
    gap: Spacing.three,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    marginTop: Spacing.two,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
});
