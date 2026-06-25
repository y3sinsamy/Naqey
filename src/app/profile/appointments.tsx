import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

const MOCK_APPOINTMENTS = [
  {
    id: '1',
    doctorName: 'د. أحمد محمود',
    specialty: 'علاج سلوكي معرفي',
    date: '2023-10-15',
    time: '4:30 م',
    status: 'upcoming', // upcoming, completed, cancelled
  },
  {
    id: '2',
    doctorName: 'د. أحمد محمود',
    specialty: 'طب نفسي',
    date: '2023-10-10',
    time: '5:00 م',
    status: 'completed',
  },
];

export default function MyAppointmentsScreen() {
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'past'>('upcoming');

  const filteredAppointments = MOCK_APPOINTMENTS.filter(app => {
    if (activeTab === 'upcoming') return app.status === 'upcoming';
    return app.status === 'completed' || app.status === 'cancelled';
  });

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'قادم';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغى';
      default: return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return colors.primary;
      case 'completed': return colors.onSurfaceVariant;
      case 'cancelled': return colors.error;
      default: return colors.onSurfaceVariant;
    }
  };

  const renderAppointment = ({ item }: { item: typeof MOCK_APPOINTMENTS[0] }) => (
    <Card style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '1A' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <MaterialIcons name="calendar-today" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="access-time" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="videocam" size={16} color={colors.primary} />
          <Text style={styles.detailText}>استشارة مرئية</Text>
        </View>
      </View>

      {item.status === 'upcoming' ? (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`/call/preview/${item.id}`)}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>الدخول للجلسة</Text>
        </TouchableOpacity>
      ) : item.status === 'completed' ? (
        <View style={styles.completedActions}>
          <Button
            title="إعادة المشاهدة"
            style={styles.replayButton}
            onPress={() => router.push(`/profile/appointments/${item.id}/replay`)}
          />
          <Button
            title="ملاحظات الطبيب"
            variant="outline"
            style={styles.notesButton}
            onPress={() => router.push(`/profile/appointments/${item.id}/notes`)}
          />
        </View>
      ) : null}
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>مواعيدي</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            القادمة
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            السابقة
          </Text>
        </TouchableOpacity>
      </View>

      {filteredAppointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="event-busy" size={64} color={colors.surfaceVariant} />
          <Text style={styles.emptyText}>لا توجد مواعيد في هذه القائمة</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAppointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  tabsContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: colors.surface,
    paddingHorizontal: Spacing.four,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  activeTabText: {
    color: colors.primary,
    fontFamily: Fonts.bold,
  },
  listContainer: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  appointmentCard: {
    padding: Spacing.four,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  doctorInfo: {
    alignItems: 'flex-end',
  },
  doctorName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
    marginBottom: 2,
  },
  specialty: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    marginVertical: Spacing.three,
  },
  cardDetails: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: Spacing.four,
  },
  detailRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: colors.onSurface,
  },
  actionButton: {
    backgroundColor: colors.primaryContainer,
    paddingVertical: Spacing.three,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.onPrimaryContainer,
  },
  completedActions: {
    flexDirection: 'row-reverse',
    gap: Spacing.three,
  },
  replayButton: {
    flex: 1,
  },
  notesButton: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.six,
  },
  emptyText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    marginTop: Spacing.three,
  },
});
