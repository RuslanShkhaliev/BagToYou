import AsyncStorage from '@react-native-async-storage/async-storage';
import { isWeb } from '@utils/platform';
import {
	browserLocalPersistence,
	getReactNativePersistence,
} from 'firebase/auth';

export const getPersistence = () => {
	return isWeb
		? browserLocalPersistence
		: getReactNativePersistence(AsyncStorage);
};
