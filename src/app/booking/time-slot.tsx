import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';

const DATES = [
  { day: 'اليوم', date: '15', fullDate: '2023-10-15' },
  { day: 'غداً', date: '16', fullDate: '2023-10-16' },
  { day: 'الأحد', date: '17', fullDate: '2023-10-17' },
  { day: 'الإثنين', date: '18', fullDate: '2023-10-18' },
  { day: 'الثلاثاء', date: '19', fullDate: '2023-10-19' },
  { day: 'الأربعاء', date: '20', fullDate: '2023-10-20' },
];

const TIME_SLOTS = [
  { time: '4:00 م', period: 'مساءً', available: true },
  { time: '4:30 م', period: 'مساءً', available: true },
  { time: '5:00 م', period: 'مساءً', available: false },
  { time: '5:30 م', period: 'مساءً', available: true },
  { time: '6:00 م', period: 'مساءً', available: true },
  { time: '6:30 م', period: 'مساءً', available: true },
  { time: '8:00 م', period: 'مساءً', available: true },
  { time: '8:30 م', period: 'مساءً', available: false },
];

export default function TimeSlotSelectionScreen() {
  const { doctorId } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [selectedDate, setSelectedDate] = useState(DATES[0].fullDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>اختيار الموعد</Text>
        <View style={{ width: 36 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Session Info Banner */}
        <View style={styles.infoBanner}>
          <MaterialIcons name="info-outline" size={24} color={colors.primary} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>مدة الجلسة: 45 دقيقة</Text>
            <Text style={styles.infoSubtitle}>يرجى التواجد في غرفة الانتظار قبل الموعد بـ 5 دقائق</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>أكتوبر 2023</Text>
            <MaterialIcons name="calendar-today" size={20} color={colors.onSurfaceVariant} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesList}>
            {DATES.map((d) => {
              const isSelected = selectedDate === d.fullDate;
              return (
                <TouchableOpacity
                  key={d.fullDate}
                  style={[styles.dateCard, isSelected && styles.dateCardActive]}
                  onPress={() => {
                    setSelectedDate(d.fullDate);
                    setSelectedTime(null);
                  }}
                >
                  <Text style={[styles.dayText, isSelected && styles.dateTextActive]}>{d.day}</Text>
                  <Text style={[styles.dateText, isSelected && styles.dateTextActive]}>{d.date}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الأوقات المتاحة</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((slot, idx) => {
              const isSelected = selectedTime === slot.time;
              return (
                <TouchableOpacity
                  key={idx}
                  disabled={!slot.available}
                  style={[
                    styles.timeSlot,
                    isSelected && styles.timeSlotActive,
                    !slot.available && styles.timeSlotDisabled,
                  ]}
                  onPress={() => setSelectedTime(slot.time)}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      isSelected && styles.timeSlotTextActive,
                      !slot.available && styles.timeSlotTextDisabled,
                    ]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <Button 
          title="التالي: تأكيد الحجز" 
          disabled={!selectedTime}
          onPress={() => router.push(`/booking/summary?doctorId=${doctorId}&date=${selectedDate}&time=${selectedTime}`)}
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
  content: {
    padding: Spacing.four,
    paddingBottom: 100,
  },
  infoBanner: {
    flexDirection: 'row-reverse',
    backgroundColor: colors.primaryContainer,
    padding: Spacing.four,
    borderRadius: 16,
    marginBottom: Spacing.six,
    alignItems: 'center',
    gap: Spacing.three,
  },
  infoTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: colors.onPrimaryContainer,
    marginBottom: 4,
  },
  infoSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.onPrimaryContainer,
    opacity: 0.8,
    textAlign: 'right',
  },
  section: {
    marginBottom: Spacing.six,
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: colors.onSurface,
    textAlign: 'right',
  },
  datesList: {
    gap: Spacing.three,
    flexDirection: 'row-reverse',
  },
  dateCard: {
    width: 64,
    height: 80,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  dateCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  dateText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onSurface,
  },
  dateTextActive: {
    color: colors.onPrimary,
  },
  timeGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  timeSlot: {
    width: '30%',
    paddingVertical: Spacing.three,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  timeSlotActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },
  timeSlotDisabled: {
    backgroundColor: colors.surfaceContainerHighest,
    borderColor: 'transparent',
  },
  timeSlotText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurface,
  },
  timeSlotTextActive: {
    color: colors.onPrimaryContainer,
    fontFamily: Fonts.bold,
  },
  timeSlotTextDisabled: {
    color: colors.onSurfaceVariant,
    opacity: 0.5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    padding: Spacing.four,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
});
