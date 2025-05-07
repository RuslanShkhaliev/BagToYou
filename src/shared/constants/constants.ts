import { Platform } from 'react-native';

export enum Portal {
	Body = 'portal-body',
	TabBar = 'portal-tabBar',
}

export const IS_WEB = Platform.OS === 'web';
