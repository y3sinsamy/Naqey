import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Ambient Background Elements */}
      <View style={[styles.blurOrb, styles.orbTopRight]} />
      <View style={[styles.blurOrb, styles.orbBottomLeft]} />

      <View style={styles.content}>
        {/* Brand Identity / Mark */}
        <View style={styles.logoContainer}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('@/assets/NaqeyIcon.png')}
              style={{ width: '90%', height: '80%' }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandName}>نقي</Text>
        </View>

        {/* Hero Typography */}
        <View style={styles.heroSection}>
          <Text style={styles.headline}>رحلة التعافي تبدأ بخطوة</Text>
          <Text style={styles.subtitle}>رحلة علاج آمنة وبسرية تامة</Text>
        </View>

        {/* Trust Indicators */}
        <View style={styles.trustIndicators}>
          <View style={styles.trustItem}>
            <MaterialSymbol name="shield_lock" size={14} color={colors.primary} />
            <Text style={styles.trustText}>خصوصية تامة</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.trustItem}>
            <MaterialSymbol name="verified_user" size={14} color={colors.primary} />
            <Text style={styles.trustText}>آمن وموثوق</Text>
          </View>
        </View>

        {/* Call to Action Section */}
        <View style={styles.actionSection}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.primaryButtonText}>ابدأ الآن</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.secondaryButtonText}>لدي حساب بالفعل</Text>
          </Pressable>
        </View>
      </View>

      {/* Footer Tagline */}
      <Text style={styles.footerText}>DESIGNED FOR SERENITY & RESILIENCE</Text>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blurOrb: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.4,
  },
  orbTopRight: {
    backgroundColor: colors.primaryContainer,
    width: 400,
    height: 400,
    top: -80,
    right: -80,
    // Add simple blur workaround for RN using opacity/size if true blur isn't easily cross-platform
  },
  orbBottomLeft: {
    backgroundColor: colors.secondaryContainer,
    width: 300,
    height: 300,
    bottom: -80,
    left: -80,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    backgroundColor: colors.background,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  brandName: {
    fontFamily: Fonts.medium,
    fontSize: 24,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: Spacing.three,
    width: '100%',
  },
  headline: {
    fontFamily: Fonts.semiBold,
    fontSize: 28,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: colors.outline,
    textAlign: 'center',
  },
  trustIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.base,
    marginBottom: Spacing.four,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: colors.outline,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: colors.outlineVariant,
    marginHorizontal: Spacing.three,
  },
  actionSection: {
    width: '100%',
    paddingTop: Spacing.four,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  primaryButtonText: {
    fontFamily: Fonts.medium,
    fontSize: 22,
    color: colors.onPrimary,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    marginTop: Spacing.three,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonPressed: {
    backgroundColor: colors.backgroundElement,
  },
  secondaryButtonText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: colors.outlineVariant,
    letterSpacing: 2,
    textAlign: 'center',
  },
});
