import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

// Mock active chats
const CHATS = [
  {
    id: 'tafran',
    name: 'طفران',
    specialty: 'مساعدك الذكي',
    avatar: null,
    isBot: true,
    lastMessage: 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
    time: 'الآن',
    unread: 1,
    pinned: true,
  },
  {
    id: '1',
    name: 'د. سارة خالد',
    specialty: 'استشاري علاج الإدمان',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    isBot: false,
    lastMessage: 'دعنا نناقش ذلك في الجلسة القادمة.',
    time: 'أمس',
    unread: 0,
    pinned: false,
  },
];

export default function ChatsListScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  const handlePress = (item: typeof CHATS[0]) => {
    if (item.isBot) {
      router.push('/chat/tafran');
    } else {
      router.push(`/chat/doctor/${item.id}`);
    }
  };

  const renderItem = ({ item }: { item: typeof CHATS[0] }) => (
    <TouchableOpacity
      style={[styles.chatItem, item.pinned && styles.pinnedItem]}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        {item.isBot ? (
          <View style={[styles.avatar, styles.botAvatar]}>
            <MaterialIcons name="smart-toy" size={28} color={colors.onPrimary} />
          </View>
        ) : (
          <Image source={item.avatar} style={styles.avatar} />
        )}
        {item.isBot && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <View style={styles.nameRow}>
            {item.pinned && <MaterialCommunityIcons name="pin" size={16} color={colors.onSurfaceVariant} style={styles.pinIcon} />}
            <Text style={styles.chatName}>{item.name}</Text>
          </View>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.headerTitle}>المحادثات</Text>
      </View>

      <FlatList
        data={CHATS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.onSurface,
  },
  listContent: {
    paddingTop: Spacing.two,
  },
  chatItem: {
    flexDirection: 'row-reverse',
    padding: Spacing.four,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  pinnedItem: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  avatarContainer: {
    marginLeft: Spacing.four,
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceVariant,
  },
  botAvatar: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  pinIcon: {
    marginLeft: 4,
  },
  chatName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: colors.onSurface,
  },
  chatTime: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  chatFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.four,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 6,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.onPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    marginRight: 88, // Avatar width + margins
  },
});
