import { AdShipmentCreate } from '@shared/schemas/adShipment';
import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { useShipmentStore } from './store';

export const ShipmentCreationLayout = () => {
	const form = useForm<AdShipmentCreate>({
		defaultValues: useShipmentStore.getState(),
		reValidateMode: 'onChange',
	});

	return (
		<FormProvider {...form}>
			<Stack
				initialRouteName={'name'}
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name={'name'} />
				<Stack.Screen name={'route'} />
				<Stack.Screen name={'contacts'} />
				<Stack.Screen name={'details'} />
			</Stack>
		</FormProvider>
	);
};
