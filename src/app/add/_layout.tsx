import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from 'tamagui';

export default function CreationLayout() {
	const theme = useTheme();
	return (
		<Stack
			screenOptions={{
				gestureEnabled: true,
				headerTransparent: true,
				headerBackButtonMenuEnabled: true,
				headerBackButtonDisplayMode: 'minimal',
				headerBlurEffect: 'systemUltraThinMaterialDark',
				headerShadowVisible: true,
				headerBackTitleStyle: '',
				headerTitleStyle: {
					fontSize: 20,
					color: '#fff',
				},
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					title: 'Create Ad',
					gestureEnabled: true,
				}}
			/>
			<Stack.Screen
				name='[category]/index'
				options={{
					title: 'Choose route',
					gestureEnabled: true,
				}}
			/>
		</Stack>
	);
}
