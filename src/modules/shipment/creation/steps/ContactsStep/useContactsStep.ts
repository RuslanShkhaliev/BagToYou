import { useFormValidate } from '@hooks/useFormValidate';
import { useCreateShipmentMutation } from '@modules/shipment/creation/queries';
import { useShipmentStore } from '@modules/shipment/creation/store';
import {
	AdShipmentCreate,
	adShipmentCreateSchema,
} from '@shared/schemas/adShipment';
import { useRouter } from 'expo-router';

export const contactsStepSchema = adShipmentCreateSchema.pick({
	senderInfo: true,
	recipientInfo: true,
});

export const useContactsStep = () => {
	const router = useRouter();
	const { updateState, reset } = useShipmentStore();
	const { mutateAsync, isPending } = useCreateShipmentMutation();

	const publishAd = async (data: AdShipmentCreate) => {
		try {
			await mutateAsync(data);
			reset();
			router.push('/(tabs)/ads');
			// TODO toast
		} catch (error) {
			// TODO toast error
			console.error('Error publishing ad:', error);
			return false;
		}
	};

	const { control, handleSubmit, setValue, ...rest } = useFormValidate({
		schema: contactsStepSchema,
		onSuccess: (update) => {
			updateState(update);
			const { success, data, error } = adShipmentCreateSchema.safeParse(
				useShipmentStore.getState(),
			);

			if (success) {
				publishAd(data);
			} else {
				// TODO toast error
			}
		},
	});

	return {
		setValue,
		control,
		handleSubmit,
		isPending,
		...rest,
	};
};
