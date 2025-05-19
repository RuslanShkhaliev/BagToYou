import { useDeliveryStore } from '@modules/delivery/store';
import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { DeliveryCreationSchema } from '../schema';

export const DeliveryCreationLayout = () => {
	const form = useForm<DeliveryCreationSchema>({
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
