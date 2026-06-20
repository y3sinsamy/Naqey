import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/Card';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

const CATEGORIES = ["القلق", "الاكتئاب", "تطوير الذات", "النوم"];

const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'كيف تتعامل مع نوبات القلق المفاجئة في العمل؟',
    category: 'القلق',
    readTime: '5 دقائق',
    image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=890&auto=format&fit=crop',
    isSaved: true,
  },
  {
    id: '2',
    title: 'عادات يومية لتحسين جودة النوم والتخلص من الأرق',
    category: 'النوم',
    readTime: '7 دقائق',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop',
    isSaved: false,
  },
  {
    id: '3',
    title: 'خطوات عملية لبناء الثقة بالنفس والتعامل مع الإحباط',
    category: 'تطوير الذات',
    readTime: '4 دقائق',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop',
    isSaved: false,
  },
];

export default function ArticlesScreen() {
  const { colors, isDark } = useThemeContext();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  // "الكل" is active when selectedCategories is empty
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    if (cat === "الكل") {
      setSelectedCategories([]);
      return;
    }

    let newSelected = [...selectedCategories];
    if (newSelected.includes(cat)) {
      newSelected = newSelected.filter(c => c !== cat);
    } else {
      newSelected.push(cat);
    }

    // If all categories are selected, it means "All" is effectively selected
    if (newSelected.length === CATEGORIES.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(newSelected);
    }
  };

  const isAllSelected = selectedCategories.length === 0;

  const filteredArticles = MOCK_ARTICLES.filter(article => {
    const matchesSearch = article.title.includes(searchQuery);
    const matchesCategory = isAllSelected || selectedCategories.includes(article.category);
    return matchesSearch && matchesCategory;
  });

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.appBar}>
        <Text style={styles.screenTitle}>المقالات</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/profile/saved-articles')}>
          <MaterialIcons name="bookmark" size={24} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={colors.onSurfaceVariant} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن مقالات، مواضيع..."
          placeholderTextColor={colors.onSurfaceVariant}
          value={searchQuery}
          onChangeText={setSearchQuery}
          dir="rtl"
        />
      </View>

      {/* Continue Reading Shiny Card */}
      <TouchableOpacity
        style={styles.shinyCardWrapper}
        onPress={() => router.push('/articles/1')}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=890&auto=format&fit=crop' }}
          style={styles.shinyCard}
          imageStyle={styles.shinyCardImage}
        >
          <View style={styles.shinyOverlay}>
            <View style={styles.shinyHeader}>
              <MaterialIcons name="menu-book" size={20} color="#FFF" />
              <Text style={styles.shinyLabel}>مواصلة القراءة</Text>
            </View>
            <Text style={styles.shinyTitle}>كيف تتعامل مع نوبات القلق المفاجئة في العمل؟</Text>
            <View style={styles.shinyFooter}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '60%' }]} />
              </View>
              <Text style={styles.shinyProgressText}>60%</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Categories Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
        style={styles.chipsScrollView}
      >
        <TouchableOpacity
          style={[styles.chip, isAllSelected && styles.chipActive]}
          onPress={() => toggleCategory('الكل')}
        >
          <Text style={[styles.chipText, isAllSelected && styles.chipTextActive]}>الكل</Text>
        </TouchableOpacity>
        {CATEGORIES.map(cat => {
          const isActive = selectedCategories.includes(cat);
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => toggleCategory(cat)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderArticle = ({ item }: { item: typeof MOCK_ARTICLES[0] }) => (
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
      <FlatList
        data={filteredArticles}
        keyExtractor={item => item.id}
        renderItem={renderArticle}
        ListHeaderComponent={renderHeader()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: Spacing.six,
  },
  headerContainer: {
    paddingTop: Spacing.two,
  },
  appBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.four,
  },
  screenTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onBackground,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    marginHorizontal: Spacing.four,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    height: 52,
    marginBottom: Spacing.four,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  searchIcon: {
    marginLeft: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: colors.onSurface,
    textAlign: 'right',
  },
  shinyCardWrapper: {
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.five,
    borderRadius: 20,
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  shinyCard: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
  },
  shinyCardImage: {
    borderRadius: 20,
  },
  shinyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: Spacing.four,
    justifyContent: 'space-between',
  },
  shinyHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.two,
  },
  shinyLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  shinyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#FFF',
    textAlign: 'right',
    lineHeight: 26,
  },
  shinyFooter: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.three,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  shinyProgressText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: '#FFF',
  },
  chipsScrollView: {
    marginBottom: Spacing.four,
  },
  chipsContainer: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
    flexDirection: 'row-reverse',
  },
  chip: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  chipTextActive: {
    color: colors.onPrimary,
    fontFamily: Fonts.bold,
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
});
