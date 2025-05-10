import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
// Определяем, находимся ли мы на сервере
export const isServer = typeof window === 'undefined';

// Определяем, находимся ли мы в нативном окружении
export const isNative = Platform.OS !== 'web';

// Определяем, находимся ли мы в браузере
export const isBrowser = !isServer && !isNative;
