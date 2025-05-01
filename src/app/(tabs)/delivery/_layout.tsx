import { Stack } from 'expo-router';

export default function DeliverLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='index' />
			<Stack.Screen name='step2' />
		</Stack>
	);
}
