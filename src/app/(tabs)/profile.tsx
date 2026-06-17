import React from 'react';
import { StyleSheet, View, Text, ScrollView, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors, Spacing } from '@/constants/theme';
import { Card } from '@/components/ui/Card';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>حسابي</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={48} color={Colors.light.primary} />
        </View>
        <Text style={styles.name}>أحمد محمد</Text>
        <Text style={styles.email}>ahmed@example.com</Text>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>الإعدادات</Text>
        <Card style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="notifications" size={24} color={Colors.light.primary} />
              <Text style={styles.settingText}>الإشعارات</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.light.outlineVariant, true: Colors.light.primary }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="dark-mode" size={24} color={Colors.light.primary} />
              <Text style={styles.settingText}>الوضع الليلي</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: Colors.light.outlineVariant, true: Colors.light.primary }}
            />
          </View>
        </Card>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>مساعدة</Text>
        <Card style={styles.settingsCard}>
          <View style={styles.actionRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="help" size={24} color={Colors.light.textSecondary} />
              <Text style={styles.actionText}>مركز المساعدة</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={Colors.light.outline} />
          </View>
          <View style={styles.divider} />
          <View style={styles.actionRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="security" size={24} color={Colors.light.textSecondary} />
              <Text style={styles.actionText}>الخصوصية والأمان</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={Colors.light.outline} />
          </View>
        </Card>
      </View>

      <View style={styles.logoutSection}>
        <View style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color={Colors.light.error} />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </View>
      </View>
    </ScrollView>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
    backgroundColor: Colors.light.surface,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.light.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  settingsSection: {
    padding: Spacing.four,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.textSecondary,
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
    color: Colors.light.onSurface,
  },
  actionText: {
    fontSize: 16,
    color: Colors.light.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.surfaceVariant,
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
    backgroundColor: Colors.light.errorContainer,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.onErrorContainer,
  },
});
