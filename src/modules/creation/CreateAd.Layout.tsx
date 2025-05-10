import { Stack } from 'expo-router';

export const CreateAdLayout = () => {
	return (
		<Stack
			initialRouteName={'index'}
			screenOptions={{
				headerShown: false,
			}}
		/>
	);
};
