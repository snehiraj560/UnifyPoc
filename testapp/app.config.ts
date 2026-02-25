import type { ExpoConfig } from 'expo/config';

const EAS_PROJECT_ID = 'b8176fca-0998-4e9c-9db3-213c549f2d46';

const config: ExpoConfig = {
  name: 'testapp',
  slug: 'unifyapp',
  owner: 'pocpractice',
  extra: {
    eas: {
      projectId: EAS_PROJECT_ID,
    },
  },
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  runtimeVersion: {
    policy: 'fingerprint',
  },
  updates: {
    enabled: true,
    checkAutomatically: 'ON_LOAD',
    fallbackToCacheTimeout: 0,
    url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
};

export default { expo: config };
