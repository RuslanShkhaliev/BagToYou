import { useFormValidate } from '@hooks/useFormValidate';
import { shipmentCreationSchema } from '@modules/shipment/creation/schema';
import { useShipmentStore } from '@modules/shipment/creation/store';
import { useRouter } from 'expo-router';
import { z } from 'zod';

export const contactsStepSchema = shipmentCreationSchema.pick({
	senderInfo: true,
	recipientInfo: true,
});

export type ContactsStepSchema = z.infer<typeof contactsStepSchema>;

export const useContactsStep = () => {
	const router = useRouter();
	const { updateState } = useShipmentStore();
	const { control, handleSubmit, setValue, ...rest } = useFormValidate({
		schema: contactsStepSchema,
		onSuccess: (data) => {
			updateState(data);
			router.replace('/ads');
		},
	});

	return {
		setValue,
		control,
		handleSubmit,
		...rest,
	};
};
