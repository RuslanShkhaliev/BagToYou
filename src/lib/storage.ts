import AsyncStorage from '@react-native-async-storage/async-storage';
import { isWeb } from '@utils/platform';
import { createJSONStorage } from 'zustand/middleware';

export const zustandStorage = createJSONStorage(() =>
	isWeb ? localStorage : AsyncStorage,
);
