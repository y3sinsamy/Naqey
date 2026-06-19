import React from 'react';
import { StyleSheet, View, Text, ScrollView, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Spacing } from '@/constants/theme';

import { Card } from '@/components/ui/Card';
import { useThemeContext } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const { colors, isDark, toggleTheme } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>حسابي</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={48} color={colors.primary} />
        </View>
        <Text style={styles.name}>أحمد محمد</Text>
        <Text style={styles.email}>ahmed@example.com</Text>
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
    padding: Spacing.four,
    paddingTop: Spacing.six,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'right',
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
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  settingsSection: {
    padding: Spacing.four,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: Spacing.three,
    textAlign: 'right',
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.four,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.four,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  actionText: {
    fontSize: 16,
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
    fontWeight: '700',
    color: colors.onErrorContainer,
  },
});
