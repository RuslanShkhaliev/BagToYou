import { themes } from '@/shared/styles/themes';
import { tokens } from '@/shared/styles/tokens';
import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

export const config = createTamagui({
	...defaultConfig,
	tokens: {
		...defaultConfig.tokens,
		...tokens,
	},
	themes,
});

export type Conf = typeof config;

declare module 'tamagui' {
	interface TamaguiCustomConfig extends Conf {}
}
