import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_WEB } from '@utils/platform';
import {
	browserLocalPersistence,
	getReactNativePersistence,
} from 'firebase/auth';

export const getPersistence = () => {
	return IS_WEB
		? browserLocalPersistence
		: getReactNativePersistence(AsyncStorage);
};
