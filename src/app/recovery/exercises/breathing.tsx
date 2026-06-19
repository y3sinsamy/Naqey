import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

export default function BreathingExerciseScreen() {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  
  const circleScale = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);

  const startExercise = () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    runCycle();
  };

  const stopExercise = () => {
    isPlayingRef.current = false;
    setPhase('idle');
    setTimeLeft(0);
    if (timerRef.current) clearInterval(timerRef.current);
    circleScale.stopAnimation();
    Animated.timing(circleScale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const runCycle = () => {
    if (!isPlayingRef.current) return;

    // INHALE (4 seconds)
    setPhase('inhale');
    setTimeLeft(4);
    Animated.timing(circleScale, {
      toValue: 2,
      duration: 4000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && isPlayingRef.current) {
        
        // HOLD (7 seconds)
        setPhase('hold');
        setTimeLeft(7);
        setTimeout(() => {
          if (!isPlayingRef.current) return;
          
          // EXHALE (8 seconds)
          setPhase('exhale');
          setTimeLeft(8);
          Animated.timing(circleScale, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: true,
          }).start(({ finished: exhaled }) => {
            if (exhaled && isPlayingRef.current) {
              runCycle(); // Loop
            }
          });
          
        }, 7000);
      }
    });
  };

  // Simple interval to update the text countdown
  useEffect(() => {
    if (phase !== 'idle' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, timeLeft]); // Reset interval when phase changes

  const getPhaseText = () => {
    switch (phase) {
      case 'idle': return 'استعد للتنفس';
      case 'inhale': return 'شهيق...';
      case 'hold': return 'احبس أنفاسك...';
      case 'exhale': return 'زفير ببطء...';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => { stopExercise(); router.back(); }} style={styles.backButton}>
          <MaterialIcons name="chevron-right" size={28} color={colors.onBackground} />
        </TouchableOpacity>
        <Text style={styles.title}>تمرين التنفس 4-7-8</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        {/* Breathing Circle */}
        <View style={styles.circleContainer}>
          <Animated.View 
            style={[
              styles.breathingCircle, 
              { transform: [{ scale: circleScale }] }
            ]} 
          />
          <View style={styles.textOverlay}>
            <Text style={styles.phaseText}>{getPhaseText()}</Text>
            {phase !== 'idle' && (
              <Text style={styles.timerText}>{timeLeft}</Text>
            )}
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {phase === 'idle' ? (
            <TouchableOpacity style={styles.primaryButton} onPress={startExercise}>
              <MaterialIcons name="play-arrow" size={24} color={colors.onPrimary} />
              <Text style={styles.primaryButtonText}>ابدأ التمرين</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.secondaryButton} onPress={stopExercise}>
              <MaterialIcons name="stop" size={24} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>إيقاف</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.instructionText}>
          يساعد هذا التمرين على تقليل التوتر وتهدئة الجهاز العصبي من خلال تنظيم التنفس ببطء.
        </Text>
      </View>
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
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: colors.onBackground,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.six,
  },
  circleContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.eight,
  },
  breathingCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryContainer,
    position: 'absolute',
    opacity: 0.8,
  },
  textOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  phaseText: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onBackground,
    marginBottom: Spacing.two,
  },
  timerText: {
    fontFamily: Fonts.bold,
    fontSize: 48,
    color: colors.primary,
  },
  controls: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  primaryButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.eight,
    borderRadius: 30,
    gap: Spacing.two,
    width: '80%',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.onPrimary,
  },
  secondaryButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.eight,
    borderRadius: 30,
    gap: Spacing.two,
    width: '80%',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  secondaryButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.primary,
  },
  instructionText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
});
