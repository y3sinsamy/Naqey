<div align="center">

  # Naqey (نقي)
  
  **Your Companion to Recovery compulsive behavior addiction**

  Naqey is a comprehensive addiction and compulsive behavior recovery mobile application built with React Native and Expo. It bridges the gap between individuals seeking help and specialized therapists, while providing a suite of daily interactive tools to assist in the recovery journey.

  [Features](#-features) •
  [Tech Stack](#%EF%B8%8F-tech-stack) •
  [Installation](#-installation--setup) •
  [App Structure](#-app-structure)
</div>

<br/>

## ✨ Features

- **🧑‍⚕️ Telehealth & Consultations**
  - Book and manage appointments with certified therapists.
  - In-app high-quality **Video & Audio Calls**.
  - Advanced **Call Room** with Picture-in-Picture (PiP) for doctor feeds and interactive controls.
  - **Session Replay:** Watch recorded sessions securely with timeline scrubbing and native full-screen support.

- **🧘 Recovery & Self-Care Tools**
  - **Breathing Exercises:** Interactive animations to help users manage anxiety and cravings in real-time.
  - **Journaling & Braindump:** A safe space to write down thoughts, track moods, and reflect on the recovery process.
  - **Educational Resources:** A rich library of articles and guides related to mental health and addiction.

- **🎨 Designed for the Arab User**
  - First-class **Right-to-Left (RTL)** layout and typography.
  - A calming, modern UI tailored to reduce cognitive load and provide a safe psychological environment.

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 52+)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Video/Media:** `expo-video` for native, hardware-accelerated video rendering (SurfaceView & TextureView).
- **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) for fluid, 60fps micro-animations.
- **Styling:** Custom dynamic theming system (`use-theme`) ensuring a premium, polished look.

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Expo CLI
- Expo Go app on your physical device, or an Android/iOS emulator.

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/naqey/naqey-app.git
   cd naqey-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device**
   - Open the **Expo Go** app on your phone and scan the QR code from the terminal.
   - Or press `a` in the terminal to launch the Android emulator.

## 📂 App Structure

```
src/
├── app/                      # Expo Router Pages & Navigation
│   ├── (tabs)/               # Bottom Tab Screens (Home, Recovery, Doctors, Articles, Profile)
│   ├── _layout.tsx           # Global Root Layout & Providers
│   ├── index.tsx             # Entry point / Splash Handler
│   ├── login.tsx             # Authentication Screen
│   ├── onboarding/           # Multi-step Onboarding Flow
│   ├── call/                 # Telehealth features
│   │   ├── preview/[id].tsx  # Call preparation & device check
│   │   └── room/[id].tsx     # Main PiP Video Call Room
│   ├── booking/              # Doctor booking & payment flow
│   ├── chat/                 # Text messaging with therapists
│   ├── profile/              # User settings and profile management
│   │   └── appointments/     # Session history & Video Replays (replay.tsx)
│   └── recovery/             # Interactive mental health tools
│       ├── exercises/        # Breathing & relaxation animations
│       └── journal/          # Cognitive Braindump & mood tracking
├── components/               # Reusable UI & Components
│   ├── ui/                   # Primitive UI (Buttons, Cards, Inputs)
│   ├── onboarding/           # Specialized components for onboarding
│   └── themed-*.tsx          # Custom themed core components
├── constants/                # App-wide constants
│   ├── theme.ts              # Colors, Spacing, Typography & Tokens
│   └── Colors.ts             # Legacy / Fallback color definitions
├── data/                     # Mock data & Static JSON files (Doctors, Articles)
├── hooks/                    # Custom React Hooks
│   ├── use-theme.tsx         # Dynamic Theme Context Provider
│   └── useColorScheme.ts     # System dark/light mode hook
├── store/                    # State management (Zustand/Context)
└── assets/                   # Static media files
    ├── fonts/                # Custom Arabic typography (e.g., SpaceMono)
    ├── images/               # Logos, splash screens, icons
    └── videos/               # Local mock videos (patient.mp4, doctor.mp4)
```

## 🔒 Privacy & Security

Naqey handles sensitive mental health data. All session recordings and journal entries are designed to be securely handled and comply with standard telehealth privacy guidelines.

---

<div align="center">
  <i>Made with ❤️ for a better, healthier tomorrow.</i>
</div>
