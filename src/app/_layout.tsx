import { AuthProvider } from '@/context/auth.context';
import { LayoutInsetsProvider } from '@/context/layout-insets.context';
import { queryClient } from '@/shared/api';
import { Portal } from '@/shared/constants';
import { delay } from '@/shared/utils/delay';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { PortalHost, TamaguiProvider, View } from 'tamagui';
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
						<View
							bg={'$bg'}
							style={{
								backgroundColor: '$bg',
								flex: 1,
							}}
						>
							<Stack
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen
									name='(tabs)'
									options={{
										animation: 'slide_from_left',
										gestureEnabled: true,
									}}
								/>
								<Stack.Screen
									name='(auth)'
									options={{
										presentation: 'modal',
										gestureEnabled: true,
									}}
								/>
								<Stack.Screen name='add' />
								<Stack.Screen
									name='(modals)'
									options={{
										presentation: 'modal',
									}}
								/>
							</Stack>
							<PortalHost name={Portal.Body} />
							<StatusBar style='auto' />
						</View>
					</TamaguiProvider>
				</LayoutInsetsProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
}
