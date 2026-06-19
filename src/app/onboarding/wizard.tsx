import React from 'react';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CategorySelectionStep from '@/components/onboarding/CategorySelectionStep';
import HowItWorksStep from '@/components/onboarding/HowItWorksStep';
import PrivacyAssuranceStep from '@/components/onboarding/PrivacyAssuranceStep';
import { MaterialSymbol } from '@/components/ui/MaterialSymbol';

const { width } = Dimensions.get('window');

export default function OnboardingWizard() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { component: <HowItWorksStep /> },
    { component: <PrivacyAssuranceStep /> },
    { component: <CategorySelectionStep /> },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation & Progress */}
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
            <MaterialSymbol name="arrow_forward" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>تخطي</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bars */}
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                index <= currentStep ? styles.progressBarActive : styles.progressBarInactive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Wizard Content Area */}
      <View style={styles.contentArea}>
        {steps[currentStep].component}
      </View>

      {/* Next/Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? 'إنهاء' : 'التالي'}
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  skipButton: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  skipText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.outline,
  },
  progressContainer: {
    flexDirection: 'row-reverse', // To align with RTL naturally
    justifyContent: 'space-between',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: colors.primary,
  },
  progressBarInactive: {
    backgroundColor: colors.surfaceVariant,
  },
  contentArea: {
    flex: 1,
  },
  footer: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
  },
  nextButton: {
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
  nextButtonText: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    color: colors.onPrimary,
  },
});
