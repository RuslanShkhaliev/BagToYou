import { useTheme } from '@tamagui/core';
import { Stack } from 'expo-router';
export default () => {
	const theme = useTheme();
	return (
		<Stack
			screenOptions={{
				presentation: 'modal',
				gestureEnabled: true,
				headerBackButtonDisplayMode: 'minimal',
				headerStyle: {
					backgroundColor: theme.bg.get(),
				},
				headerTitleStyle: {
					color: theme.textPrimary.get(),
				},
			}}
		>
			<Stack.Screen
				name='login'
				options={{
					animation: 'slide_from_right',
					headerTitle: 'Login',
				}}
			/>
			<Stack.Screen
				name='register'
				options={{
					animation: 'slide_from_right',
					headerTitle: 'Register',
				}}
			/>
		</Stack>
	);
};
