import { AppHeader } from '@/components/AppHeader';
import { AuthProvider } from '@/context/AuthContext';
import TamaguiProvider from '@/providers/TamaguiProvider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View } from 'tamagui';

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
			<TamaguiProvider>
				<View flex={1} backgroundColor="$bg.main">
					<AppHeader></AppHeader>
					<Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
						<Stack.Screen name="(auth)" />
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" options={{ headerShown: false }} />
					</Stack>

					<StatusBar style="auto" />
				</View>
			</TamaguiProvider>
		</AuthProvider>
	);
}
