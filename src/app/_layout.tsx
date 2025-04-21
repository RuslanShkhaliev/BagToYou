import { AuthProvider, useAuth } from '@/context/AuthContext';
import TamaguiProvider from '@/providers/TamaguiProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
	});

	const { loading } = useAuth();
	useEffect(() => {
		console.log(loading);
	}, [loading]);

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
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<TamaguiProvider>
					<Stack>
						<Stack.Screen name="auth" />
						<Stack.Screen name="+not-found" />
					</Stack>
					<StatusBar style="auto" />
				</TamaguiProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}
