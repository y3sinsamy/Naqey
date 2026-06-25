import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock data
const SESSION_INFO = {
  doctorName: 'د. أحمد محمود',
  specialty: 'طب نفسي',
  date: '2023-10-10',
  duration: '45 دقيقة',
  videoUrl: 'local_patient', // We'll use local assets directly in the hook
  doctorVideoUrl: 'local_doctor', 
};

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function ReplayScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Video State
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [timelineWidth, setTimelineWidth] = useState(0);

  // Setup expo-video player with local assets to avoid buffering desync
  const player = useVideoPlayer(require('@/assets/videos/patient.mp4'), player => {
    player.loop = false;
  });

  const doctorPlayer = useVideoPlayer(require('@/assets/videos/doctor.mp4'), player => {
    player.loop = false;
    player.muted = true; // Mute doctor by default to avoid echo
  });

  // Poll for current time and duration
  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        setElapsed(player.currentTime);
        if (player.duration > 0 && duration === 0) {
          setDuration(player.duration);
        }
        // Update playing state if changed natively
        if (player.playing !== playing) {
          setPlaying(player.playing);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player, playing, duration]);

  const togglePlay = () => {
    if (player && doctorPlayer) {
      if (playing) {
        player.pause();
        doctorPlayer.pause();
      } else {
        player.play();
        doctorPlayer.play();
      }
      setPlaying(!playing);
    }
    resetControlsTimeout();
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
    }
    hideControlsTimer.current = setTimeout(() => {
      // Check player.playing to get the latest mutable value, avoiding stale closure states
      if (player && player.playing) {
        setShowControls(false);
      }
    }, 3000);
  };

  const progressPercent = duration > 0 ? (elapsed / duration) * 100 : 0;

  // Calculate dynamic dimensions
  const videoWidth = isFullScreen ? screenWidth : screenWidth - Spacing.four * 2;
  const videoHeight = isFullScreen ? screenHeight : videoWidth * (9 / 16);

  return (
    <SafeAreaView style={styles.container} edges={isFullScreen ? [] : ['top', 'bottom']}>
      <StatusBar hidden={isFullScreen} />

      {/* Header - Hidden in Fullscreen */}
      {!isFullScreen && (
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <MaterialIcons name="chevron-right" size={28} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>إعادة المشاهدة</Text>
          <View style={{ width: 36 }} />
        </View>
      )}

      <ScrollView
        contentContainerStyle={[styles.content, isFullScreen && styles.contentFullScreen]}
        scrollEnabled={!isFullScreen}
      >

        {/* Video Player Section */}
        <Pressable
          style={[styles.videoContainer, isFullScreen && styles.videoContainerFullScreen]}
          onPress={resetControlsTimeout}
        >
          <View style={isFullScreen ? styles.fullScreenVideoWrapper : { width: '100%', height: videoHeight }}>
            <VideoView
              player={player}
              style={{ width: '100%', height: '100%' }}
              nativeControls={false}
              contentFit="contain"
              surfaceType="textureView"
            />
          </View>

          {/* Doctor PIP Frame */}
          <View style={isFullScreen ? styles.pipContainerFullScreen : styles.pipContainer}>
            <VideoView
              player={doctorPlayer}
              style={isFullScreen ? styles.pipVideoFullScreen : styles.pipVideo}
              nativeControls={false}
              contentFit="cover"
              surfaceType="textureView"
            />
          </View>

          {/* Custom Naqey Controls Overlay */}
          {showControls && (
            <View style={styles.controlsOverlay}>
              <View style={styles.controlsHeader}>
                <View style={styles.liveBadge}>
                  <Text style={styles.liveText}>مسجلة</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.playPauseButton} onPress={togglePlay}>
                <MaterialIcons
                  name={playing ? "pause" : "play-arrow"}
                  size={56}
                  color="#FFF"
                />
              </TouchableOpacity>

              <View style={styles.controlsFooter}>
                <View style={styles.timeRow}>
                  <Text style={styles.timeText}>{formatTime(elapsed)} / {formatTime(duration)}</Text>
                  <TouchableOpacity onPress={toggleFullScreen} style={styles.fullscreenButton}>
                    <MaterialIcons
                      name={isFullScreen ? "fullscreen-exit" : "fullscreen"}
                      size={28}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </View>
                {/* Real-time Timeline Bar */}
                <Pressable
                  style={styles.timelineContainer}
                  onLayout={(e) => setTimelineWidth(e.nativeEvent.layout.width)}
                  onPress={(e) => {
                    if (timelineWidth > 0 && duration > 0 && player) {
                      // fallback for web offsetX if locationX is undefined
                      const clickX = e.nativeEvent.locationX ?? (e.nativeEvent as any).offsetX;
                      if (clickX !== undefined) {
                        const newTime = (clickX / timelineWidth) * duration;
                        if (isFinite(newTime) && !isNaN(newTime)) {
                          player.currentTime = newTime;
                          if (doctorPlayer) doctorPlayer.currentTime = newTime;
                          setElapsed(newTime);
                        }
                      }
                      resetControlsTimeout();
                    }
                  }}
                >
                  <View style={styles.timelineBackground}>
                    <View style={[styles.timelineProgress, { width: `${progressPercent}%` }]} />
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </Pressable>

        {/* Session Info Section - Hidden in Fullscreen */}
        {!isFullScreen && (
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>تفاصيل الجلسة</Text>
            <View style={styles.divider} />

            <View style={styles.row}>
              <View style={styles.iconTextRow}>
                <MaterialIcons name="person" size={20} color={colors.primary} />
                <Text style={styles.label}>الطبيب:</Text>
              </View>
              <Text style={styles.value}>{SESSION_INFO.doctorName}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.iconTextRow}>
                <MaterialIcons name="medical-services" size={20} color={colors.primary} />
                <Text style={styles.label}>التخصص:</Text>
              </View>
              <Text style={styles.value}>{SESSION_INFO.specialty}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.iconTextRow}>
                <MaterialIcons name="calendar-today" size={20} color={colors.primary} />
                <Text style={styles.label}>التاريخ:</Text>
              </View>
              <Text style={[styles.value, { direction: 'ltr' }]}>{SESSION_INFO.date}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.iconTextRow}>
                <MaterialIcons name="timer" size={20} color={colors.primary} />
                <Text style={styles.label}>المدة:</Text>
              </View>
              <Text style={styles.value}>{SESSION_INFO.duration}</Text>
            </View>
          </View>
        )}

      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
    backgroundColor: colors.surface,
  },
  iconButton: {
    padding: Spacing.one,
  },
  appBarTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: colors.onSurface,
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  contentFullScreen: {
    padding: 0,
    flexGrow: 1,
  },
  videoContainer: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    position: 'relative',
  },
  videoContainerFullScreen: {
    borderRadius: 0,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  normalVideoWrapper: {
    width: '100%',
  },
  fullScreenVideoWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  pipContainer: {
    position: 'absolute',
    top: Spacing.four,
    left: Spacing.four,
    width: 90,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#333',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  pipContainerFullScreen: {
    position: 'absolute',
    top: Spacing.six,
    left: Spacing.six,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#333',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  pipVideo: {
    width: '100%',
    height: '100%',
  },
  pipVideoFullScreen: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    padding: Spacing.four,
  },
  controlsHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  liveText: {
    fontFamily: Fonts.medium,
    color: '#FFF',
    fontSize: 12,
  },
  fullscreenButton: {
    padding: 4,
  },
  playPauseButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 40,
    padding: 12,
  },
  controlsFooter: {
    width: '100%',
  },
  timeRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontFamily: Fonts.medium,
    color: '#FFF',
    fontSize: 14,
  },
  timelineContainer: {
    height: 20,
    justifyContent: 'center',
  },
  timelineBackground: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timelineProgress: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  infoContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: Spacing.four,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    marginVertical: Spacing.three,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  iconTextRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing.two,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  value: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: colors.onSurface,
  },
});
