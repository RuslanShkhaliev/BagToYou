import { useDeliveryStore } from '@modules/delivery/store';
import { AdDelivery } from '@shared/schemas/adDelivery';
import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';

export const DeliveryCreationLayout = () => {
	const form = useForm<AdDelivery>({
		defaultValues: useDeliveryStore.getState(),
	});
	return (
		<FormProvider {...form}>
			<Stack
				initialRouteName={'name'}
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name='name' />
				<Stack.Screen name='route' />
				<Stack.Screen name='details' />
			</Stack>
		</FormProvider>
	);
};
