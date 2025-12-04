# React Native THEOplayer App

A React Native application integrated with THEOplayer v9.0.0 for video playback.

## Prerequisites

Before you begin, ensure you have the following installed on your Windows machine:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **JDK 17** - [Download](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- **Android Studio** - [Download](https://developer.android.com/studio)
- **Git** - [Download](https://git-scm.com/download/win)

## Android Studio Setup

1. **Install Android Studio** and open it
2. Go to **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**
3. Install the following:
   - Android SDK Platform 35
   - Android SDK Build-Tools 34.0.0
   - Android SDK Command-line Tools
   - Android Emulator
   - Android SDK Platform-Tools

4. **Set Environment Variables:**
   - Open **System Environment Variables**
   - Add/Update the following:
     ```
     ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
     JAVA_HOME = C:\Program Files\Java\jdk-17
     ```
   - Add to **Path**:
     ```
     %ANDROID_HOME%\platform-tools
     %ANDROID_HOME%\tools
     %ANDROID_HOME%\tools\bin
     %JAVA_HOME%\bin
     ```

5. **Create an Android Virtual Device (AVD):**
   - Open Android Studio → **Device Manager**
   - Click **Create Device**
   - Select a device (e.g., Pixel 5)
   - Select System Image: **Android 12 (API Level 31)** or higher
   - Click **Finish**

## Installation Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd path\to\MyApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This will automatically apply the patches to `react-native-theoplayer` using `patch-package`.

3. **Install iOS dependencies (if on macOS):**
   ```bash
   cd ios
   pod install
   cd ..
   ```
   
   **Note:** The Podfile includes a pre-install hook for the Youbora connector to properly link with THEOplayerSDK.

## Youbora Analytics Integration

This project includes **Youbora analytics connector** (`@theoplayer/react-native-analytics-youbora`) for tracking video playback analytics.

### Configuration

The Youbora connector is configured in `App.tsx`:

```typescript
const youboraOptions: youbora.Options = {
  accountCode: 'powerdev', // Replace with your account code
  'content.isLive': false,
  'content.title': 'Video Title',
  'content.duration': 596,
};
```

**Replace `'powerdev'` with your actual Youbora account code.**

### Features

- Automatic tracking of playback events
- Content metadata reporting
- Error tracking
- Debug logging support

## Running the Application

### Start Metro Bundler

Open a terminal and run:
```bash
npm start
```

Keep this terminal running.

### Run on Android

Open a **new terminal** and run:
```bash
npm run android
```

Or alternatively:
```bash
npx react-native run-android
```

This will:
- Build the Android app
- Install it on the emulator or connected device
- Launch the app

### Run on iOS (macOS only)

```bash
npm run ios
```

Or:
```bash
npx react-native run-ios
```

## Important Notes for THEOplayer v9.0.0

### Patches Applied with patch-package

This project uses `patch-package` to automatically apply fixes for compatibility issues with react-native-theoplayer v9.0.0. The patches are stored in the `patches/` directory and are automatically applied when you run `npm install`.

**Patches include:**

1. **KeySystemAdapter.kt** - Added CLEAR_KEY case to the when expression
2. **SourceAdapter.kt** - Fixed type mismatch by changing `HashMap<String, Any>` to `MutableMap<String, Any?>`

These patches are preserved even after running `npm install` or `npm ci`.

**Note:** If you need to modify the patches:
1. Make changes directly in `node_modules/react-native-theoplayer/`
2. Run `npx patch-package react-native-theoplayer`
3. Commit the updated patch file in the `patches/` directory

### Build Configuration

The following configurations have been applied:

- **Android SDK**: 35
- **Kotlin Version**: 1.9.10
- **Android Gradle Plugin**: 8.3.0
- **Min SDK**: 23
- **Target SDK**: 35

## Troubleshooting

### Build Fails with Kotlin Errors

If you encounter Kotlin compilation errors:
```bash
cd android
gradlew clean
cd ..
npm run android
```

### Metro Bundler Issues

If Metro bundler has issues:
```bash
npm start -- --reset-cache
```

### Cannot Connect to Development Server

1. Ensure your emulator and development machine are on the same network
2. Check if Metro bundler is running
3. Try reloading the app: Press `R` twice in the emulator

### Black Screen on Android

1. Check Metro bundler terminal for errors
2. Open the app and shake the device (Ctrl+M on emulator)
3. Select "Reload"
4. Check the debug console for status messages

### Missing Environment Variables

Restart your computer after setting environment variables for them to take effect.

## Project Structure

```
MyApp/
├── android/               # Android native code
├── ios/                   # iOS native code (macOS only)
├── node_modules/          # Dependencies
├── App.tsx               # Main app component with THEOplayer
├── package.json          # Project dependencies
└── README.md            # This file
```

## THEOplayer Configuration

The app is configured with a THEOplayer license. You can update the license in `App.tsx`:

```typescript
const playerConfig = {
  license: 'YOUR_LICENSE_KEY_HERE',
};
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS (macOS only)
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Support

For THEOplayer documentation and support, visit:
- [THEOplayer Documentation](https://docs.theoplayer.com/)
- [React Native THEOplayer](https://github.com/THEOplayer/react-native-theoplayer)

## License

This project uses THEOplayer which requires a valid license for production use.

---

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
