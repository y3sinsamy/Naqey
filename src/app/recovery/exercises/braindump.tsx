import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { Card } from '@/components/ui/Card';

const DISTORTIONS = [
  'التفكير الكارثي (توقع الأسوأ)',
  'التعميم المبالغ فيه',
  'قراءة أفكار الآخرين',
  'اللوم المستمر (تأنيب الضمير)',
  'التفكير الكل أو اللاشيء'
];

export default function BraindumpScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  const [step, setStep] = useState(0);
  
  const [negativeThought, setNegativeThought] = useState('');
  const [distortion, setDistortion] = useState<string | null>(null);
  const [positiveThought, setPositiveThought] = useState('');

  // Animation values
  const negativeScale = useRef(new Animated.Value(1)).current;
  const negativeOpacity = useRef(new Animated.Value(1)).current;
  const negativeRotate = useRef(new Animated.Value(0)).current; // For falling down effect
  const positiveScale = useRef(new Animated.Value(0.5)).current;
  const positiveOpacity = useRef(new Animated.Value(0)).current;

  const triggerLetGoAnimation = () => {
    setStep(3); // Go to final animation state
    
    // Animate Negative Thought away (shrink, fade, rotate and fall)
    Animated.parallel([
      Animated.timing(negativeOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(negativeScale, {
        toValue: 0.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(negativeRotate, {
        toValue: 1, // Will map to degrees
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // After negative thought is gone, animate Positive Thought in
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(positiveOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(positiveScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1200);
  };

  const spin = negativeRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'] // Rotates and falls down
  });

  const renderStepContent = () => {
    switch (step) {
      case 0: // Step 1: Capture negative thought
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>1. التقاط الفكرة 💭</Text>
            <Text style={styles.stepDescription}>اكتب الفكرة السلبية أو المقلقة التي تدور في رأسك حالياً.</Text>
            <TextInput
              style={styles.inputArea}
              placeholder="مثال: أنا سأفشل غداً في العرض التقديمي..."
              placeholderTextColor={colors.onSurfaceVariant}
              value={negativeThought}
              onChangeText={setNegativeThought}
              multiline
              autoFocus
              textAlign="right"
            />
            <TouchableOpacity 
              style={[styles.nextButton, !negativeThought.trim() && styles.disabledButton]} 
              onPress={() => setStep(1)}
              disabled={!negativeThought.trim()}
            >
              <Text style={styles.nextButtonText}>التالي</Text>
              <MaterialIcons name="arrow-back" size={20} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
        );

      case 1: // Step 2: Identify Distortion
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>2. فخ التفكير 🕸️</Text>
            <Text style={styles.stepDescription}>هذه الفكرة قد تكون خدعة من عقلك. ما هو "فخ التفكير" الأقرب لهذه الفكرة؟</Text>
            <ScrollView style={styles.distortionList} showsVerticalScrollIndicator={false}>
              {DISTORTIONS.map((item, idx) => (
                <TouchableOpacity 
                  key={idx}
                  style={[styles.distortionCard, distortion === item && styles.distortionCardActive]}
                  onPress={() => setDistortion(item)}
                >
                  <Text style={[styles.distortionText, distortion === item && styles.distortionTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.navRow}>
              <TouchableOpacity style={styles.backNavButton} onPress={() => setStep(0)}>
                <Text style={styles.backNavText}>رجوع</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.nextButton, {flex: 1}, !distortion && styles.disabledButton]} 
                onPress={() => setStep(2)}
                disabled={!distortion}
              >
                <Text style={styles.nextButtonText}>التالي</Text>
                <MaterialIcons name="arrow-back" size={20} color={colors.onPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        );

      case 2: // Step 3: Reframe
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>3. إعادة الصياغة 🌱</Text>
            <Text style={styles.stepDescription}>حاول كتابة فكرة بديلة، أكثر عقلانية وواقعية، ومبنية على أدلة صحيحة.</Text>
            <TextInput
              style={styles.inputArea}
              placeholder="مثال: لقد تدربت جيداً، وسأبذل قصارى جهدي، وحتى إن أخطأت فهو أمر طبيعي..."
              placeholderTextColor={colors.onSurfaceVariant}
              value={positiveThought}
              onChangeText={setPositiveThought}
              multiline
              autoFocus
              textAlign="right"
            />
            <View style={styles.navRow}>
              <TouchableOpacity style={styles.backNavButton} onPress={() => setStep(1)}>
                <Text style={styles.backNavText}>رجوع</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.nextButton, {flex: 1, backgroundColor: colors.tertiary}, !positiveThought.trim() && styles.disabledButton]} 
                onPress={triggerLetGoAnimation}
                disabled={!positiveThought.trim()}
              >
                <Text style={styles.nextButtonText}>تخلص من الفكرة السلبية</Text>
                <MaterialIcons name="delete-sweep" size={22} color={colors.onPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        );

      case 3: // Step 4: Animation and Result
        return (
          <View style={styles.animationContainer}>
            <Animated.View style={[
              styles.negativeThoughtBubble, 
              {
                opacity: negativeOpacity,
                transform: [
                  { scale: negativeScale },
                  { rotate: spin },
                  { translateY: negativeRotate.interpolate({ inputRange: [0, 1], outputRange: [0, 300] }) }
                ]
              }
            ]}>
              <MaterialIcons name="close" size={24} color={colors.onErrorContainer} style={{marginBottom: 8}} />
              <Text style={styles.negativeThoughtText}>{negativeThought}</Text>
            </Animated.View>

            <Animated.View style={[
              styles.positiveThoughtBubble, 
              {
                opacity: positiveOpacity,
                transform: [{ scale: positiveScale }]
              }
            ]}>
              <MaterialIcons name="check-circle" size={48} color={colors.primary} style={{marginBottom: 16}} />
              <Text style={styles.positiveThoughtTitle}>الفكرة الجديدة المتزنة</Text>
              <Text style={styles.positiveThoughtText}>{positiveThought}</Text>
              
              <TouchableOpacity style={styles.finishButton} onPress={() => router.back()}>
                <Text style={styles.finishButtonText}>العودة للرئيسية</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <MaterialIcons name="close" size={28} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>تفريغ الأفكار</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Progress Bar (Hide in step 3) */}
        {step < 3 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${((step + 1) / 3) * 100}%` }]} />
            </View>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {renderStepContent()}
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onSurface,
  },
  progressContainer: {
    paddingHorizontal: Spacing.six,
    marginBottom: Spacing.four,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.six,
    paddingBottom: Spacing.eight,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    textAlign: 'right',
    marginBottom: Spacing.two,
  },
  stepDescription: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    marginBottom: Spacing.six,
    lineHeight: 24,
  },
  inputArea: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 16,
    padding: Spacing.four,
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: colors.onSurface,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: Spacing.six,
  },
  nextButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.four,
    borderRadius: 16,
    gap: Spacing.two,
  },
  disabledButton: {
    backgroundColor: colors.surfaceVariant,
    opacity: 0.7,
  },
  nextButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onPrimary,
  },
  distortionList: {
    marginBottom: Spacing.six,
  },
  distortionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.three,
  },
  distortionCardActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },
  distortionText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
  },
  distortionTextActive: {
    fontFamily: Fonts.bold,
    color: colors.onPrimaryContainer,
  },
  navRow: {
    flexDirection: 'row-reverse',
    gap: Spacing.four,
  },
  backNavButton: {
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.six,
    borderRadius: 16,
  },
  backNavText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  negativeThoughtBubble: {
    position: 'absolute',
    backgroundColor: colors.errorContainer,
    padding: Spacing.six,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.error,
    alignItems: 'center',
    width: '100%',
  },
  negativeThoughtText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onErrorContainer,
    textAlign: 'center',
    textDecorationLine: 'line-through', // Visual indicator it's invalid
  },
  positiveThoughtBubble: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.six,
    borderRadius: 24,
    alignItems: 'center',
    width: '100%',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  positiveThoughtTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: Spacing.three,
    textAlign: 'center',
  },
  positiveThoughtText: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    color: colors.onSurface,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: Spacing.eight,
  },
  finishButton: {
    backgroundColor: colors.primary,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.six,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  finishButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onPrimary,
  },
});
