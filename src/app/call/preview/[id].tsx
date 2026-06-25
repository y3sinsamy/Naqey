import { Button } from '@/components/ui/Button';
import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CallPreviewScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const previewPlayer = useVideoPlayer(require('@/assets/videos/patient.mp4'), player => {
    player.loop = true;
    player.muted = true; // required for web autoplay
    player.play();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialSymbol name="close" size={28} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>غرفة الانتظار</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>د. أحمد محمود</Text>
          <Text style={styles.subtitle}>موعد الجلسة: 10:30 صباحاً</Text>

          <View style={styles.previewContainer}>
            {isVideoOff ? (
              <View style={styles.videoOffPlaceholder}>
                <View style={styles.avatarCircle}>
                  <MaterialSymbol name="person" size={64} color={colors.onSurfaceVariant} />
                </View>
                <Text style={styles.videoOffText}>الكاميرا مغلقة</Text>
              </View>
            ) : (
              <VideoView
                player={previewPlayer}
                style={styles.previewVideo}
                contentFit="cover"
                nativeControls={false}
                playsInline={true}
              />
            )}

            <View style={styles.controlsOverlay}>
              <TouchableOpacity
                style={[styles.controlButton, isMuted && styles.controlButtonActive]}
                onPress={() => setIsMuted(!isMuted)}
                activeOpacity={0.7}
              >
                <MaterialSymbol name={isMuted ? "mic_off" : "mic"} size={28} color={isMuted ? colors.error : colors.onSurface} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, isVideoOff && styles.controlButtonActive]}
                onPress={() => setIsVideoOff(!isVideoOff)}
                activeOpacity={0.7}
              >
                <MaterialSymbol name={isVideoOff ? "videocam_off" : "videocam"} size={28} color={isVideoOff ? colors.error : colors.onSurface} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <MaterialSymbol name="info" size={20} color={colors.primary} />
            <Text style={styles.infoText}>سيتم إشعار الطبيب بانضمامك لغرفة الانتظار. يرجى التأكد من جودة اتصالك وإعدادات الكاميرا والصوت.</Text>
          </View>

          <Button
            title="الانضمام للجلسة"
            onPress={() => router.push(`/call/room/${id}`)}
            style={styles.joinButton}
            textStyle={{ fontSize: 18 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
  },
  headerTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: colors.onSurface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.five,
    alignItems: 'center',
    paddingTop: Spacing.six,
    paddingBottom: Spacing.six,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: colors.onSurface,
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    marginBottom: Spacing.six,
  },
  previewContainer: {
    width: '100%',
    height: height * 0.45,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHighest,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.six,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  previewVideo: {
    width: '100%',
    height: '100%',
    transform: [{ scaleX: -1 }], // mirror effect for local camera
  },
  videoOffPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerHigh,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.four,
  },
  videoOffText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: Spacing.five,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.five,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  controlButtonActive: {
    backgroundColor: 'rgba(255,235,238,0.95)', // slight red tint
    borderWidth: 1,
    borderColor: colors.error,
  },
  infoCard: {
    flexDirection: 'row-reverse',
    backgroundColor: colors.primaryContainer + '40',
    padding: Spacing.four,
    borderRadius: 16,
    marginBottom: Spacing.six,
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  infoText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 22,
    textAlign: 'right',
  },
  joinButton: {
    width: '100%',
    paddingVertical: Spacing.four,
    borderRadius: 32,
    marginTop: 'auto',
    marginBottom: Spacing.six,
  },
});
