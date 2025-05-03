import { AuthProvider } from '@/context/AuthContext';
import { delay } from '@/utils/delay';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TamaguiProvider, View } from 'tamagui';
import { config } from 'tamagui.config';

SplashScreen.preventAutoHideAsync();

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
	const queryClient = new QueryClient();

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<TamaguiProvider config={config}>
					<SafeAreaProvider>
						<View
							bg={'$bg'}
							flex={1}
						>
							<Stack
								screenOptions={{
									headerShown: false,
									animation: 'slide_from_right',
								}}
							>
								<Stack.Screen name='(tabs)' />
								<Stack.Screen
									name='(auth)'
									options={{
										presentation: 'modal',
										animation: 'slide_from_bottom',
									}}
								/>
							</Stack>
							<StatusBar style='auto' />
						</View>
					</SafeAreaProvider>
				</TamaguiProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
}
