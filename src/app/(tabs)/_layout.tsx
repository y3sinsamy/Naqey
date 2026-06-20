import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

import { useThemeContext } from '@/hooks/use-theme';

export default function TabLayout() {
  const { theme, colors } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          elevation: 8,
          shadowColor: '#1e293b',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          height: 70,
          paddingHorizontal: Spacing.half,
          paddingBottom: 16,
          paddingTop: 8,
          flexDirection: 'row-reverse', // To support RTL navigation visual ordering
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="home" title="الرئيسية" colors={colors} />
          ),
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'الأطباء',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="medical_services" title="الأطباء" colors={colors} />
          ),
        }}
      />
      <Tabs.Screen
        name="recovery"
        options={{
          title: 'التعافي',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="rebase_edit" title="التعافي" colors={colors} />
          ),
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: 'المقالات',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="menu_book" title="المقالات" colors={colors} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'الرسائل',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="forum" title="الرسائل" colors={colors} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ focused, name, title, colors }: { focused: boolean; name: string; title: string; colors: typeof Colors.light }) {
  if (focused) {
    return (
      <View style={[styles.activeTabContainer, { backgroundColor: colors.primaryContainer }]}>
        <MaterialSymbol name={name} size={24} color={colors.onPrimaryContainer} fill={true} />
        <Text numberOfLines={1} style={[styles.activeTabText, { color: colors.onPrimaryContainer }]}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.inactiveTabContainer}>
      <MaterialSymbol name={name} size={24} color={colors.onSurfaceVariant} fill={false} />
      <Text numberOfLines={1} style={[styles.inactiveTabText, { color: colors.onSurfaceVariant }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activeTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  activeTabText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    marginTop: 2,
  },
  inactiveTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  inactiveTabText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    marginTop: 2,
  },
});
