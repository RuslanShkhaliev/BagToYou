import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme, View } from 'tamagui';
export const AppLayout = () => {
	const theme = useTheme();
	return (
		<View
			style={{
				backgroundColor: 'red',
				flex: 1,
			}}
		>
			<Stack
				layout={({ children }) => (
					<View
						bg={'red'}
						flex={1}
					>
						{children}
					</View>
				)}
				screenOptions={{
					headerShown: false,
					headerStyle: {
						backgroundColor: theme.bg.val,
					},
				}}
			>
				<Stack.Screen
					name='(tabs)'
					options={{
						animation: 'slide_from_left',
						gestureEnabled: true,
					}}
				/>
				<Stack.Screen
					name='register/index'
					options={{
						headerShown: true,
						presentation: 'modal',
						gestureEnabled: true,
						headerBackButtonDisplayMode: 'minimal',
						headerStyle: {
							backgroundColor: theme.bg.val,
						},
						headerTitleStyle: {
							color: theme.textPrimary.val,
						},
						headerTitle: 'Register',
						headerLargeTitle: true,
					}}
				/>
				<Stack.Screen name='add' />
			</Stack>
			<StatusBar style='auto' />
		</View>
	);
};
