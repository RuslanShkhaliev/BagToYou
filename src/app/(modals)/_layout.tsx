import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default function ModalsLayout() {
	const theme = useTheme();
	return (
		<Stack
			screenOptions={{
				gestureEnabled: true,
				presentation: 'modal',
				headerTitle: 'Choose route',
				headerTitleStyle: {
					color: theme.textPrimary.val,
				},
				headerStyle: {
					backgroundColor: theme.bg.val,
				},
			}}
		>
			<Stack.Screen
				name='delivery-search-location'
				options={{}}
			/>
			<Stack.Screen
				name='search-location'
				options={{
					headerBackButtonDisplayMode: 'minimal',
				}}
			/>
		</Stack>
	);
}
