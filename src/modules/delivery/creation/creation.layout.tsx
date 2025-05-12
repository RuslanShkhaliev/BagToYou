import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { DeliveryStore, useDeliveryStore } from './store';

export const DeliveryCreationLayout = () => {
	const form = useForm<DeliveryStore>({
		defaultValues: useDeliveryStore.getState(),
	});

	return (
		<FormProvider {...form}>
			<Stack
				initialRouteName={'route'}
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name={'route'} />
				<Stack.Screen name={'contacts'} />
				<Stack.Screen name={'parcel'} />
			</Stack>
		</FormProvider>
	);
};
