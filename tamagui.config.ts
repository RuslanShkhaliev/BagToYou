import { defaultConfig } from '@tamagui/config/v4';
import { getConfig } from '@tamagui/core';
import { createTamagui } from 'tamagui';

export const light = {
	background: '$gray0',
	backgroundHover: '$gray1',
	backgroundPress: '$gray2',
	borderColor: '$gray3',
	color: '$textPrimary',

	primary: '$blue',
	primaryHover: '$blueHover',
	text: '$textPrimary',
	textSecondary: '$textSecondary',
};

export const dark = {
	background: '$gray7',
	backgroundHover: '$gray6',
	backgroundPress: '$gray5',
	borderColor: '$gray4',
	color: '$textOnDark',

	primary: '$blue',
	primaryHover: '$blueHover',
	text: '$textOnDark',
	textSecondary: '$gray4',
};

export const config = createTamagui({
	...defaultConfig,
	tokens: {
		...defaultConfig.tokens,
		radius: {
			...defaultConfig.tokens.radius,
			7.5: 20,
		},
	},
	themes: {
		dark,
		light,
	},
});

type CustomConfig = typeof config;

declare module 'tamagui' {
	interface TamaguiCustomConfig extends CustomConfig {}
}
