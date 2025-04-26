import { dark, light } from '@/styles/themes';
import { tokens } from '@/styles/tokens';
import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

export const config = createTamagui({
	...defaultConfig,
	tokens: {
		...defaultConfig.tokens,
		...tokens,
	},
	themes: {
		...defaultConfig.themes,
		dark,
		light,
	},
});

export type CustomConfig = typeof config;

// declare module 'tamagui' {
// 	interface TamaguiCustomConfig extends CustomConfig {}
// }
