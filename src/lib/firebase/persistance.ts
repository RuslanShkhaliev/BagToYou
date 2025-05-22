import AsyncStorage from '@react-native-async-storage/async-storage';
import { isWeb } from '@utils/platform';
import {
	browserLocalPersistence,
	getReactNativePersistence,
	inMemoryPersistence,
} from 'firebase/auth';

export const getPersistence = () => {
	if (isWeb) {
		return browserLocalPersistence;
	}

	try {
		return getReactNativePersistence(AsyncStorage);
	} catch (error) {
		console.error('Error setting up persistence:', error);
		return inMemoryPersistence;
	}
};
