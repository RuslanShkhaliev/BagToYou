import { useFormValidate } from '@hooks/useFormValidate';
import { shipmentCreationSchema } from '@modules/shipment/creation/schema';
import { z } from 'zod';

export const contactsStepSchema = shipmentCreationSchema.pick({
	senderInfo: true,
	recipientInfo: true,
});

export type ContactsStepSchema = z.infer<typeof contactsStepSchema>;

export const useContactsStep = () => {
	const { control, handleSubmit, setValue, ...rest } = useFormValidate({
		schema: contactsStepSchema,
		onSuccess: (data) => {
			console.log({ data });
		},
	});

	return {
		setValue,
		control,
		handleSubmit,
		...rest,
	};
};
