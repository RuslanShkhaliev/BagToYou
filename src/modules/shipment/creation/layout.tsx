import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { ShipmentCreationSchema } from './schema';
import { useShipmentStore } from './store';

export const ShipmentCreationLayout = () => {
	const form = useForm<ShipmentCreationSchema>({
		defaultValues: useShipmentStore.getState(),
		reValidateMode: 'onChange',
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
				<Stack.Screen name={'details'} />
			</Stack>
		</FormProvider>
	);
};
