# HubiChat Mobile App - React Native

A React Native implementation of the HubiChat mobile application, providing a native mobile experience wrapping the HubiChat website (https://hubi.chat).

## 📱 Features

- **Cross-platform**: Single codebase for both iOS and Android
- **WebView Integration**: Seamlessly integrates the HubiChat website
- **Native Navigation Bar**: Bottom tab navigation with 6 main sections
- **Push Notifications**: Firebase Cloud Messaging integration
- **Offline Handling**: Robust network error handling and retry mechanisms
- **Splash Screen**: Branded loading screen with HubiChat branding
- **Performance Optimized**: Optimized WebView settings for mobile

## 🏗️ Architecture

### Navigation Structure
- **Home** (`/`) - Dashboard and main content
- **Matches** (`/discover-matches`) - User matching interface
- **Messages** (`/messages`) - In-app messaging system
- **Search** (`/search`) - Profile search functionality
- **Community** (`/community`) - Community features and forums
- **Profile** (`/profile`) - User profile management

### Key Components
- `App.tsx` - Main application component with navigation
- `WebViewScreen.tsx` - WebView wrapper with error handling
- `LoadingScreen.tsx` - Branded splash/loading screen
- `ErrorScreen.tsx` - Network error handling screen

### Utilities
- `networkUtils.ts` - Network connectivity and validation
- `pushNotifications.ts` - Firebase messaging integration

## 🚀 Installation

### Prerequisites
- Node.js (>= 16)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Setup
1. Install dependencies:
```bash
npm install
```

2. iOS setup:
```bash
cd ios && pod install && cd ..
```

3. Run the application:
```bash
# iOS
npm run ios

# Android
npm run android
```

## 🔧 Configuration

### Firebase Setup
1. Add your `google-services.json` (Android) to `android/app/`
2. Add your `GoogleService-Info.plist` (iOS) to `ios/`
3. Update notification service endpoints in `pushNotifications.ts`

### Assets
- Add the HubiChat logo to `src/assets/logo.png` (120x120px)
- Update app icons in respective platform directories

## 📦 Dependencies

### Core Dependencies
- React Native 0.73.0
- React Navigation 6.x
- React Native WebView
- Firebase Messaging
- Vector Icons

### Development Dependencies
- TypeScript
- Babel
- Metro
- ESLint

## 🧪 Testing

Run syntax validation:
```bash
node validate-syntax.js
```

## 🏪 App Store Deployment

### Build for Production

**iOS:**
```bash
npm run build:ios
```

**Android:**
```bash
npm run build:android
```

### App Store Requirements Met
- ✅ iOS 13.0+ support
- ✅ Android 8.0+ support
- ✅ HTTPS-only communication
- ✅ Native UI shell
- ✅ WebView security measures
- ✅ Push notification support
- ✅ Offline error handling
- ✅ Performance optimizations

## 🔐 Security Features

- HTTPS-only communication with hubi.chat
- URL validation for WebView navigation
- Secure cookie handling
- No external link navigation
- AbortController for network timeouts

## 📄 File Structure

```
react-native/
├── App.tsx                 # Main application component
├── src/
│   ├── components/
│   │   ├── WebViewScreen.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── ErrorScreen.tsx
│   ├── utils/
│   │   ├── networkUtils.ts
│   │   └── pushNotifications.ts
│   └── assets/
│       └── logo.png (to be added)
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
└── README.md
```

## 🚧 Development Status

**Completed:**
- ✅ Basic project structure
- ✅ Navigation implementation
- ✅ WebView integration
- ✅ Error handling
- ✅ Push notifications setup
- ✅ Network utilities
- ✅ Syntax validation

**Pending:**
- 🔄 Firebase configuration
- 🔄 App store assets
- 🔄 Platform-specific configurations
- 🔄 Testing on physical devices

## 📞 Support

For questions about this implementation, refer to the original HubiChat Mobile Application Development Prompt or contact the development team.
