import { Spacing, Fonts } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { useThemeContext } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const { colors, isDark, toggleTheme } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>حسابي</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.profileSection}>
        <View style={[styles.avatar, {
          width: 104,
          height: 104,
          borderRadius: 52,
          borderWidth: 2,
          borderColor: colors.primary,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Spacing.three
        }]}>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: colors.surfaceVariant, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialSymbol name="person" size={48} color={colors.primary} />
          </View>
        </View>
        <Text style={styles.name}>أحمد محمد</Text>
        <Text style={styles.email}>ahmed@example.com</Text>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>نشاطي</Text>
        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/profile/appointments')}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="calendar-today" size={24} color={colors.primary} />
              <Text style={styles.actionText}>مواعيدي</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={colors.outline} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/profile/saved-articles')}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="bookmark" size={24} color={colors.primary} />
              <Text style={styles.actionText}>المقالات المحفوظة</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={colors.outline} />
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>الإعدادات</Text>
        <Card style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="notifications" size={24} color={colors.primary} />
              <Text style={styles.settingText}>الإشعارات</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.outlineVariant, true: colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="dark-mode" size={24} color={colors.primary} />
              <Text style={styles.settingText}>الوضع الليلي</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.outlineVariant, true: colors.primary }}
            />
          </View>
        </Card>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>مساعدة</Text>
        <Card style={styles.settingsCard}>
          <View style={styles.actionRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="help" size={24} color={colors.textSecondary} />
              <Text style={styles.actionText}>مركز المساعدة</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={colors.outline} />
          </View>
          <View style={styles.divider} />
          <View style={styles.actionRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="security" size={24} color={colors.textSecondary} />
              <Text style={styles.actionText}>الخصوصية والأمان</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={colors.outline} />
          </View>
        </Card>
      </View>

      <View style={styles.logoutSection}>
        <View style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color={colors.error} />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.two,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: colors.onSurface,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  name: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: colors.onSurface,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: colors.textSecondary,
  },
  settingsSection: {
    padding: Spacing.four,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: colors.textSecondary,
    marginBottom: Spacing.three,
    textAlign: 'right',
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.four,
  },
  actionRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.four,
  },
  settingInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.three,
  },
  settingText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: colors.onSurface,
  },
  actionText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    marginLeft: Spacing.six + Spacing.two,
  },
  logoutSection: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
    backgroundColor: colors.errorContainer,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: colors.onErrorContainer,
  },
});
