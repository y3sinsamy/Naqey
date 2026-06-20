import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

import { MOCK_DOCTORS } from '@/data/doctors';

const SPECIALTIES_LIST = ['علاج سلوكي معرفي', 'طب نفسي', 'إرشاد أسري', 'طب نفسي للأطفال', 'علاج الإدمان'];

type FilterState = {
  minPrice: string;
  maxPrice: string;
  minRating: number | null;
  availableToday: boolean;
  specialties: string[];
};

const defaultFilters: FilterState = {
  minPrice: '',
  maxPrice: '',
  minRating: null,
  availableToday: false,
  specialties: [],
};

export default function SearchScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState>(defaultFilters);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Local state for the modal before applying
  const [draftFilters, setDraftFilters] = useState<FilterState>(defaultFilters);

  // Debounced Loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // Simulate network/filter processing delay
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters]);

  // Filtering Logic
  const filteredDoctors = useMemo(() => {
    let result = MOCK_DOCTORS;

    // 1. Text Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
      );
    }

    // 2. Complex Filters
    if (activeFilters.minPrice !== '') {
      result = result.filter(d => d.price >= parseInt(activeFilters.minPrice, 10));
    }
    if (activeFilters.maxPrice !== '') {
      result = result.filter(d => d.price <= parseInt(activeFilters.maxPrice, 10));
    }
    if (activeFilters.minRating !== null) {
      result = result.filter(d => d.rating >= activeFilters.minRating!);
    }
    if (activeFilters.availableToday) {
      result = result.filter(d => d.availableToday);
    }
    if (activeFilters.specialties.length > 0) {
      result = result.filter(d => activeFilters.specialties.includes(d.specialty));
    }

    return result;
  }, [searchQuery, activeFilters]);

  // View active filters as chips
  const activeChips = useMemo(() => {
    const chips: { id: string, label: string, onRemove: () => void }[] = [];

    if (activeFilters.minPrice || activeFilters.maxPrice) {
      const min = activeFilters.minPrice || '0';
      const max = activeFilters.maxPrice || '∞';
      chips.push({
        id: 'price',
        label: `السعر: ${min} - ${max} ج.م`,
        onRemove: () => setActiveFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }))
      });
    }

    if (activeFilters.minRating) {
      chips.push({
        id: 'rating',
        label: `التقييم: +${activeFilters.minRating} نجوم`,
        onRemove: () => setActiveFilters(prev => ({ ...prev, minRating: null }))
      });
    }

    if (activeFilters.availableToday) {
      chips.push({
        id: 'available',
        label: 'متاح اليوم',
        onRemove: () => setActiveFilters(prev => ({ ...prev, availableToday: false }))
      });
    }

    activeFilters.specialties.forEach(spec => {
      chips.push({
        id: `spec_${spec}`,
        label: spec,
        onRemove: () => setActiveFilters(prev => ({
          ...prev,
          specialties: prev.specialties.filter(s => s !== spec)
        }))
      });
    });

    return chips;
  }, [activeFilters]);

  const openFilterModal = () => {
    setDraftFilters(activeFilters);
    setIsFilterModalVisible(true);
  };

  const applyFilters = () => {
    setActiveFilters(draftFilters);
    setIsFilterModalVisible(false);
  };

  const resetDraftFilters = () => {
    setDraftFilters(defaultFilters);
  };

  const toggleDraftSpecialty = (spec: string) => {
    setDraftFilters(prev => {
      const exists = prev.specialties.includes(spec);
      if (exists) {
        return { ...prev, specialties: prev.specialties.filter(s => s !== spec) };
      } else {
        return { ...prev, specialties: [...prev.specialties, spec] };
      }
    });
  };

  const renderDoctor = ({ item }: { item: typeof MOCK_DOCTORS[0] }) => (
    <Card style={styles.doctorCard} variant="elevated">
      <View style={styles.cardHeader}>
        <View style={styles.doctorAvatar}>
          <Image source={item.avatar} style={{ width: 64, height: 64, borderRadius: 32 }} contentFit="cover" />
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={14} color="#FFB400" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.priceLabel}>سعر الجلسة</Text>
          <Text style={styles.priceText}>{item.price} ج.م</Text>
        </View>
        <Button
          title="احجز الآن"
          size="small"
          onPress={() => router.push(`/doctors/${item.id}`)}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ابحث عن طبيب</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color={colors.outline} />
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث بالاسم أو التخصص..."
              placeholderTextColor={colors.outline}
              value={searchQuery}
              onChangeText={setSearchQuery}
              dir='rtl'
            />
          </View>
          <TouchableOpacity style={styles.filterIconButton} onPress={openFilterModal}>
            <MaterialIcons name="tune" size={24} color={colors.onSurface} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Viewer Chips Area */}
      {activeChips.length > 0 && (
        <View style={styles.viewerChipsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.viewerChipsContent}>
            {activeChips.map(chip => (
              <View key={chip.id} style={styles.viewerChip}>
                <TouchableOpacity onPress={chip.onRemove} style={styles.viewerChipClose}>
                  <MaterialIcons name="close" size={16} color={colors.onPrimaryContainer} />
                </TouchableOpacity>
                <Text style={styles.viewerChipText}>{chip.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Main Content */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>جاري التحديث...</Text>
        </View>
      ) : filteredDoctors.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="search-off" size={64} color={colors.surfaceVariant} />
          <Text style={styles.emptyTitle}>لا توجد نتائج</Text>
          <Text style={styles.emptySubtitle}>جرب تغيير كلمات البحث أو إزالة بعض الفلاتر</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDoctors}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom Sheet Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalDismissArea} onPress={() => setIsFilterModalVisible(false)} />
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.bottomSheet}>

            <View style={styles.bottomSheetHandle} />
            <View style={styles.bottomSheetHeader}>
              <TouchableOpacity onPress={resetDraftFilters}>
                <Text style={styles.resetText}>إعادة ضبط</Text>
              </TouchableOpacity>
              <Text style={styles.bottomSheetTitle}>الفلاتر المتقدمة</Text>
              <View style={{ width: 60 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.bottomSheetScroll}>

              {/* Price Range */}
              <Text style={styles.filterSectionTitle}>نطاق السعر (ج.م)</Text>
              <View style={styles.priceRow}>
                <View style={styles.priceInputWrapper}>
                  <Text style={styles.priceLabel}>من</Text>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    placeholder="الأقل"
                    placeholderTextColor={colors.outline}
                    value={draftFilters.minPrice}
                    onChangeText={val => setDraftFilters(prev => ({ ...prev, minPrice: val }))}
                  />
                </View>
                <Text style={styles.priceDash}>-</Text>
                <View style={styles.priceInputWrapper}>
                  <Text style={styles.priceLabel}>إلى</Text>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    placeholder="الأعلى"
                    placeholderTextColor={colors.outline}
                    value={draftFilters.maxPrice}
                    onChangeText={val => setDraftFilters(prev => ({ ...prev, maxPrice: val }))}
                  />
                </View>
              </View>

              {/* Rating */}
              <Text style={styles.filterSectionTitle}>الحد الأدنى للتقييم</Text>
              <View style={styles.ratingRow}>
                {[5, 4, 3].map(stars => {
                  const isActive = draftFilters.minRating === stars;
                  return (
                    <TouchableOpacity
                      key={stars}
                      style={[styles.ratingChip, isActive && styles.ratingChipActive]}
                      onPress={() => setDraftFilters(prev => ({ ...prev, minRating: isActive ? null : stars }))}
                    >
                      <MaterialIcons name="star" size={16} color={isActive ? colors.onPrimaryContainer : '#FFB400'} />
                      <Text style={[styles.ratingChipText, isActive && styles.ratingChipTextActive]}>+{stars}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Availability */}
              <View style={styles.switchRow}>
                <Text style={styles.filterSectionTitle}>متاح اليوم</Text>
                <Switch
                  value={draftFilters.availableToday}
                  onValueChange={val => setDraftFilters(prev => ({ ...prev, availableToday: val }))}
                  trackColor={{ false: colors.surfaceVariant, true: colors.primary }}
                  thumbColor={colors.onPrimary}
                />
              </View>

              {/* Specialties */}
              <Text style={styles.filterSectionTitle}>التخصص</Text>
              <View style={styles.specialtyChipsContainer}>
                {SPECIALTIES_LIST.map(spec => {
                  const isActive = draftFilters.specialties.includes(spec);
                  return (
                    <TouchableOpacity
                      key={spec}
                      style={[styles.specChip, isActive && styles.specChipActive]}
                      onPress={() => toggleDraftSpecialty(spec)}
                    >
                      <Text style={[styles.specChipText, isActive && styles.specChipTextActive]}>{spec}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

            </ScrollView>

            <View style={styles.bottomSheetActions}>
              <Button title="تطبيق الفلاتر" onPress={applyFilters} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Spacing.two,
    padding: Spacing.four,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    marginBottom: Spacing.two,
    textAlign: 'right',
  },
  searchRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.three,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: Spacing.two,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: "right",
  },
  filterIconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  viewerChipsContainer: {
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
    backgroundColor: colors.surface,
  },
  viewerChipsContent: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
    flexDirection: 'row-reverse',
  },
  viewerChip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderRadius: 16,
    gap: Spacing.two,
  },
  viewerChipText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: colors.onPrimaryContainer,
  },
  viewerChipClose: {
    padding: 2,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: Spacing.three,
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.six,
  },
  emptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.onSurface,
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
  listContainer: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  doctorCard: {
    gap: Spacing.three,
    padding: Spacing.four,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.three,
  },
  doctorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  doctorName: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: colors.onSurface,
    marginBottom: 4,
  },
  specialty: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  ratingBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 180, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: '#FFB400',
  },
  cardFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant,
    paddingTop: Spacing.three,
    marginTop: Spacing.one,
  },
  priceLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 2,
    textAlign: 'right',
  },
  priceText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'right',
  },

  // Modal Bottom Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.outlineVariant,
    alignSelf: 'center',
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
  },
  bottomSheetHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  bottomSheetTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onSurface,
  },
  resetText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  bottomSheetScroll: {
    padding: Spacing.four,
  },
  filterSectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
    marginBottom: Spacing.three,
    marginTop: Spacing.four,
  },
  priceRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  priceInputWrapper: {
    flex: 1,
  },
  priceLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    marginBottom: 4,
  },
  priceInput: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    height: 48,
    fontFamily: Fonts.medium,
    color: colors.onSurface,
    textAlign: 'center',
  },
  priceDash: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.onSurfaceVariant,
    marginTop: 20,
  },
  ratingRow: {
    flexDirection: 'row-reverse',
    gap: Spacing.three,
  },
  ratingChip: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    paddingVertical: Spacing.two,
    backgroundColor: colors.surfaceContainerLowest,
  },
  ratingChipActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },
  ratingChipText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
  },
  ratingChipTextActive: {
    color: colors.onPrimaryContainer,
  },
  switchRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specialtyChipsContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  specChip: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: 8,
    backgroundColor: colors.surfaceContainerLowest,
  },
  specChipActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },
  specChipText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  specChipTextActive: {
    color: colors.onPrimaryContainer,
    fontFamily: Fonts.medium,
  },
  bottomSheetActions: {
    padding: Spacing.four,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant,
    backgroundColor: colors.surface,
  },
});
