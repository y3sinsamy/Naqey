import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';

// Mock Data
const NOTES_DATA = {
  doctorName: 'د. أحمد محمود',
  date: '2023-10-10',
  diagnosis: 'نوبة قلق خفيفة مع بعض أعراض التوتر الجسدي.',
  notes: 'المريض يظهر استجابة جيدة لتمارين التنفس. تم مناقشة بعض استراتيجيات التعامل مع ضغوط العمل وتأثيرها على جودة النوم.',
  prescriptions: [
    'ممارسة تمارين التنفس العميق (4-7-8) مرتين يومياً.',
    'تقليل استهلاك الكافيين بعد الساعة 4 مساءً.',
    'المشي لمدة 30 دقيقة يومياً.'
  ],
};

export default function NotesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>ملاحظات الطبيب</Text>
        <View style={{ width: 36 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Diagnosis Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="medical-information" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>التشخيص الأساسي</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.paragraphText}>{NOTES_DATA.diagnosis}</Text>
        </View>

        {/* Notes Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="edit-note" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>ملاحظات الجلسة</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.paragraphText}>{NOTES_DATA.notes}</Text>
        </View>

        {/* Prescription / Recommendations */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="list-alt" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>التوصيات الطبية</Text>
          </View>
          <View style={styles.divider} />
          {NOTES_DATA.prescriptions.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <Button 
          title={`حجز جلسة متابعة مع ${NOTES_DATA.doctorName}`} 
          onPress={() => router.push(`/doctors/${id}`)} // Redirects back to doctor's profile to book
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
    backgroundColor: colors.surface,
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
    paddingBottom: 100, // Space for bottom bar
    gap: Spacing.four,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.two,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    marginVertical: Spacing.three,
  },
  paragraphText: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: Spacing.three,
    gap: Spacing.three,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  listItemText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    lineHeight: 22,
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
