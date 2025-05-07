import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_WEB } from '@utils/platform';
import { createJSONStorage } from 'zustand/middleware';

export const zustandStorage = createJSONStorage(() =>
	IS_WEB ? localStorage : AsyncStorage,
);
