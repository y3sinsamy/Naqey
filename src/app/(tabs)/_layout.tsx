import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].surface,
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
            <TabIcon focused={focused} name="home" title="الرئيسية" theme={theme} />
          ),
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'الأطباء',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="medical_services" title="الأطباء" theme={theme} />
          ),
        }}
      />
      <Tabs.Screen
        name="recovery"
        options={{
          title: 'التعافي',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="rebase_edit" title="التعافي" theme={theme} />
          ),
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: 'المقالات',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="menu_book" title="المقالات" theme={theme} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'الملف الشخصي',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="person" title="الملف الشخصي" theme={theme} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ focused, name, title, theme }: { focused: boolean; name: string; title: string; theme: 'light' | 'dark' }) {
  if (focused) {
    return (
      <View style={[styles.activeTabContainer, { backgroundColor: Colors[theme].primaryContainer }]}>
        <MaterialSymbol name={name} size={24} color={Colors[theme].onPrimaryContainer} fill={true} />
        <Text style={[styles.activeTabText, { color: Colors[theme].onPrimaryContainer }]}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.inactiveTabContainer}>
      <MaterialSymbol name={name} size={24} color={Colors[theme].onSurfaceVariant} fill={false} />
      <Text style={[styles.inactiveTabText, { color: Colors[theme].onSurfaceVariant }]}>{title}</Text>
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
