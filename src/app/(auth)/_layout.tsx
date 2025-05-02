import { Stack } from 'expo-router';

export default () => {
	return <Stack
		screenOptions={{
			presentation: 'modal',
			gestureEnabled: true,
			headerShown: false,
		}}
	/>;
}
