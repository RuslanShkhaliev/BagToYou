import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { useDeliveryStore } from './store';

export const DeliveryCreationLayout = () => {
	const form = useForm({
		defaultValues: useDeliveryStore.getState(),
	});

	return (
		<FormProvider {...form}>
			<Stack
				initialRouteName={'index'}
				screenOptions={{
					headerShown: false,
				}}
			/>
		</FormProvider>
	);
};
