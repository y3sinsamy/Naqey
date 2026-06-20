import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { MOCK_DOCTORS } from '@/data/doctors';

export default function BookingSummaryScreen() {
  const { doctorId, date, time } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId) || MOCK_DOCTORS[0];

  const tax = doctor.price * 0.15;
  const total = doctor.price + tax;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>تأكيد الحجز</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Appointment Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>تفاصيل الموعد</Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconTextRow}>
              <MaterialIcons name="person-outline" size={20} color={colors.primary} />
              <Text style={styles.label}>الطبيب:</Text>
            </View>
            <Text style={styles.value}>{doctor.name}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconTextRow}>
              <MaterialIcons name="calendar-today" size={20} color={colors.primary} />
              <Text style={styles.label}>التاريخ:</Text>
            </View>
            <Text style={styles.value} style={{ direction: 'ltr' }}>{date}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconTextRow}>
              <MaterialIcons name="access-time" size={20} color={colors.primary} />
              <Text style={styles.label}>الوقت:</Text>
            </View>
            <Text style={styles.value}>{time}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconTextRow}>
              <MaterialIcons name="videocam" size={20} color={colors.primary} />
              <Text style={styles.label}>النوع:</Text>
            </View>
            <Text style={styles.value}>استشارة مرئية</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>طريقة الدفع</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentInfo}>
              <MaterialIcons name="credit-card" size={24} color={colors.primary} />
              <Text style={styles.paymentText}>البطاقة الائتمانية تنتهي بـ 4242</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Pricing Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>تفاصيل الدفع</Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.priceLabel}>سعر الجلسة</Text>
            <Text style={styles.priceValue}>{doctor.price} ج.م</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.priceLabel}>ضريبة القيمة المضافة (15%)</Text>
            <Text style={styles.priceValue}>{tax.toFixed(2)} ج.م</Text>
          </View>

          <View style={styles.totalDivider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>الإجمالي</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} ج.م</Text>
          </View>
        </View>

        <Text style={styles.termsText}>
          بإتمام الحجز، أنت توافق على شروط الخدمة وسياسة الإلغاء.
        </Text>

      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <Button
          title={`ادفع ${total.toFixed(2)} ج.م واحجز`}
          onPress={() => router.push('/booking/success')}
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
    gap: Spacing.four,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    marginVertical: Spacing.three,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  iconTextRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.two,
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  value: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
  },
  paymentMethod: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.three,
  },
  paymentText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
  },
  priceLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  priceValue: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
  },
  totalDivider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    borderStyle: 'dashed',
    marginVertical: Spacing.three,
  },
  totalLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
  },
  totalValue: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.primary,
  },
  termsText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: Spacing.four,
    lineHeight: 20,
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
