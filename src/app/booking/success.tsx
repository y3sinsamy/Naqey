import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';

const { width } = Dimensions.get('window');

export default function BookingSuccessScreen() {
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <MaterialIcons name="check-circle" size={80} color={colors.primary} />
          </View>
        </View>

        <Text style={styles.title}>تم تأكيد الحجز بنجاح!</Text>
        <Text style={styles.subtitle}>
          تم إرسال تفاصيل الموعد ورابط الدخول للجلسة إلى بريدك الإلكتروني ورقم هاتفك.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>استعد لجلستك</Text>
          <View style={styles.instructionItem}>
            <MaterialIcons name="signal-cellular-4-bar" size={20} color={colors.primary} />
            <Text style={styles.instructionText}>تأكد من استقرار اتصال الإنترنت</Text>
          </View>
          <View style={styles.instructionItem}>
            <MaterialIcons name="headset-mic" size={20} color={colors.primary} />
            <Text style={styles.instructionText}>استخدم سماعة للحصول على أفضل جودة للصوت وللحفاظ على خصوصيتك</Text>
          </View>
          <View style={styles.instructionItem}>
            <MaterialIcons name="notifications-active" size={20} color={colors.primary} />
            <Text style={styles.instructionText}>سنقوم بتذكيرك قبل الموعد بـ 15 دقيقة</Text>
          </View>
        </View>

      </View>

      <View style={styles.bottomBar}>
        <Button 
          title="العودة للرئيسية" 
          onPress={() => router.replace('/(tabs)/')}
          style={styles.primaryButton}
        />
        <Button 
          title="عرض المواعيد القادمة" 
          variant="outline"
          onPress={() => router.replace('/(tabs)/profile')} 
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  iconContainer: {
    marginBottom: Spacing.six,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    marginBottom: Spacing.three,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.eight,
    paddingHorizontal: Spacing.four,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
    marginBottom: Spacing.four,
  },
  instructionItem: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  instructionText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    lineHeight: 22,
  },
  bottomBar: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  primaryButton: {
    marginBottom: Spacing.two,
  },
});
