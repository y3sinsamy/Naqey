import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

// Mock data until API is integrated
const DOCTOR_DETAILS = {
  id: '1',
  name: 'د. سارة خالد',
  specialty: 'علاج سلوكي معرفي',
  rating: 4.8,
  reviews: 124,
  price: 150,
  about: 'أخصائية نفسية متخصصة في العلاج السلوكي المعرفي (CBT) مع خبرة تتجاوز 10 سنوات في التعامل مع حالات القلق والتوتر الإدماني. تقدم الدعم بخطط علاجية مخصصة ومبنية على أسس علمية.',
  experience: '10 سنوات',
  patients: '+1,000',
  languages: ['العربية', 'الإنجليزية'],
};

export default function DoctorProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>الملف الشخصي للطبيب</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="favorite-border" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Profile Section */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={48} color={colors.primary} />
          </View>
          <Text style={styles.doctorName}>{DOCTOR_DETAILS.name}</Text>
          <Text style={styles.doctorSpecialty}>{DOCTOR_DETAILS.specialty}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.statIconWrapper}>
              <MaterialIcons name="star" size={20} color="#FFB400" />
            </View>
            <Text style={styles.statValue}>{DOCTOR_DETAILS.rating}</Text>
            <Text style={styles.statLabel}>{DOCTOR_DETAILS.reviews} تقييم</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <View style={styles.statIconWrapper}>
              <MaterialIcons name="work-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{DOCTOR_DETAILS.experience}</Text>
            <Text style={styles.statLabel}>الخبرة</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <View style={styles.statIconWrapper}>
              <MaterialIcons name="people-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{DOCTOR_DETAILS.patients}</Text>
            <Text style={styles.statLabel}>المرضى</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>نبذة عن الطبيب</Text>
          <Text style={styles.aboutText}>{DOCTOR_DETAILS.about}</Text>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اللغات المتحدثة</Text>
          <View style={styles.languagesRow}>
            {DOCTOR_DETAILS.languages.map((lang, index) => (
              <View key={index} style={styles.languageChip}>
                <Text style={styles.languageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews Snapshot (Placeholder) */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>التقييمات والآراء</Text>
            <Text style={styles.seeAllText}>عرض الكل</Text>
          </View>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>مريض مجهول</Text>
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <MaterialIcons key={s} name="star" size={14} color="#FFB400" />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>
              "الدكتورة سارة مستمعة جيدة وتضع خطط علاجية واضحة، شعرت بفرق كبير بعد ثالث جلسة."
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>سعر الجلسة</Text>
          <Text style={styles.priceText}>{DOCTOR_DETAILS.price} ج.م</Text>
        </View>
        <Button
          title="احجز جلسة"
          style={styles.bookButton}
          onPress={() => router.push(`/booking/time-slot?doctorId=${id}`)}
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
  appBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  iconButton: {
    padding: Spacing.one,
  },
  appBarTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: colors.onSurface,
  },
  scrollContent: {
    padding: Spacing.four,
    paddingBottom: 120, // Make room for sticky bottom bar
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  doctorName: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  statsRow: {
    flexDirection: 'row-reverse',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    padding: Spacing.four,
    marginBottom: Spacing.six,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.surfaceVariant,
  },
  section: {
    marginBottom: Spacing.six,
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: colors.onSurface,
    marginBottom: Spacing.three,
    textAlign: 'right',
  },
  aboutText: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  languagesRow: {
    flexDirection: 'row-reverse',
    gap: Spacing.two,
  },
  languageChip: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: Spacing.four,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  languageText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
  },
  sectionHeaderRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  seeAllText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  reviewCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.four,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  reviewHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  reviewerName: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: colors.onSurface,
  },
  ratingStars: {
    flexDirection: 'row-reverse',
    gap: 2,
  },
  reviewText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: Spacing.four,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: Spacing.four,
  },
  priceLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 2,
  },
  priceText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.primary,
  },
  bookButton: {
    flex: 1,
  },
});
