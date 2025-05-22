import { useFormValidate } from '@hooks/useFormValidate';
import { ROUTES_SHIPMENT } from '@modules/shipment/routes';
import { adShipmentCreateSchema } from '@shared/schemas/adShipment';
import { useRouter } from 'expo-router';
import { useShipmentStore } from '../../store';

const formDetailsSchema = adShipmentCreateSchema.pick({
	media: true,
	description: true,
	rewards: true,
});
export const useDetailsForm = () => {
	const { updateState } = useShipmentStore();
	const router = useRouter();
	const { control, handleSubmit, setError, clearErrors, ...rest } =
		useFormValidate({
			schema: formDetailsSchema,
			onSuccess: (data) => {
				updateState(data);
				router.replace(ROUTES_SHIPMENT.CREATE.CONTACTS);
			},
		});

	return {
		control,
		handleSubmit,
		setError,
		clearErrors,
		...rest,
	};
};
