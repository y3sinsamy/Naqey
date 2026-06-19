import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { Card } from '@/components/ui/Card';
import { useRecoveryStore } from '@/store/useRecoveryStore';

const MOODS = [
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f62d.png', label: 'سيء جداً', color: '#F44336' },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f61e.png', label: 'سيء', color: '#FF9800' },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f610.png', label: 'عادي', color: '#9E9E9E' },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f642.png', label: 'جيد', color: '#8BC34A' },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f929.png', label: 'ممتاز', color: '#4CAF50' },
];

export default function RecoveryScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  const { addMoodEntry, journals } = useRecoveryStore();

  const [selectedMood, setSelectedMood] = useState<{url: string, label: string, color: string} | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [isMoodSubmitted, setIsMoodSubmitted] = useState(false);

  const handleMoodSubmit = () => {
    if (selectedMood) {
      addMoodEntry({
        emojiUrl: selectedMood.url,
        label: selectedMood.label,
        note: moodNote.trim()
      });
      setIsMoodSubmitted(true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>مركز التعافي</Text>
          <Text style={styles.headerSubtitle}>مساحتك الآمنة للتنفس والتفريغ</Text>
        </View>

        {/* Mood Tracker */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>كيف تشعر اليوم؟</Text>
            <TouchableOpacity onPress={() => router.push('/recovery/mood-history')}>
              <Text style={styles.seeAllText}>سجل المزاج</Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.moodCard}>
            {!isMoodSubmitted ? (
              <>
                <View style={styles.moodsRow}>
                  {MOODS.map((mood, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={[styles.moodEmojiBtn, selectedMood?.url === mood.url && styles.moodEmojiBtnActive]}
                      onPress={() => setSelectedMood(mood)}
                    >
                      <Image 
                        source={{ uri: mood.url }} 
                        style={{ width: 40, height: 40, opacity: selectedMood?.url === mood.url ? 1 : 0.6 }} 
                        contentFit="contain"
                      />
                      <Text style={[styles.moodLabel, selectedMood?.url === mood.url && styles.moodLabelActive]}>{mood.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {selectedMood && (
                  <View style={styles.moodNoteContainer}>
                    <Text style={styles.noteLabel}>أضف ملاحظة قصيرة (اختياري)</Text>
                    <TextInput 
                      style={styles.noteInput}
                      placeholder="لماذا تشعر هكذا؟..."
                      placeholderTextColor={colors.onSurfaceVariant}
                      value={moodNote}
                      onChangeText={setMoodNote}
                      multiline
                      textAlign="right"
                    />
                    <TouchableOpacity style={styles.submitMoodBtn} onPress={handleMoodSubmit}>
                      <Text style={styles.submitMoodText}>حفظ الحالة</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.submittedContainer}>
                <View style={styles.submittedHeader}>
                  <Image source={{ uri: selectedMood?.url }} style={{ width: 56, height: 56 }} contentFit="contain" />
                  <View>
                    <Text style={styles.submittedTitle}>تم تسجيل حالتك بنجاح!</Text>
                    <Text style={styles.submittedSubtitle}>نحن دائماً هنا للاستماع إليك ودعمك.</Text>
                  </View>
                </View>
                
                <View style={styles.tafranDivider} />
                <Text style={styles.tafranPrompt}>هل تفضل التحدث مع أحدهم الآن؟ "طفران" صديقك الذكي مستعد للاستماع لك وتخفيف عنك.</Text>
                
                <TouchableOpacity 
                  style={styles.tafranBtn}
                  onPress={() => router.push('/chat')} // Assumes /chat exists or will exist
                >
                  <MaterialIcons name="chat-bubble-outline" size={20} color={colors.onPrimary} />
                  <Text style={styles.tafranBtnText}>تحدث مع طفران</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.resetMoodBtn}
                  onPress={() => {
                    setIsMoodSubmitted(false);
                    setSelectedMood(null);
                    setMoodNote('');
                  }}
                >
                  <Text style={styles.resetMoodBtnText}>إدخال مزاج جديد</Text>
                </TouchableOpacity>
              </View>
            )}
          </Card>
        </View>

        {/* Private Journal */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>يومياتي</Text>
            <TouchableOpacity onPress={() => router.push('/recovery/journal/new')}>
              <Text style={styles.seeAllText}>تدوين جديد</Text>
            </TouchableOpacity>
          </View>
          
          {journals.length === 0 ? (
            <Card style={styles.journalCard}>
              <View style={styles.emptyJournalContainer}>
                <MaterialIcons name="menu-book" size={48} color={colors.surfaceVariant} />
                <Text style={styles.emptyJournalTitle}>لم تدون شيئاً بعد</Text>
                <Text style={styles.emptyJournalSubtitle}>اكتب أفكارك ومشاعرك هنا، مساحتك خاصة تماماً ومؤمنة.</Text>
                
                <TouchableOpacity style={styles.newJournalBtn} onPress={() => router.push('/recovery/journal/new')}>
                  <MaterialIcons name="add" size={20} color={colors.onPrimary} />
                  <Text style={styles.newJournalBtnText}>ابدأ التدوين</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ) : (
            <View style={styles.journalsList}>
              {journals.slice(0, 3).map((journal) => (
                <TouchableOpacity 
                  key={journal.id} 
                  activeOpacity={0.7} 
                  onPress={() => router.push(`/recovery/journal/${journal.id}`)}
                >
                  <Card style={styles.journalItemCard}>
                    <View style={styles.journalItemHeader}>
                      <Text style={styles.journalItemTitle} numberOfLines={1}>{journal.title}</Text>
                      {journal.tag && (
                        <View style={styles.journalItemTag}>
                          <Text style={styles.journalItemTagText}>#{journal.tag}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.journalItemContent} numberOfLines={2}>{journal.content}</Text>
                    <Text style={styles.journalItemDate}>
                      {new Date(journal.createdAt).toLocaleDateString('ar-SA')}
                    </Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Exercises */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>تمارين التعافي</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.exercisesScroll}>
            
            <TouchableOpacity onPress={() => router.push('/recovery/exercises/breathing')} activeOpacity={0.8}>
              <View style={[styles.exerciseCard, { backgroundColor: colors.primaryContainer }]}>
                <View style={styles.exerciseIconWrapper}>
                  <MaterialIcons name="air" size={28} color={colors.onPrimaryContainer} />
                </View>
                <Text style={[styles.exerciseTitle, { color: colors.onPrimaryContainer }]}>تمرين التنفس 4-7-8</Text>
                <Text style={[styles.exerciseSubtitle, { color: colors.onPrimaryContainer }]}>لتخفيف التوتر والقلق</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/recovery/exercises/braindump')}>
              <View style={[styles.exerciseCard, { backgroundColor: colors.secondaryContainer }]}>
                <View style={styles.exerciseIconWrapper}>
                  <MaterialIcons name="psychology" size={28} color={colors.onSecondaryContainer} />
                </View>
                <Text style={[styles.exerciseTitle, { color: colors.onSecondaryContainer }]}>تفريغ الأفكار</Text>
                <Text style={[styles.exerciseSubtitle, { color: colors.onSecondaryContainer }]}>إعادة الهيكلة المعرفية</Text>
              </View>
            </TouchableOpacity>

          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.eight,
  },
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: colors.onBackground,
    textAlign: 'right',
    marginBottom: Spacing.one,
  },
  headerSubtitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  section: {
    marginBottom: Spacing.six,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.onSurface,
    textAlign: 'right',
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.four,
  },
  sectionHeaderRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.four,
  },
  seeAllText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.primary,
  },
  moodCard: {
    marginHorizontal: Spacing.four,
    padding: Spacing.four,
    backgroundColor: colors.surface,
  },
  moodsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  moodEmojiBtn: {
    alignItems: 'center',
    padding: Spacing.two,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodEmojiBtnActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: Spacing.two,
  },
  moodLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  moodLabelActive: {
    color: colors.onPrimaryContainer,
    fontFamily: Fonts.bold,
  },
  moodNoteContainer: {
    marginTop: Spacing.five,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant,
    paddingTop: Spacing.four,
  },
  noteLabel: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
    textAlign: 'right',
    marginBottom: Spacing.three,
  },
  noteInput: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: Spacing.three,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurface,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitMoodBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  submitMoodText: {
    fontFamily: Fonts.bold,
    color: colors.onPrimary,
    fontSize: 15,
  },
  submittedContainer: {
    alignItems: 'flex-end',
  },
  submittedHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.three,
  },
  submittedEmoji: {
    fontSize: 48,
  },
  submittedTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onSurface,
    textAlign: 'right',
    marginBottom: 4,
  },
  submittedSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  tafranDivider: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    width: '100%',
    marginVertical: Spacing.four,
  },
  tafranPrompt: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurface,
    textAlign: 'right',
    lineHeight: 22,
    marginBottom: Spacing.four,
  },
  tafranBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: 12,
    width: '100%',
  },
  tafranBtnText: {
    fontFamily: Fonts.bold,
    color: colors.onPrimary,
    fontSize: 15,
  },
  resetMoodBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.three,
    borderRadius: 12,
    width: '100%',
    marginTop: Spacing.three,
  },
  resetMoodBtnText: {
    fontFamily: Fonts.bold,
    color: colors.primary,
    fontSize: 15,
  },
  journalCard: {
    marginHorizontal: Spacing.four,
    padding: Spacing.five,
    backgroundColor: colors.surfaceContainerLowest,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: colors.surfaceVariant,
  },
  emptyJournalContainer: {
    alignItems: 'center',
  },
  emptyJournalTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
    marginTop: Spacing.three,
    marginBottom: Spacing.one,
  },
  emptyJournalSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  newJournalBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    gap: Spacing.one,
  },
  newJournalBtnText: {
    fontFamily: Fonts.bold,
    color: colors.onPrimary,
    fontSize: 14,
  },
  exercisesScroll: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    flexDirection: 'row-reverse',
  },
  journalsList: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  journalItemCard: {
    padding: Spacing.four,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  journalItemHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  journalItemTitle: {
    flex: 1,
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
  },
  journalItemTag: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: Spacing.two,
  },
  journalItemTagText: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: colors.onSecondaryContainer,
  },
  journalItemContent: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    lineHeight: 22,
    marginBottom: Spacing.three,
  },
  journalItemDate: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.outline,
    textAlign: 'left',
  },
  exerciseCard: {
    width: 160,
    height: 180,
    borderRadius: 20,
    padding: Spacing.four,
    justifyContent: 'flex-end',
  },
  exerciseIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Spacing.four,
    right: Spacing.four,
  },
  exerciseTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 4,
  },
  exerciseSubtitle: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    textAlign: 'right',
    opacity: 0.9,
  },
});
