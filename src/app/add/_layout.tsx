import { Stack } from 'expo-router';
import React from 'react';

export default function CreationLayout() {
	return (
		<Stack
			screenOptions={{
				gestureEnabled: true,
				headerTransparent: true,
				headerBackButtonMenuEnabled: true,
				headerBackButtonDisplayMode: 'minimal',
				headerBlurEffect: 'dark',
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
