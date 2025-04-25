import { Stack } from 'expo-router';

export default function RequestLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="sender" />
			<Stack.Screen name="receiver" />
		</Stack>
	);
}
