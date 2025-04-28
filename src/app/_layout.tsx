import { AppHeader } from '@/components/AppHeader';
import { AuthProvider } from '@/context/AuthContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider, View } from 'tamagui';
import { config } from 'tamagui.config';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<AuthProvider>
			<TamaguiProvider config={config}>
				<SafeAreaProvider>
					<AppHeader />

					<View flex={1} backgroundColor="$bgMain">
						<Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
							<Stack.Screen name="(auth)" />
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
							<Stack.Screen name="+not-found" options={{ headerShown: false }} />
						</Stack>
						<StatusBar style="auto" />
					</View>
				</SafeAreaProvider>
			</TamaguiProvider>
		</AuthProvider>
	);
}
