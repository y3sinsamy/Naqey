import React, { useState } from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Let me fix that import directly in the code
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams as useLocal, useRouter as useRoute } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

const MOCK_ARTICLE = {
  id: '1',
  title: 'كيف تتعامل مع نوبات القلق المفاجئة في العمل؟',
  category: 'القلق',
  readTime: '5 دقائق',
  date: '12 أكتوبر 2023',
  author: 'فريق نقي الطبي',
  image: 'https://images.unsplash.com/photo-1542662803-2f01b9f541db?q=80&w=870&auto=format&fit=crop',
  content: `تعتبر نوبات القلق في بيئة العمل من التحديات الشائعة التي يواجهها الكثيرون. عندما تشعر بتسارع ضربات القلب وضيق في التنفس أثناء اجتماع مهم أو قبل تسليم مشروع، فإن جسمك يدخل في حالة "القتال أو الهرب".\n\nأول خطوة للتعامل مع هذه النوبات هي إدراكها والاعتراف بها دون إطلاق أحكام على نفسك. حاول التركيز على التنفس العميق والبطيء (تقنية 4-7-8 مفيدة جداً في هذه الحالات).\n\nثانياً، قم بالانفصال الجسدي عن الموقف إن أمكن. خذ استراحة قصيرة، امشِ قليلاً، أو اغسل وجهك بالماء البارد. هذا يساعد في إعادة ضبط الجهاز العصبي.\n\nتذكر دائماً أن هذه المشاعر مؤقتة وستمر. إذا تكررت هذه النوبات، من المهم جداً استشارة متخصص نفسي لمساعدتك في وضع استراتيجيات طويلة المدى للتعامل مع ضغوطات العمل.`,
};

type TextSize = 'small' | 'medium' | 'large';

export default function ArticleDetailScreen() {
  const { id } = useLocal();
  const router = useRoute();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [isSaved, setIsSaved] = useState(true); // Assuming article 1 is saved
  const [textSize, setTextSize] = useState<TextSize>('medium');

  const handleShare = async () => {
    try {
      await Share.share({
        message: `اقرأ هذا المقال الرائع من تطبيق نقي: ${MOCK_ARTICLE.title}`,
        title: MOCK_ARTICLE.title,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const getFontSize = () => {
    switch (textSize) {
      case 'small': return 16;
      case 'large': return 22;
      case 'medium':
      default: return 18;
    }
  };

  return (
    <View style={styles.container}>
      {/* Parallax Header Image (Fixed in background) */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: MOCK_ARTICLE.image }} style={styles.coverImage} />
        <View style={styles.imageOverlay} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Transparent Spacer to let the fixed image show through */}
        <View style={styles.parallaxSpacer} />

        {/* Content Area */}
        <View style={styles.contentContainer}>
          {/* Category & Read Time */}
          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{MOCK_ARTICLE.category}</Text>
            </View>
            <View style={styles.readTimeContainer}>
              <MaterialIcons name="schedule" size={16} color={colors.onSurfaceVariant} />
              <Text style={styles.readTimeText}>{MOCK_ARTICLE.readTime}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{MOCK_ARTICLE.title}</Text>

          {/* Author Info */}
          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <MaterialIcons name="local-hospital" size={20} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.authorName}>{MOCK_ARTICLE.author}</Text>
              <Text style={styles.dateText}>{MOCK_ARTICLE.date}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Controls Bar (Text Size & Actions) */}
          <View style={styles.controlsBar}>
            <View style={styles.textSizeControls}>
              <TouchableOpacity onPress={() => setTextSize('small')} style={[styles.sizeButton, textSize === 'small' && styles.sizeButtonActive]}>
                <Text style={[styles.sizeIconText, { fontSize: 14 }, textSize === 'small' && styles.sizeIconTextActive]}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTextSize('medium')} style={[styles.sizeButton, textSize === 'medium' && styles.sizeButtonActive]}>
                <Text style={[styles.sizeIconText, { fontSize: 18 }, textSize === 'medium' && styles.sizeIconTextActive]}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTextSize('large')} style={[styles.sizeButton, textSize === 'large' && styles.sizeButtonActive]}>
                <Text style={[styles.sizeIconText, { fontSize: 22 }, textSize === 'large' && styles.sizeIconTextActive]}>A</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionsControls}>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <MaterialIcons name="share" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Article Text */}
          <Text style={[styles.articleBody, { fontSize: getFontSize() }]}>
            {MOCK_ARTICLE.content}
          </Text>

        </View>
      </ScrollView>

      {/* Floating Top App Bar */}
      <SafeAreaView style={styles.floatingAppBar} edges={['top']}>
        <View style={styles.appBarContent}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setIsSaved(!isSaved)}>
            <MaterialIcons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={26}
              color={isSaved ? colors.primary : colors.onSurface}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'absolute', // Fixed in background
    top: 0,
    left: 0,
    right: 0,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)', // Slight dark overlay to make text legible if placed here
  },
  parallaxSpacer: {
    height: 268, // 300 (image height) - 32 (overlap)
  },
  floatingAppBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  appBarContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface, // Solid background
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32, // Overlaps the image
    paddingHorizontal: Spacing.five,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.eight,
  },
  metaRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  categoryBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: colors.onSecondaryContainer,
  },
  readTimeContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.one,
  },
  readTimeText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    textAlign: 'right',
    lineHeight: 34,
    marginBottom: Spacing.five,
  },
  authorRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.three,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorName: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: colors.onSurface,
    textAlign: 'right',
  },
  dateText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    marginVertical: Spacing.five,
  },
  controlsBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.five,
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.two,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  textSizeControls: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.two,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
  },
  sizeButtonActive: {
    backgroundColor: colors.primaryContainer,
  },
  sizeIconText: {
    fontFamily: Fonts.bold,
    color: colors.onSurfaceVariant,
  },
  sizeIconTextActive: {
    color: colors.onPrimaryContainer,
  },
  actionsControls: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer + '20', // slight primary tint
  },
  articleBody: {
    fontFamily: Fonts.regular,
    color: colors.onSurface,
    textAlign: 'right',
    lineHeight: 36, // generous line height for reading
  },
});
