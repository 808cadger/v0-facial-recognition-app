# GlowAI

A mobile app built with [Capacitor](https://capacitorjs.com/) that wraps the GlowAI web application. The web frontend is hosted on Vercel and served inside a native Android shell.

---

## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Android Studio](https://developer.android.com/studio) (for Android builds)
- Android SDK with API level 22+ (minSdk) and API level 33+ (targetSdk)
- Java Development Kit (JDK) 17

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd quickapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Sync Capacitor

```bash
npx cap sync android
```

---

## Running on Android

### Option A: Open in Android Studio

```bash
npx cap open android
```

Then press **Run** (▶) in Android Studio to build and deploy to a device or emulator.

### Option B: Build an APK from the command line

```bash
cd android
./gradlew assembleDebug
```

The debug APK will be output to:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Building a Release APK

The release signing config uses the keystore at the project root (`glowai-release.keystore`).

```bash
cd android
./gradlew assembleRelease
```

The signed release APK will be output to:

```
android/app/build/outputs/apk/release/app-release.apk
```

> **Note:** Keep the keystore file and its credentials secure. Do not commit credentials to version control.

---

## Project Structure

```
quickapp/
├── android/                  # Native Android project (Capacitor)
│   └── app/
│       └── build.gradle      # Android build configuration
├── www/                      # Web assets (fallback / offline shell)
│   └── index.html
├── capacitor.config.json     # Capacitor configuration
├── package.json
└── glowai-release.keystore   # Release signing keystore
```

---

## Configuration

The app is configured to load the web app from Vercel via `capacitor.config.json`:

```json
{
  "appId": "com.glowai.app",
  "appName": "GlowAI",
  "webDir": "www",
  "server": {
    "androidScheme": "https",
    "url": "https://quickapp-three.vercel.app"
  }
}
```

To point the app at a different URL (e.g. a local dev server), update the `server.url` field and re-sync:

```bash
npx cap sync android
```

---

## Troubleshooting

- **Gradle build fails:** Make sure your Android SDK path is set correctly in `android/local.properties`.
- **App shows blank screen:** Check that the `server.url` in `capacitor.config.json` is reachable from the device.
- **Keystore not found:** Ensure `glowai-release.keystore` exists at the project root before running a release build.
