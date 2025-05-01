import { IS_WEB } from '@/utils/platform';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

export const zustandStorage = createJSONStorage(() =>
	IS_WEB ? localStorage : AsyncStorage,
);
