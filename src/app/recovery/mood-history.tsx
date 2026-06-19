import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/Card';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { useRecoveryStore } from '@/store/useRecoveryStore';

export default function MoodHistoryScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  const { moodHistory } = useRecoveryStore();

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const isFirst = index === 0;
    const isLast = index === moodHistory.length - 1;

    const dateObj = new Date(item.createdAt);
    const timeStr = dateObj.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    const dateStr = dateObj.toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' });

    return (
      <View style={styles.timelineRow}>
        {/* Timeline Line & Dot */}
        <View style={styles.timelineGraphic}>
          <View style={[styles.timelineLine, isFirst && styles.timelineLineTopHidden]} />
          <View style={styles.timelineDot} />
          <View style={[styles.timelineLine, isLast && styles.timelineLineBottomHidden]} />
        </View>

        {/* Content Card */}
        <View style={styles.timelineContent}>
          <Card style={styles.moodCard}>
            <View style={styles.moodHeader}>
              <View style={styles.moodInfo}>
                {item.emojiUrl ? (
                  <Image source={{ uri: item.emojiUrl }} style={{ width: 32, height: 32 }} contentFit="contain" />
                ) : item.icon ? (
                  <MaterialIcons name={item.icon as any} size={32} color={colors.onSurface} />
                ) : (
                  <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
                )}
                <Text style={styles.moodLabel}>{item.label}</Text>
              </View>
              <View style={styles.timeInfo}>
                <Text style={styles.dateText}>{dateStr}</Text>
                <Text style={styles.timeText}>{timeStr}</Text>
              </View>
            </View>

            {item.note ? (
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{item.note}</Text>
              </View>
            ) : null}
          </Card>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>سجل المزاج</Text>
        <View style={{ width: 44 }} />
      </View>

      {moodHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="history" size={64} color={colors.surfaceVariant} />
          <Text style={styles.emptyTitle}>لا توجد سجلات بعد</Text>
          <Text style={styles.emptySubtitle}>قم بتسجيل حالتك المزاجية من لوحة التعافي لتبدأ في تتبع مشاعرك.</Text>
        </View>
      ) : (
        <FlatList
          data={moodHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.four,
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onSurface,
  },
  listContent: {
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
  },
  timelineRow: {
    flexDirection: 'row-reverse',
  },
  timelineGraphic: {
    width: 30,
    alignItems: 'center',
    marginRight: Spacing.four,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.surfaceVariant,
  },
  timelineLineTopHidden: {
    backgroundColor: 'transparent',
  },
  timelineLineBottomHidden: {
    backgroundColor: 'transparent',
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.primaryContainer,
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Spacing.six,
  },
  moodCard: {
    padding: Spacing.four,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  moodHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.two,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
  },
  timeInfo: {
    alignItems: 'flex-start', // Because row-reverse, flex-start goes to left physically
  },
  dateText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.primary,
  },
  timeText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  noteContainer: {
    marginTop: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant,
  },
  noteText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 22,
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.six,
  },
  emptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onSurface,
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  emptySubtitle: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
});
