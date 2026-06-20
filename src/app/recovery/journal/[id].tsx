import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { useRecoveryStore } from '@/store/useRecoveryStore';

const TAGS = ['العمل', 'العائلة', 'الصحة', 'العلاقات', 'أخرى'];

export default function JournalEditorScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { journals, addJournal, updateJournal, deleteJournal } = useRecoveryStore();

  const isNew = id === 'new';
  const existingJournal = !isNew ? journals.find(j => j.id === id) : null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(isNew);

  useEffect(() => {
    if (!isNew && existingJournal) {
      setTitle(existingJournal.title);
      setContent(existingJournal.content);
      setSelectedTag(existingJournal.tag);
    }
  }, [isNew, existingJournal]);

  const handleSave = () => {
    if (!content.trim()) return;

    if (isNew) {
      addJournal({
        title: title.trim() || 'بدون عنوان',
        content: content.trim(),
        tag: selectedTag,
      });
      router.back();
    } else if (existingJournal) {
      updateJournal(existingJournal.id, {
        title: title.trim() || 'بدون عنوان',
        content: content.trim(),
        tag: selectedTag,
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    const doDelete = () => {
      if (existingJournal) {
        deleteJournal(existingJournal.id);
        router.back();
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه اليومية نهائياً؟')) {
        doDelete();
      }
    } else {
      Alert.alert('حذف اليومية', 'هل أنت متأكد من رغبتك في حذف هذه اليومية نهائياً؟', [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'حذف', style: 'destructive', onPress: doDelete }
      ]);
    }
  };

  const displayDate = existingJournal
    ? new Date(existingJournal.createdAt).toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.appBar}>
          {isEditing ? (
            <TouchableOpacity onPress={() => {
              if (isNew) {
                router.back();
              } else {
                setIsEditing(false);
                if (existingJournal) {
                  setTitle(existingJournal.title);
                  setContent(existingJournal.content);
                  setSelectedTag(existingJournal.tag);
                }
              }
            }}>
              <Text style={styles.cancelText}>إلغاء</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
            </TouchableOpacity>
          )}

          <Text style={styles.dateText}>{displayDate}</Text>

          <View style={styles.rightActions}>
            {isEditing && (
              <TouchableOpacity onPress={handleSave} disabled={!content.trim()}>
                <Text style={[styles.saveText, !content.trim() && styles.saveTextDisabled]}>حفظ</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: isEditing ? Spacing.four : 100 }}
        >
          <TextInput
            style={styles.titleInput}
            placeholder="عنوان تدوينتك..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={title}
            onChangeText={setTitle}
            dir="rtl"
            editable={isEditing}
          />

          <View style={[styles.tagsContainer, isEditing && styles.tagsContainerEditing]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsScroll}>
              {TAGS.map(tag => (
                <TouchableOpacity
                  key={tag}
                  style={[styles.tagChip, selectedTag === tag && styles.tagChipActive]}
                  onPress={() => isEditing && setSelectedTag(tag)}
                  disabled={!isEditing}
                >
                  <Text style={[styles.tagText, selectedTag === tag && styles.tagTextActive]}>
                    #{tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TextInput
            style={[styles.contentInput, isEditing && styles.contentInputEditing]}
            placeholder="اكتب كل ما يجول في خاطرك هنا، هذه المساحة لك وحدك..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={content}
            onChangeText={setContent}
            multiline
            dir="rtl"
            autoFocus={isNew}
            editable={isEditing}
          />
        </ScrollView>

        {/* Floating Actions Chip for View Mode */}
        {!isEditing && !isNew && (
          <View style={styles.floatingActionsChip}>
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.chipAction}>
              <MaterialIcons name="edit" size={24} color={colors.primary} />
              <Text style={[styles.chipActionText, { color: colors.primary }]}>تعديل</Text>
            </TouchableOpacity>
            <View style={styles.chipDivider} />
            <TouchableOpacity onPress={handleDelete} style={styles.chipAction}>
              <MaterialIcons name="delete-outline" size={24} color={colors.error} />
              <Text style={[styles.chipActionText, { color: colors.error }]}>حذف</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  appBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  rightActions: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  saveText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.primary,
  },
  saveTextDisabled: {
    color: colors.outline,
  },
  dateText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  scrollArea: {
    flex: 1,
    padding: Spacing.four,
  },
  titleInput: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    marginBottom: Spacing.four,
    paddingHorizontal: Spacing.two,
    textAlign: 'right',
  },
  tagsContainer: {
    marginBottom: Spacing.five,
  },
  tagsContainerEditing: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  tagsScroll: {
    flexDirection: 'row-reverse',
    gap: Spacing.two,
  },
  tagChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
  },
  tagChipActive: {
    backgroundColor: colors.secondaryContainer,
  },
  tagText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  tagTextActive: {
    color: colors.onSecondaryContainer,
    fontFamily: Fonts.bold,
  },
  contentInput: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: colors.onSurface,
    lineHeight: 32,
    minHeight: 300,
    textAlign: 'auto',
    textAlignVertical: 'top',
    paddingHorizontal: Spacing.three,
  },
  contentInputEditing: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.two,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  floatingActionsChip: {
    position: 'absolute',
    bottom: Spacing.six,
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 30,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  chipAction: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.one,
  },
  chipActionText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  chipDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.surfaceVariant,
    marginHorizontal: Spacing.two,
  },
});
