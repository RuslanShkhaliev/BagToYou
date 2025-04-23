import { AuthProvider } from '@/context/AuthContext';
import TamaguiProvider from '@/providers/TamaguiProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Header, Text } from 'tamagui';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
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
				<ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
					<Header>
						<Text>Header</Text>
					</Header>
					<Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
						<Stack.Screen name="(auth)" />
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" options={{ headerShown: false }} />
					</Stack>
					<StatusBar style="auto" />
				</ThemeProvider>
			</TamaguiProvider>
		</AuthProvider>
	);
}
