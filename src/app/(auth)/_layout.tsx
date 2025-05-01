import { Stack } from 'expo-router';

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				headerBackButtonDisplayMode: 'minimal',
				animation: 'fade',
			}}
		>
			<Stack.Screen
				name='login'
				options={{ title: 'Вход' }}
			/>
			<Stack.Screen
				name='register'
				options={{ title: 'Регистрация' }}
			/>
		</Stack>
	);
}
