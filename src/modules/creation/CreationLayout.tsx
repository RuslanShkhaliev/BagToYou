import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export const CreationLayout = () => {
	const theme = useTheme();
	return (
		<Stack
			initialRouteName={'index'}
			screenOptions={{
				headerShown: false,
			}}
		/>
	);
};
