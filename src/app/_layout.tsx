import { AuthProvider } from '@context/auth.context';
import { LayoutInsetsProvider } from '@context/layout-insets.context';
import { AppLayout } from '@layout/AppLayout';
import { queryClient } from '@shared/api';
import { QueryClientProvider } from '@tanstack/react-query';
import { delay } from '@utils/delay';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
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
						<AppLayout />
					</TamaguiProvider>
				</LayoutInsetsProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
}
