import { Stack } from 'expo-router';
import { useTheme, View } from 'tamagui';

export const AppLayout = () => {
	const theme = useTheme();
	return (
		<View
			style={{
				backgroundColor: theme.bg.val,
				flex: 1,
			}}
		>
			<Stack
				screenOptions={{
					headerShown: false,
					headerBlurEffect: 'dark',
					headerTitleStyle: {
						color: theme.textPrimary.val,
					},
					headerStyle: {
						backgroundColor: theme.bg.val,
					},
				}}
			>
				<Stack.Screen name='(tabs)' />
				<Stack.Screen
					name='create'
					options={{
						gestureEnabled: true,
						gestureDirection: 'vertical',
						presentation: 'modal',
					}}
				/>
			</Stack>
		</View>
	);
};
