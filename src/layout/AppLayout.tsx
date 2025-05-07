import { Stack } from 'expo-router';
import { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, View, XStack } from 'tamagui';
export const AppLayout = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();

	const renderScreenWrapper = ({ children }: PropsWithChildren) => (
		<View
			style={{
				backgroundColor: theme.bg.val,
				flex: 1,
			}}
		>
			<XStack
				bg={'transparent'}
				height={insets.top}
			/>
			{children}
		</View>
	);

	return (
		<View
			style={{
				backgroundColor: theme.bg.val,
				flex: 1,
			}}
		>
			<Stack
				screenLayout={renderScreenWrapper}
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
			</Stack>
		</View>
	);
};
