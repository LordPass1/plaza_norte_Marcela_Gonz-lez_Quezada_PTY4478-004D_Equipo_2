import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Gardensync',
  webDir: 'www',
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com", "apple.com", "facebook.com"] // Añade los proveedores que uses
    }
  },
  ios: {
    scheme: 'App'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
