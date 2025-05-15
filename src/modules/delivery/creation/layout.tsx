import { DeliveryState, useDeliveryStore } from '@modules/delivery/store';
import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';

export const DeliveryCreationLayout = () => {
	const form = useForm<DeliveryState>({
		defaultValues: useDeliveryStore.getState(),
	});
	return (
		<FormProvider {...form}>
			<Stack
				initialRouteName={'route'}
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name='route' />
				<Stack.Screen name='details' />
				<Stack.Screen name='contacts' />
			</Stack>
		</FormProvider>
	);
};
