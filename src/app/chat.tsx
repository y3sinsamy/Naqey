import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

export default function ChatScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>طفران (مساعدك الذكي)</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <MaterialIcons name="smart-toy" size={80} color={colors.primary} />
        <Text style={styles.title}>مرحباً، أنا طفران!</Text>
        <Text style={styles.subtitle}>أنا هنا للاستماع إليك ومساعدتك في أي وقت. (سيتم برمجة المحادثة لاحقاً)</Text>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.four,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onSurface,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.six,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    marginTop: Spacing.six,
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
});
