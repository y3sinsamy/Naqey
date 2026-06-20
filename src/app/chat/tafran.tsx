import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, I18nManager } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeContext } from '@/hooks/use-theme';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { MaterialIcons } from '@expo/vector-icons';

const TAFRAN_DATA = {
  name: 'طفران',
  specialty: 'مساعدك الذكي',
  isOnline: true,
};

const INITIAL_MESSAGES = [
  { id: '1', text: 'مرحباً! أنا طفران، كيف يمكنني مساعدتك اليوم؟', sender: 'tafran', timestamp: '10:00 ص' },
];

export default function TafranChatScreen() {
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'patient',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    
    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        text: 'أنا هنا للاستماع إليك ومساعدتك. أرجو أن تخبرني المزيد عما تشعر به حالياً.',
        sender: 'tafran',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1500);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: typeof INITIAL_MESSAGES[0] }) => {
    const isPatient = item.sender === 'patient';

    return (
      <View style={[styles.messageWrapper, isPatient ? styles.messageWrapperPatient : styles.messageWrapperDoctor]}>
        {!isPatient && (
          <View style={[styles.messageAvatar, styles.botAvatar]}>
             <MaterialIcons name="smart-toy" size={16} color={colors.onPrimary} />
          </View>
        )}
        <View style={[styles.messageBubble, isPatient ? styles.messageBubblePatient : styles.messageBubbleDoctor]}>
          <Text style={[styles.messageText, isPatient ? styles.messageTextPatient : styles.messageTextDoctor]}>{item.text}</Text>
          <Text style={[styles.messageTime, isPatient ? styles.messageTimePatient : styles.messageTimeDoctor]}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <MaterialSymbol name="arrow_forward_ios" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          
          <View style={styles.headerProfile}>
            <View style={styles.avatarContainer}>
              <View style={[styles.headerAvatar, styles.botAvatarHeader]}>
                 <MaterialIcons name="smart-toy" size={24} color={colors.onPrimary} />
              </View>
              {TAFRAN_DATA.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.doctorName}>{TAFRAN_DATA.name}</Text>
              <Text style={styles.doctorSpecialty}>{TAFRAN_DATA.specialty}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialSymbol name="more_vert" size={24} color={colors.onSurface} />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
             <View style={styles.dateHeaderContainer}>
                <Text style={styles.dateHeaderText}>اليوم</Text>
             </View>
          }
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachmentButton}>
            <MaterialSymbol name="mic" size={24} color={colors.outline} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="تحدث مع طفران..."
            placeholderTextColor={colors.outline}
            value={inputText}
            onChangeText={setInputText}
            multiline
            textAlign="right"
          />
          <TouchableOpacity 
            style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive]} 
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <MaterialSymbol name="send" size={24} color={inputText.trim() ? colors.onPrimary : colors.outline} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  headerProfile: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginHorizontal: Spacing.three,
  },
  avatarContainer: {
    position: 'relative',
    marginLeft: Spacing.three,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceVariant,
  },
  botAvatarHeader: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981', // green
    borderWidth: 2,
    borderColor: colors.surface,
  },
  headerInfo: {
    justifyContent: 'center',
  },
  doctorName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
  },
  doctorSpecialty: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
  },
  dateHeaderContainer: {
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  dateHeaderText: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: Spacing.three,
    paddingVertical: 4,
    borderRadius: 12,
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    overflow: 'hidden',
  },
  messageWrapper: {
    flexDirection: 'row-reverse',
    marginBottom: Spacing.three,
    alignItems: 'flex-end',
  },
  messageWrapperPatient: {
    alignSelf: 'flex-start',
  },
  messageWrapperDoctor: {
    alignSelf: 'flex-end',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: Spacing.two,
  },
  botAvatar: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: Spacing.three,
    borderRadius: 20,
  },
  messageBubblePatient: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 4,
  },
  messageBubbleDoctor: {
    backgroundColor: colors.surfaceContainerLow,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'right',
  },
  messageTextPatient: {
    color: colors.onPrimary,
  },
  messageTextDoctor: {
    color: colors.onSurface,
  },
  messageTime: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'left',
  },
  messageTimePatient: {
    color: 'rgba(255,255,255,0.7)',
  },
  messageTimeDoctor: {
    color: colors.onSurfaceVariant,
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    paddingBottom: Platform.OS === 'ios' ? 24 : Spacing.three,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant,
    gap: Spacing.two,
  },
  textInput: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 24,
    paddingHorizontal: Spacing.four,
    paddingVertical: 12,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: colors.onSurface,
    textAlign: 'right',
  },
  attachmentButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerLowest,
  },
  sendButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: colors.surfaceContainerLowest,
  },
});
