import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import { Colors, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';

export default function LoginScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)' as any);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>تسجيل الدخول</Text>
            <Text style={styles.subtitle}>أهلاً بك مجدداً في نقي</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>رقم الجوال</Text>
              <TextInput
                style={styles.input}
                placeholder="05X XXX XXXX"
                placeholderTextColor={colors.outline}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                textAlign="right"
              />
            </View>

            <Button 
              title="دخول" 
              size="large" 
              loading={loading}
              onPress={handleLogin}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>ليس لديك حساب؟ </Text>
            <Button 
              title="سجل الآن" 
              variant="text" 
              onPress={() => {}} 
              textStyle={{ fontSize: 14 }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.four,
    justifyContent: 'center',
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.five,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: Spacing.four,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurface,
    marginBottom: Spacing.two,
    textAlign: 'right',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  submitButton: {
    marginTop: Spacing.two,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.five,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
