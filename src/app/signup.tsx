import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import { Colors, Spacing, Fonts } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';
import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { TouchableOpacity } from 'react-native';

export default function SignupScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace({ pathname: '/onboarding/wizard', params: { name } });
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
            <Text style={styles.title}>إنشاء حساب جديد</Text>
            <Text style={styles.subtitle}>انضم إلى مساحتك الآمنة في نقي</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>الاسم</Text>
              <TextInput
                style={styles.input}
                placeholder="الاسم الكريم"
                placeholderTextColor={colors.outline}
                value={name}
                onChangeText={setName}
                textAlign="right"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>البريد الإلكتروني</Text>
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor={colors.outline}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                textAlign="right"
              />
            </View>

            <Button 
              title="إنشاء حساب" 
              size="large" 
              loading={loading}
              onPress={handleSignup}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>لديك حساب بالفعل؟ </Text>
            <Button 
              title="تسجيل الدخول" 
              variant="text" 
              onPress={() => router.replace('/login')} 
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
    fontFamily: Fonts.bold,
    color: colors.onSurface,
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: colors.onSurfaceVariant,
  },
  form: {
    gap: Spacing.three,
  },
  inputContainer: {
    gap: Spacing.one,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: colors.onSurface,
    textAlign: 'right',
  },
  input: {
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: Spacing.four,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  submitButton: {
    marginTop: Spacing.two,
  },
  footer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.six,
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.onSurfaceVariant,
  },
});
