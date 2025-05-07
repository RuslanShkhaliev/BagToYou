import { Stack } from 'expo-router';

export default function ProfileLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				animation: 'slide_from_right',
			}}
		>
			<Stack.Screen name='index' />
			<Stack.Screen
				name='settings'
				options={{
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
}
