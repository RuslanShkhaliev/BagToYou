import { Stack } from 'expo-router';

export const CreationLayout = () => {
	return (
		<Stack
			initialRouteName={'index'}
			screenOptions={{
				headerShown: false,
			}}
		/>
	);
};
