import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function PrivacyAssuranceStep() {
  const points = [
    { icon: 'person_pin', title: 'يسمح بالاسم المستعار', colorBg: Colors.light.secondaryFixed, colorIcon: Colors.light.onSecondaryFixedVariant },
    { icon: 'encrypted', title: 'مدفوعات آمنة', colorBg: Colors.light.tertiaryFixed, colorIcon: Colors.light.onTertiaryFixedVariant },
    { icon: 'visibility_off', title: 'خصوصية الجلسات', colorBg: Colors.light.primaryFixed, colorIcon: Colors.light.onPrimaryFixedVariant },
    { icon: 'sticky_note_2', title: 'ملاحظات شخصية', colorBg: 'rgba(57, 184, 253, 0.2)', colorIcon: Colors.light.secondary }, // secondaryContainer with opacity
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Hero Icon */}
      <View style={styles.heroSection}>
        <View style={styles.iconWrapper}>
          <MaterialSymbol name="shield_lock" size={48} color={Colors.light.primary} fill={true} />
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
            <View style={[styles.cardIconWrapper, { backgroundColor: point.colorBg }]}>
              <MaterialSymbol name={point.icon} size={28} color={point.colorIcon} fill={true} />
            </View>
            <Text style={styles.cardTitle}>{point.title}</Text>
          </View>
        ))}
      </View>

      {/* Trust Indicator */}
      <View style={styles.trustIndicator}>
        <View style={styles.trustIconWrapper}>
          <MaterialSymbol name="verified_user" size={24} color={Colors.light.primary} />
        </View>
        <View style={styles.trustTextContainer}>
          <Text style={styles.trustLabel}>معايير أمنية</Text>
          <Text style={styles.trustDescription}>تشفير البيانات بمستوى عسكري (AES-256)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
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
    color: Colors.light.onSurface,
    marginBottom: Spacing.base,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
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
    width: (width - Spacing.four * 2 - Spacing.two) / 2, // 2 columns
    backgroundColor: Colors.light.surfaceContainerLowest,
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
    color: Colors.light.onSurface,
    textAlign: 'center',
  },
  trustIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surfaceContainer,
    padding: Spacing.three,
    borderRadius: 16,
    width: '100%',
    marginBottom: Spacing.four,
  },
  trustIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16, // RTL equivalent of margin-right
  },
  trustTextContainer: {
    flex: 1,
  },
  trustLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.light.outline,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
    textAlign: 'left',
  },
  trustDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.light.onSurface,
    textAlign: 'left',
  },
});
