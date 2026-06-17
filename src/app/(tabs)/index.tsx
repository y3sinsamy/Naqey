import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialSymbol name="menu" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>نقي</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialSymbol name="notifications" size={24} color={Colors.light.primary} />
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
            {/* Mock Circular Progress */}
            <View style={styles.circularProgressContainer}>
              <View style={styles.circularProgressOuter}>
                <View style={styles.circularProgressInner}>
                  <Text style={styles.progressValue}>12</Text>
                  <Text style={styles.progressUnit}>يوماً</Text>
                </View>
              </View>
            </View>

            {/* Tracker Info */}
            <View style={styles.trackerInfo}>
              <Text style={styles.trackerTitle}>رحلة التعافي</Text>
              <Text style={styles.trackerDescription}>لقد أكملت 13% من هدف الـ 90 يوماً. استمر في التقدم!</Text>

              <TouchableOpacity style={styles.moodButton}>
                <MaterialSymbol name="mood" size={20} color={Colors.light.onPrimaryContainer} fill={true} />
                <Text style={styles.moodButtonText}>تقييم الحالة المزاجية</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Grid of Quick Actions */}
        <View style={styles.actionsGrid}>
          <ActionCard icon="medical_services" label="ابحث عن طبيب" bg={Colors.light.secondaryFixed} iconColor={Colors.light.onSecondaryFixedVariant} />
          <ActionCard icon="event_available" label="احجز جلسة" bg={Colors.light.tertiaryFixed} iconColor={Colors.light.onTertiaryFixedVariant} />
          <ActionCard icon="forum" label="تحدث مع طفران" bg={Colors.light.primaryFixed} iconColor={Colors.light.onPrimaryFixedVariant} />
          <ActionCard icon="menu_book" label="مقالات التعافي" bg="rgba(57, 184, 253, 0.2)" iconColor={Colors.light.secondary} />
        </View>

        {/* Recovery Tips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>نصائح التعافي</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>عرض الكل</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsScrollView} contentContainerStyle={styles.tipsContent}>
          <TipCard
            icon="lightbulb"
            badge="نصيحة اليوم"
            color={Colors.light.tertiary}
            bgColor="rgba(14, 189, 87, 0.1)"
            text="تجنب المحفزات البصرية في الصباح الباكر، استبدلها بتمارين التنفس العميق."
          />
          <TipCard
            icon="spa"
            badge="الصحة النفسية"
            color={Colors.light.secondary}
            bgColor="rgba(0, 101, 145, 0.1)"
            text="التأمل لمدة 5 دقائق يومياً يقلل من الرغبة الشديدة بنسبة تصل إلى 40%."
          />
          <TipCard
            icon="warning"
            badge="تنبيه"
            color={Colors.light.error}
            bgColor="rgba(186, 26, 26, 0.1)"
            text="عند الشعور بالضغط، اتصل بصديق أو معالج فوراً ولا تتردد."
          />
        </ScrollView>

        {/* Community Section */}
        <View style={styles.communityGrid}>
          <View style={[styles.communityCard, { backgroundColor: 'rgba(20, 184, 166, 0.1)' }]}>
            <Text style={styles.communityTitle}>مجموعات الدعم</Text>
            <Text style={styles.communitySubtitle}>انضم لآلاف المحاربين في رحلتهم.</Text>

            <View style={styles.avatarGroup}>
              {/* Mocking overlapping avatars using simple views for now */}
              <View style={[styles.avatarCircle, { zIndex: 3, right: 0 }]} />
              <View style={[styles.avatarCircle, { zIndex: 2, right: 20, backgroundColor: Colors.light.secondary }]} />
              <View style={[styles.avatarCircle, { zIndex: 1, right: 40, backgroundColor: Colors.light.tertiary }]} />
              <View style={[styles.avatarPlus, { right: 60 }]}>
                <Text style={styles.avatarPlusText}>+50</Text>
              </View>
            </View>
            <MaterialSymbol name="groups" size={80} color={Colors.light.primary} style={styles.bgIconLeft} />
          </View>

          <View style={[styles.communityCard, { backgroundColor: 'rgba(57, 184, 253, 0.1)', borderColor: 'rgba(57, 184, 253, 0.2)', borderWidth: 1 }]}>
            <View>
              <Text style={[styles.communityTitle, { color: Colors.light.onSecondaryContainer }]}>تحدي الأسبوع</Text>
              <Text style={[styles.communitySubtitle, { color: Colors.light.onSecondaryContainer }]}>أكمل 7 أيام بدون تواصل مع محفزات قديمة.</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
          </View>
        </View>

      </ScrollView>

      {/* FAB: AI Assistant */}
      <TouchableOpacity style={styles.fab}>
        <MaterialSymbol name="smart_toy" size={28} color={Colors.light.onPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ActionCard({ icon, label, bg, iconColor }: { icon: string, label: string, bg: string, iconColor: string }) {
  return (
    <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
      <View style={[styles.actionIconWrapper, { backgroundColor: bg }]}>
        <MaterialSymbol name={icon} size={24} color={iconColor} fill={true} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function TipCard({ icon, badge, color, bgColor, text }: { icon: string, badge: string, color: string, bgColor: string, text: string }) {
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    height: 64,
    backgroundColor: Colors.light.surface,
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
    color: Colors.light.primary,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
    paddingBottom: 100, // Make room for FAB and tab bar
  },
  greetingSection: {
    marginBottom: Spacing.four,
    alignItems: 'flex-end',
  },
  greetingTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    color: Colors.light.onSurface,
    marginBottom: 4,
    textAlign: 'left',
  },
  greetingSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    textAlign: 'left',
  },
  trackerCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
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
  circularProgressOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.surfaceContainerLow, // Fallback for pure CSS conic gradient
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: Colors.light.primary, // Simplified progress representation
  },
  circularProgressInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontFamily: Fonts.bold,
    fontSize: 36,
    color: Colors.light.primary,
    lineHeight: 42,
  },
  progressUnit: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.light.outline,
  },
  trackerInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  trackerTitle: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    color: Colors.light.onSurface,
    marginBottom: 4,
    textAlign: 'right',
  },
  trackerDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.three,
    textAlign: 'right',
    lineHeight: 20,
  },
  moodButton: {
    backgroundColor: Colors.light.primaryContainer,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moodButtonText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.light.onPrimaryContainer,
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
    backgroundColor: Colors.light.surfaceContainerLowest,
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
    color: Colors.light.onSurface,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.light.onSurface,
  },
  seeAllText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.light.primary,
  },
  tipsScrollView: {
    marginHorizontal: -Spacing.four,
    marginBottom: Spacing.five,
  },
  tipsContent: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  tipCard: {
    width: 260,
    backgroundColor: Colors.light.surfaceContainerLowest,
    padding: Spacing.four,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(187, 202, 198, 0.2)',
  },
  tipHeader: {
    flexDirection: 'row',
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
    color: Colors.light.onSurface,
    lineHeight: 22,
    textAlign: 'left',
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
    color: Colors.light.onPrimaryContainer,
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
    backgroundColor: Colors.light.primary,
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.light.surface,
  },
  avatarPlus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.light.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlusText: {
    color: Colors.light.onPrimary,
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
    backgroundColor: Colors.light.secondary,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 24, // RTL position left is bottom-start visually in LTR terms but left is left. Usually FAB is bottom-right or bottom-left depending on locale. The HTML said `left-6`.
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
