import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors, Spacing } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MOCK_APPOINTMENTS = [
  { 
    id: '1', 
    doctor: 'د. سارة خالد', 
    specialty: 'علاج سلوكي معرفي', 
    date: 'اليوم، 10:00 صباحاً', 
    status: 'upcoming',
    type: 'فيديو'
  },
  { 
    id: '2', 
    doctor: 'د. أحمد محمود', 
    specialty: 'طب نفسي', 
    date: '15 مايو، 2:00 مساءً', 
    status: 'upcoming',
    type: 'حضوري'
  },
  { 
    id: '3', 
    doctor: 'د. نورة سعد', 
    specialty: 'إرشاد أسري', 
    date: '1 مايو، 4:00 مساءً', 
    status: 'completed',
    type: 'صوتي'
  },
];

export default function AppointmentsScreen() {
  const renderAppointment = ({ item }: { item: typeof MOCK_APPOINTMENTS[0] }) => {
    const isUpcoming = item.status === 'upcoming';
    
    return (
      <Card style={[styles.card, !isUpcoming && styles.cardCompleted]}>
        <View style={styles.cardHeader}>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{item.doctor}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
          </View>
          <View style={[styles.statusBadge, isUpcoming ? styles.badgeUpcoming : styles.badgeCompleted]}>
            <Text style={[styles.statusText, isUpcoming ? styles.textUpcoming : styles.textCompleted]}>
              {isUpcoming ? 'قادم' : 'مكتمل'}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={16} color={Colors.light.textSecondary} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons 
              name={item.type === 'فيديو' ? 'videocam' : item.type === 'صوتي' ? 'call' : 'person'} 
              size={16} 
              color={Colors.light.textSecondary} 
            />
            <Text style={styles.detailText}>جلسة {item.type}</Text>
          </View>
        </View>

        {isUpcoming && (
          <View style={styles.actions}>
            <Button title="انضم للجلسة" style={styles.joinButton} />
            <Button title="إلغاء الموعد" variant="outline" style={styles.cancelButton} />
          </View>
        )}
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>مواعيدي</Text>
      </View>

      <FlatList
        data={MOCK_APPOINTMENTS}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: Spacing.four,
    paddingTop: Spacing.six,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.surfaceVariant,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.onSurface,
    textAlign: 'right',
  },
  listContainer: {
    padding: Spacing.four,
    gap: Spacing.three,
  },
  card: {
    gap: Spacing.three,
  },
  cardCompleted: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeUpcoming: {
    backgroundColor: Colors.light.primaryContainer,
  },
  badgeCompleted: {
    backgroundColor: Colors.light.surfaceVariant,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textUpcoming: {
    color: Colors.light.onPrimaryContainer,
  },
  textCompleted: {
    color: Colors.light.onSurfaceVariant,
  },
  detailsContainer: {
    gap: Spacing.one,
    backgroundColor: Colors.light.backgroundElement,
    padding: Spacing.three,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  detailText: {
    fontSize: 14,
    color: Colors.light.onSurface,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  joinButton: {
    flex: 2,
  },
  cancelButton: {
    flex: 1,
  },
});
