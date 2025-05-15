import { useFormValidate } from '@hooks/useFormValidate';
import { useShipmentStore } from '@modules/shipment/creation/store';
import { ROUTES_SHIPMENT } from '@modules/shipment/routes';
import { ParcelInfo, parcelInfoSchema } from '@shared/schema';
import { useRouter } from 'expo-router';
import { z } from 'zod';

const formParcelSchema = z.object({
	parcelInfo: parcelInfoSchema,
});

export type FormParcelSchema = z.infer<typeof formParcelSchema>;

export const useFormParcelStep = () => {
	const { updateState } = useShipmentStore();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		setValue,
		clearErrors,
		errors,
		watch,
		...rest
	} = useFormValidate({
		schema: formParcelSchema,
		onSuccess: (data: FormParcelSchema) => {
			updateState(data);
			router.push(ROUTES_SHIPMENT.CREATE.DETAILS);
		},
	});

	const parcel = watch('parcelInfo');

	const onSelectParcel = (parcel: ParcelInfo) => {
		setValue('parcelInfo', parcel, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
		clearErrors();
	};

	return {
		control,
		handleSubmit,
		errors,
		onSelectParcel,
		parcel,
		...rest,
	};
};
