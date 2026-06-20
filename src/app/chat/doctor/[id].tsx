import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, I18nManager } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useThemeContext } from '@/hooks/use-theme';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { MaterialSymbol } from '@/components/ui/MaterialSymbol';

// Mock doctor info
const DOCTOR_DATA = {
  name: 'د. أحمد علي',
  specialty: 'استشاري علاج الإدمان',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  isOnline: true,
};

const INITIAL_MESSAGES = [
  { id: '1', text: 'مرحباً، كيف يمكنني مساعدتك اليوم؟', sender: 'doctor', timestamp: '10:00 ص' },
  { id: '2', text: 'أشعر ببعض القلق وأريد التحدث.', sender: 'patient', timestamp: '10:05 ص' },
  { id: '3', text: 'لا تقلق، أنا هنا لدعمك. هل حدث شيء معين جعلك تشعر بذلك؟', sender: 'doctor', timestamp: '10:06 ص' },
  { id: 'session_1', isSessionCard: true, title: 'موعد الجلسة القادمة', date: 'اليوم، 10:30 صباحاً', status: 'upcoming' },
];

export default function DoctorChatScreen() {
  const { id } = useLocalSearchParams();
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
        text: 'أنا متفهم لما تمر به. دعنا نناقش ذلك بالتفصيل في جلستنا القادمة، أو يمكنك إخباري المزيد الآن.',
        sender: 'doctor',
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

  const renderMessage = ({ item }: { item: any }) => {
    if (item.isSessionCard) {
      return (
        <View style={styles.sessionCardWrapper}>
          <View style={styles.sessionCard}>
            <View style={styles.sessionCardHeader}>
              <MaterialSymbol name="event_upcoming" size={24} color={colors.primary} fill={true} />
              <Text style={styles.sessionCardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.sessionCardDate}>{item.date}</Text>
            <TouchableOpacity 
              style={styles.sessionCardButton}
              onPress={() => router.push(`/call/preview/${id}`)}
              activeOpacity={0.7}
            >
              <MaterialSymbol name="videocam" size={20} color={colors.onPrimary} fill={true} />
              <Text style={styles.sessionCardButtonText}>الدخول للمكالمة</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const isPatient = item.sender === 'patient';
    const isRTL = I18nManager.isRTL;

    return (
      <View style={[styles.messageWrapper, isPatient ? styles.messageWrapperPatient : styles.messageWrapperDoctor]}>
        {!isPatient && (
          <Image source={DOCTOR_DATA.avatar} style={styles.messageAvatar} />
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
              <Image source={DOCTOR_DATA.avatar} style={styles.headerAvatar} />
              {DOCTOR_DATA.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.doctorName}>{DOCTOR_DATA.name}</Text>
              <Text style={styles.doctorSpecialty}>{DOCTOR_DATA.specialty}</Text>
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
            <MaterialSymbol name="attach_file" size={24} color={colors.outline} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="اكتب رسالتك هنا..."
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
  sessionCardWrapper: {
    alignItems: 'center',
    marginVertical: Spacing.four,
  },
  sessionCard: {
    width: '85%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  sessionCardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  sessionCardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: colors.onSurface,
  },
  sessionCardDate: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: Spacing.four,
  },
  sessionCardButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: colors.primary,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    borderRadius: 24,
    width: '100%',
  },
  sessionCardButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.onPrimary,
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
