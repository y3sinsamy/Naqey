import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function PrivacyAssuranceStep() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const points = [
    { icon: 'person_pin', title: 'يسمح بالاسم المستعار' },
    { icon: 'encrypted', title: 'مدفوعات آمنة' },
    { icon: 'visibility_off', title: 'خصوصية الجلسات' },
    { icon: 'sticky_note_2', title: 'ملاحظات شخصية' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Hero Icon */}
      <View style={styles.heroSection}>
        <View style={styles.iconWrapper}>
          <MaterialSymbol name="shield_lock" size={48} color={colors.primary} fill={true} />
        </View>
      </View>

      {/* Headline */}
      <View style={styles.headlineSection}>
        <Text style={styles.headline}>خصوصيتك هي أولويتنا</Text>
        <Text style={styles.subtitle}>
          نحن نؤمن بأن الأمان هو الخطوة الأولى نحو التعافي المستدام والخصوصية المطلقة.
        </Text>
      </View>

      {/* Privacy Points Bento Grid */}
      <View style={styles.gridContainer}>
        {points.map((point, index) => (
          <View key={index} style={styles.privacyCard}>
            <View style={styles.cardIconWrapper}>
              <MaterialSymbol name={point.icon} size={28} fill={true} />
            </View>
            <Text style={styles.cardTitle}>{point.title}</Text>
          </View>
        ))}
      </View>

      {/* Trust Indicator */}
      <View style={styles.trustIndicator}>
        <View style={styles.trustIconWrapper}>
          <MaterialSymbol name="verified_user" size={24} color={colors.primary} />
        </View>
        <View style={styles.trustTextContainer}>
          <Text style={styles.trustLabel}>معايير أمنية</Text>
          <Text style={styles.trustDescription}>تشفير البيانات بمستوى عسكري (AES-256)</Text>
        </View>
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
    alignItems: 'center',
  },
  heroSection: {
    width: '100%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(20, 184, 166, 0.2)', // primary-container
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 107, 95, 0.1)', // primary
  },
  headlineSection: {
    alignItems: 'center',
    marginBottom: Spacing.four,
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
    maxWidth: 280,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Spacing.four,
  },
  privacyCard: {
    width: '48%', // Forces a perfect 2x2 grid
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.three,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: 'rgba(187, 202, 198, 0.3)',
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  cardTitle: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
    textAlign: 'center',
  },
  trustIndicator: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    padding: Spacing.three,
    borderRadius: 16,
    width: '100%',
  },
  trustIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustTextContainer: {
    flex: 1,
  },
  trustLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
    textAlign: 'right',
  },
  trustDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurface,
    textAlign: 'right',
  },
});
