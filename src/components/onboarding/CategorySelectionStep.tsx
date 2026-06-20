import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CategorySelectionStep() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: 'porn', icon: 'visibility_off', title: 'إدمان الإباحية' },
    { id: 'social', icon: 'phishing', title: 'إدمان السوشيال ميديا' },
    { id: 'gaming', icon: 'sports_esports', title: 'إدمان الألعاب' },
    { id: 'eating', icon: 'restaurant', title: 'الأكل القهري' },
    { id: 'shopping', icon: 'shopping_bag', title: 'التسوق القهري' },
    { id: 'gambling', icon: 'casino', title: 'المقامرة' },
  ];

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headline}>ما الذي ترغب في التعافي منه؟</Text>
        <Text style={styles.subtitle}>
          اختر المجالات التي ترغب في البدء برحلة التغيير فيها. يمكنك اختيار أكثر من فئة.
        </Text>
      </View>

      {/* Identity Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>معلوماتك الأساسية</Text>
        <View style={styles.formRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>الاسم أو اللقب</Text>
            <TextInput style={styles.input} placeholder="مثال: نقـي" placeholderTextColor={colors.outlineVariant} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>العمر</Text>
            <TextInput style={styles.input} placeholder="مثال: 25" keyboardType="numeric" placeholderTextColor={colors.outlineVariant} />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>الجنس</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === 'male' && styles.genderButtonActive]}
              onPress={() => setSelectedGender('male')}
            >
              <Text style={[styles.genderText, selectedGender === 'male' && styles.genderTextActive]}>ذكر</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === 'female' && styles.genderButtonActive]}
              onPress={() => setSelectedGender('female')}
            >
              <Text style={[styles.genderText, selectedGender === 'female' && styles.genderTextActive]}>أنثى</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Categories Grid */}
      <View style={styles.categoriesGrid}>
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, isSelected && styles.categoryCardActive]}
              onPress={() => toggleCategory(category.id)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryIconWrapper}>
                <MaterialSymbol name={category.icon} size={28} color={colors.primary} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>

              {isSelected && (
                <View style={styles.checkIcon}>
                  <MaterialSymbol name="check_circle" size={20} color={colors.primary} fill={true} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
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
  },
  header: {
    marginBottom: Spacing.four,
    alignItems: 'flex-end',
  },
  headline: {
    fontFamily: Fonts.semiBold,
    fontSize: 28,
    color: colors.onSurface,
    marginBottom: Spacing.base,
    textAlign: 'right',
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    lineHeight: 24,
  },
  sectionContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.three,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(187, 202, 198, 0.3)',
    marginBottom: Spacing.four,
  },
  sectionTitle: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    color: colors.primary,
    marginBottom: Spacing.three,
    textAlign: 'right',
  },
  formRow: {
    flexDirection: 'row-reverse',
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  inputGroup: {
    flex: 1,
    marginBottom: Spacing.three,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: Spacing.base,
    textAlign: 'right',
  },
  input: {
    height: 56,
    backgroundColor: colors.backgroundElement,
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
  },
  genderRow: {
    flexDirection: 'row-reverse',
    gap: Spacing.three,
  },
  genderButton: {
    flex: 1,
    height: 56,
    backgroundColor: colors.backgroundElement,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  genderButtonActive: {
    backgroundColor: 'rgba(20, 184, 166, 0.05)', // primary with 5% opacity
    borderColor: colors.primary,
  },
  genderText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  genderTextActive: {
    color: colors.primary,
  },
  categoriesGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '47%',
    height: 160,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(187, 202, 198, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.three,
  },
  categoryCardActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(20, 184, 166, 0.05)',
  },
  categoryIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  categoryTitle: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
    textAlign: 'center',
  },
  checkIcon: {
    position: 'absolute',
    top: 12,
    right: 12, // Translates to top left conceptually in RTL
  },
});
