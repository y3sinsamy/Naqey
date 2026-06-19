import React from 'react';
import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HowItWorksStep() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const steps = [
    {
      icon: 'person_search',
      title: '1. ابحث عن مختص',
      description: 'تصفح قائمتنا من الخبراء والاستشاريين المؤهلين في علاج الإدمان والتعافي السلوكي.',
    },
    {
      icon: 'event_available',
      title: '2. احجز جلسة',
      description: 'اختر الوقت المناسب لك بكل مرونة وقم بتأكيد موعدك الأول بضغطة زر واحدة.',
    },
    {
      icon: 'video_chat',
      title: '3. احضر جلسة الفيديو',
      description: 'تواصل مع مختصك عبر اتصال مرئي مشفر وآمن، يضمن لك أعلى معايير الخصوصية.',
    },
    {
      icon: 'assignment_turned_in',
      title: '4. اتبع خطة تعافيك',
      description: 'استلم خطة علاجية مخصصة وتابع تقدمك اليومي نحو حياة أكثر نقاءً واستقراراً.',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Animated Hero Visual Placeholder */}
      <View style={styles.heroVisual}>
        <Text style={styles.heroText}>Naqi</Text>
      </View>

      {/* Headline Section */}
      <View style={styles.headlineSection}>
        <Text style={styles.headline}>كيف تعمل المنصة</Text>
        <Text style={styles.subtitle}>
          رحلة تعافيك تبدأ بخطوات بسيطة وخصوصية تامة، مصممة بعناية لتناسب احتياجاتك.
        </Text>
      </View>

      {/* Steps List */}
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.iconContainer}>
              <MaterialSymbol name={step.icon} size={32} color={colors.primary} />
            </View>
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    alignItems: 'center',
  },
  heroVisual: {
    width: '100%',
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.four,
  },
  heroText: {
    fontFamily: Fonts.bold,
    fontSize: 48,
    color: 'rgba(0,0,0,0.1)',
  },
  headlineSection: {
    alignItems: 'center',
    marginBottom: Spacing.five,
    width: '100%',
  },
  headline: {
    fontFamily: Fonts.semiBold,
    fontSize: 28,
    color: colors.onSurface,
    marginBottom: Spacing.base,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
  stepsContainer: {
    width: '100%',
    gap: Spacing.three,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.four,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(187, 202, 198, 0.3)', // outline-variant with opacity
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(20, 184, 166, 0.1)', // primary-container with opacity
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.three, // actually left since we might do RTL layout, let's use marginEnd or just swap
    marginLeft: 16, // using marginLeft because of RTL context, the icon goes on the right side if RTL. React Native automatically flips if I18nManager.isRTL is true. Let's assume standard behavior for Arabic.
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 4,
    textAlign: 'left', // Keep default, let RTL handle it
  },
  stepDescription: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    textAlign: 'left',
  },
});
