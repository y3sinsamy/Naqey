import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { Card } from '@/components/ui/Card';

const MOCK_SAVED_ARTICLES = [
  {
    id: '1',
    title: 'كيف تتعامل مع نوبات القلق المفاجئة في العمل؟',
    category: 'القلق',
    readTime: '5 دقائق',
    image: 'https://images.unsplash.com/photo-1542662803-2f01b9f541db?q=80&w=870&auto=format&fit=crop',
    isSaved: true,
  },
];

export default function SavedArticlesScreen() {
  const { colors } = useThemeContext();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  const renderHeader = () => (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
      </TouchableOpacity>
      <Text style={styles.screenTitle}>المقالات المحفوظة</Text>
      <View style={{ width: 44 }} />
    </View>
  );

  const renderArticle = ({ item }: { item: typeof MOCK_SAVED_ARTICLES[0] }) => (
    <TouchableOpacity onPress={() => router.push(`/articles/${item.id}`)} activeOpacity={0.8}>
      <Card style={styles.articleCard}>
        <Image source={{ uri: item.image }} style={styles.articleImage} />
        <View style={styles.articleContent}>
          <View style={styles.articleMeta}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <TouchableOpacity style={styles.saveButton}>
              <MaterialIcons 
                name={item.isSaved ? "bookmark" : "bookmark-outline"} 
                size={22} 
                color={item.isSaved ? colors.primary : colors.onSurfaceVariant} 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.articleFooter}>
            <MaterialIcons name="schedule" size={14} color={colors.onSurfaceVariant} />
            <Text style={styles.readTimeText}>{item.readTime}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      {MOCK_SAVED_ARTICLES.length > 0 ? (
        <FlatList
          data={MOCK_SAVED_ARTICLES}
          keyExtractor={item => item.id}
          renderItem={renderArticle}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="bookmark-border" size={80} color={colors.surfaceVariant} />
          <Text style={styles.emptyTitle}>لا توجد مقالات محفوظة</Text>
          <Text style={styles.emptySubtitle}>قم بحفظ المقالات التي تعجبك للرجوع إليها لاحقاً هنا.</Text>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
    marginBottom: Spacing.four,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.onSurface,
  },
  listContent: {
    paddingBottom: Spacing.six,
  },
  articleCard: {
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.four,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  articleImage: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surfaceVariant,
  },
  articleContent: {
    padding: Spacing.three,
  },
  articleMeta: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  categoryBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: colors.onSecondaryContainer,
  },
  saveButton: {
    padding: 4,
  },
  articleTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
    marginBottom: Spacing.two,
    lineHeight: 24,
  },
  articleFooter: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.one,
  },
  readTimeText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.six,
  },
  emptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.onSurface,
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  emptySubtitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
});
