import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  const currentDays = 12;
  const targetDays = 90;
  const radius = 54;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = currentDays / targetDays;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.iconButton, { borderWidth: 2, borderColor: colors.primary }]}
          onPress={() => router.push('/profile')}
        >
          <Image
            source="https://i.pravatar.cc/150?img=11"
            style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceVariant }}
          />
        </TouchableOpacity>
        <Image source={require('@/assets/NaqeyLogo.png')} style={{ width: 32 * 1080 / 407, height: 32 }} />
        <TouchableOpacity style={styles.iconButton}>
          <MaterialSymbol name="notifications" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>أهلاً بك، أحمد</Text>
          <Text style={styles.greetingSubtitle}>خطوة جديدة نحو حياة أكثر نقاءً اليوم.</Text>
        </View>

        {/* Hero: Recovery Tracker */}
        <View style={styles.trackerCard}>
          <View style={styles.trackerContent}>
            {/* Circular Progress */}
            <View style={styles.circularProgressContainer}>
              <Svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle cx="60" cy="60" r={radius} stroke={colors.surfaceContainerLow} strokeWidth={strokeWidth} fill="none" />
                <Circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke={colors.primary}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  fill="none"
                  strokeLinecap="round"
                />
              </Svg>
              <View style={[StyleSheet.absoluteFill, styles.circularProgressInner]}>
                <Text style={styles.progressValue}>{currentDays}</Text>
                <Text style={styles.progressUnit}>يوماً</Text>
              </View>
            </View>

            {/* Tracker Info */}
            <View style={styles.trackerInfo}>
              <Text style={styles.trackerTitle}>رحلة التعافي</Text>
              <Text style={styles.trackerDescription}>لقد أكملت 13% من هدف الـ 90 يوماً. استمر في التقدم!</Text>

              <TouchableOpacity style={styles.moodButton} onPress={() => router.navigate('/recovery')}>
                <MaterialSymbol name="mood" size={20} color={colors.onPrimaryContainer} fill={true} />
                <Text style={styles.moodButtonText} numberOfLines={1}>تقييم الحالة المزاجية</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Grid of Quick Actions */}
        <View style={styles.actionsGrid}>
          <ActionCard icon="edit_note" label="دوّن يومياتك" bg={colors.primary + '55'} iconColor={colors.primary} onPress={() => router.push('/recovery/journal/new')} />
          <ActionCard icon="event_available" label="احجز جلسة" bg={colors.secondary + '55'} iconColor={colors.secondary} onPress={() => router.navigate('/doctors')} />
          <ActionCard icon="forum" label="الرسائل" bg={colors.tertiary + '55'} iconColor={colors.tertiary} onPress={() => router.push('/chat')} />
          <ActionCard icon="menu_book" label="مقالات التعافي" bg={colors.primaryContainer + '55'} iconColor={colors.onPrimaryContainer} onPress={() => router.navigate('/articles')} />
        </View>

        {/* Recovery Tips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>نصائح التعافي</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsScrollView} contentContainerStyle={styles.tipsContent}>
          <TipCard
            icon="lightbulb"
            badge="نصيحة اليوم"
            color={colors.tertiary}
            bgColor="rgba(14, 189, 87, 0.1)"
            text="تجنب المحفزات البصرية في الصباح الباكر، استبدلها بتمارين التنفس العميق."
          />
          <TipCard
            icon="spa"
            badge="الصحة النفسية"
            color={colors.secondary}
            bgColor="rgba(0, 101, 145, 0.1)"
            text="التأمل لمدة 5 دقائق يومياً يقلل من الرغبة الشديدة بنسبة تصل إلى 40%."
          />
          <TipCard
            icon="warning"
            badge="تنبيه"
            color={colors.error}
            bgColor="rgba(186, 26, 26, 0.1)"
            text="عند الشعور بالضغط، اتصل بصديق أو معالج فوراً ولا تتردد."
          />
        </ScrollView>

        {/* My Sessions Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>مواعيدي</Text>
        </View>
        <TouchableOpacity
          style={[styles.trackerCard, { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.three }]}
          onPress={() => router.push('/profile/appointments')}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: Spacing.three }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialSymbol name="event_upcoming" size={24} color={colors.onPrimaryContainer} fill={true} />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: Fonts.semiBold, fontSize: 16, color: colors.onSurface, marginBottom: 2 }}>الجلسات القادمة</Text>
              <Text style={{ fontFamily: Fonts.regular, fontSize: 13, color: colors.onSurfaceVariant }}>تحقق من مواعيد جلساتك مع الأطباء</Text>
            </View>
          </View>
          <MaterialSymbol name="chevron_left" size={24} color={colors.outline} />
        </TouchableOpacity>

      </ScrollView>

      {/* FAB: AI Assistant */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/chat/tafran')}>
        <MaterialSymbol name="smart_toy" size={28} color={colors.onPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ActionCard({ icon, label, bg, iconColor, onPress }: { icon: string, label: string, bg: string, iconColor: string, onPress?: () => void }) {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <TouchableOpacity style={styles.actionCard} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.actionIconWrapper, { backgroundColor: bg }]}>
        <MaterialSymbol name={icon} size={24} color={iconColor} fill={true} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function TipCard({ icon, badge, color, bgColor, text }: { icon: string, badge: string, color: string, bgColor: string, text: string }) {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <MaterialSymbol name={icon} size={20} color={color} fill={true} />
        <View style={[styles.tipBadge, { backgroundColor: bgColor }]}>
          <Text style={[styles.tipBadgeText, { color }]}>{badge}</Text>
        </View>
      </View>
      <Text style={styles.tipText}>{text}</Text>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    marginTop: Spacing.three,
    height: 64,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: colors.primary,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
  },
  greetingSection: {
    marginBottom: Spacing.four,
    alignItems: 'flex-end',
  },
  greetingTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    color: colors.onSurface,
    marginBottom: 4,
    textAlign: 'left',
  },
  greetingSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'left',
  },
  trackerCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: Spacing.four,
    marginBottom: Spacing.five,
    borderWidth: 1,
    borderColor: 'rgba(187, 202, 198, 0.3)',
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  trackerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  circularProgressContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontFamily: Fonts.bold,
    fontSize: 36,
    color: colors.primary,
    lineHeight: 42,
  },
  progressUnit: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.outline,
  },
  trackerInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  trackerTitle: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    color: colors.onSurface,
    marginBottom: 4,
    textAlign: 'right',
  },
  trackerDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: Spacing.three,
    textAlign: 'right',
    lineHeight: 20,
  },
  moodButton: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  moodButtonText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.onPrimaryContainer,
    textAlign: 'center'
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.five,
    gap: Spacing.three,
  },
  actionCard: {
    width: '47%',
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.three,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(187, 202, 198, 0.2)',
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  actionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  actionLabel: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: colors.onSurface,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: colors.onSurface,
  },
  seeAllText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  tipsScrollView: {
    marginHorizontal: -Spacing.four,
    marginBottom: Spacing.five,
  },
  tipsContent: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    flexDirection: 'row-reverse',
  },
  tipCard: {
    width: 260,
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.four,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(187, 202, 198, 0.2)',
  },
  tipHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.two,
  },
  tipBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tipBadgeText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
  },
  tipText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 22,
    textAlign: 'right',
  },
  communityGrid: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  communityCard: {
    flex: 1,
    borderRadius: 24,
    padding: Spacing.four,
    height: 180,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  communityTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: colors.onPrimaryContainer,
    marginBottom: 4,
    textAlign: 'left',
  },
  communitySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: 'rgba(0, 66, 59, 0.8)',
    textAlign: 'left',
  },
  avatarGroup: {
    flexDirection: 'row',
    position: 'relative',
    height: 32,
    marginTop: Spacing.three,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  avatarPlus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlusText: {
    color: colors.onPrimary,
    fontSize: 10,
    fontFamily: Fonts.medium,
  },
  bgIconLeft: {
    position: 'absolute',
    bottom: -16,
    left: -16,
    opacity: 0.1,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.secondary,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
