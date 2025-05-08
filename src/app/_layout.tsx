import { AuthProvider } from '@context/auth.context';
import { LayoutInsetsProvider } from '@context/layout-insets.context';
import { queryClient } from '@shared/api';
import { themes } from '@shared/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { delay } from '@utils/delay';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';
import { TamaguiProvider, View } from 'tamagui';
import { config } from 'tamagui.config';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
	initialRouteName: '(tabs)',
};

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		delay(500).then(() => {
			if (loaded) {
				SplashScreen.hideAsync();
			}
		});
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<LayoutInsetsProvider>
					<TamaguiProvider config={config}>
						<StatusBar
							translucent
							barStyle='light-content'
							backgroundColor='transparent'
						/>
						<View
							style={{
								backgroundColor: themes.dark.bg.val,
								flex: 1,
							}}
						>
							<Stack
								screenOptions={{
									headerShown: false,
									headerBlurEffect: 'dark',
									headerTitleStyle: {
										color: themes.dark.textPrimary.val,
									},
									headerStyle: {
										backgroundColor: themes.dark.bg.val,
									},
								}}
							>
								<Stack.Screen name='(tabs)' />
								<Stack.Screen
									name='create'
									options={{
										gestureEnabled: true,
										gestureDirection: 'vertical',
										presentation: 'modal',
									}}
								/>
							</Stack>
						</View>
					</TamaguiProvider>
				</LayoutInsetsProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
}
