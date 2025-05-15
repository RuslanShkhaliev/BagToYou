import { useFormValidate } from '@hooks/useFormValidate';
import { useRouter } from 'expo-router';
import { shipmentCreationSchema } from '../../schema';
import { useShipmentStore } from '../../store';

const formDetailsSchema = shipmentCreationSchema.pick({
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
				router.replace('/ads');
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
