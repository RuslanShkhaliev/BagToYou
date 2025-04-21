import { defaultConfig } from '@tamagui/config/v4';
import { getConfig } from '@tamagui/core';
import { createTamagui } from 'tamagui';

export const config = createTamagui(defaultConfig);

console.log(getConfig());
type CustomConfig = typeof config;

// ensure types work
declare module 'tamagui' {
	interface TamaguiCustomConfig extends CustomConfig {}
}
