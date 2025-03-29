import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
    name: "URI AI Lab Assistant",
    slug: "uri-ai-lab-assistant",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
        image: "./assets/icon.png",
        resizeMode: "contain",
        backgroundColor: "#003DA5"
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.uri.ailabassistant",
        buildNumber: "3",
        infoPlist: {
            NSMicrophoneUsageDescription: "This app needs access to the microphone to enable voice input for chat messages.",
            NSSpeechRecognitionUsageDescription: "This app needs access to speech recognition to convert voice input into text for chat messages."
        }
    },
    android: {
        package: "com.uri.ailabassistant",
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#003DA5"
        },
        permissions: [
            "android.permission.RECORD_AUDIO"
        ],
        versionCode: 3
    },
    web: {
        favicon: "./assets/icon.png"
    },
    extra: {
        eas: {
            projectId: "9b8c84db-f81e-429c-9aab-4d666b1054a4"
        },
        clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    }
}

export default config;
