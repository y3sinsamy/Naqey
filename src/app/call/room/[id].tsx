import { MaterialSymbol } from '@/components/ui/MaterialSymbol';
import { Fonts } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CallRoomScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeContext();
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [duration, setDuration] = useState(0);

  const remotePlayer = useVideoPlayer(require('@/assets/videos/doctor.mp4'), player => {
    player.loop = true;
    player.muted = true; // required for web autoplay
  });

  const localPlayer = useVideoPlayer(require('@/assets/videos/patient.mp4'), player => {
    player.loop = true;
    player.muted = true; // required for web autoplay
  });

  // Call play() after mount so the web DOM has rendered the VideoView
  // We depend on isVideoOff so that when the camera is re-enabled and the local VideoView remounts, we trigger play again.
  useEffect(() => {
    remotePlayer.play();
    if (!isVideoOff) {
      localPlayer.play();
    }
  }, [remotePlayer, localPlayer, isVideoOff]);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (controlsVisible) {
      timeout = setTimeout(() => {
        setControlsVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [controlsVisible]);

  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleControls = () => {
    setControlsVisible(!controlsVisible);
  };

  const endCall = () => {
    // Navigate back to the app (appointments or chat)
    router.dismissAll();
  };

  return (
    <View style={styles.container}>
      {/* Remote Video Placeholder (Doctor) */}
      <VideoView
        player={remotePlayer}
        style={[styles.absoluteFill, { width: '100%', height: '100%' }]}
        contentFit="cover"
        nativeControls={false}
        playsInline={true}
      />

      {/* Transparent overlay to capture taps for toggling controls */}
      <Pressable style={styles.absoluteFill} onPress={toggleControls} />

      {/* Local Video PiP (Patient) */}
      <View style={styles.localVideoContainer} pointerEvents="none">
        {isVideoOff ? (
          <View style={styles.videoOffPlaceholder}>
            <MaterialSymbol name="person_off" size={40} color="#fff" />
          </View>
        ) : (
          <VideoView
            player={localPlayer}
            style={styles.localVideo}
            contentFit="cover"
            nativeControls={false}
            playsInline={true}
          />
        )}
      </View>

      {/* Header Information */}
      {controlsVisible && (
        <SafeAreaView style={styles.headerSafeArea}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
              <MaterialSymbol name="fullscreen_exit" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.callInfo}>
              <Text style={styles.doctorName}>د. أحمد محمود</Text>
              <View style={styles.statusRow}>
                <Text style={styles.duration}>{formatDuration(duration)}</Text>
                <MaterialSymbol name="lock" size={12} color="#4ade80" />
                <MaterialSymbol name="signal_cellular_alt" size={14} color="#4ade80" />
              </View>
            </View>

            <View style={{ width: 44 }} />
          </View>
        </SafeAreaView>
      )}

      {/* Controls Overlay */}
      {controlsVisible && (
        <SafeAreaView style={styles.controlsSafeArea}>
          <View style={styles.controlsBar}>
            <TouchableOpacity
              style={[styles.controlButton, isSpeaker ? styles.controlButtonActive : styles.controlButtonInactive]}
              onPress={() => setIsSpeaker(!isSpeaker)}
            >
              <MaterialSymbol name={isSpeaker ? "volume_up" : "volume_off"} size={24} color={isSpeaker ? colors.primary : "#fff"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, isVideoOff ? styles.controlButtonActive : styles.controlButtonInactive]}
              onPress={() => setIsVideoOff(!isVideoOff)}
            >
              <MaterialSymbol name={isVideoOff ? "videocam_off" : "videocam"} size={24} color={isVideoOff ? colors.primary : "#fff"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, isMuted ? styles.controlButtonActive : styles.controlButtonInactive]}
              onPress={() => setIsMuted(!isMuted)}
            >
              <MaterialSymbol name={isMuted ? "mic_off" : "mic"} size={24} color={isMuted ? colors.primary : "#fff"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.endCallButton]}
              onPress={endCall}
            >
              <MaterialSymbol name="call_end" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  localVideoContainer: {
    position: 'absolute',
    bottom: 120, // above the controls
    right: 20,
    width: 110,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: '#1f2937',
  },
  localVideo: {
    width: '100%',
    height: '100%',
    transform: [{ scaleX: -1 }],
  },
  videoOffPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callInfo: {
    alignItems: 'center',
  },
  doctorName: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
  },
  duration: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: '#fff',
  },
  controlsSafeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  controlsBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonInactive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  controlButtonActive: {
    backgroundColor: '#fff', // White background when active (e.g. muted)
  },
  endCallButton: {
    backgroundColor: '#ef4444', // Red
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});
