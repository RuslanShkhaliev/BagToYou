import { useFormValidate } from '@hooks/useFormValidate';
import { useShipmentStore } from '@modules/shipment/creation/store';
import { ROUTES_SHIPMENT } from '@modules/shipment/routes';
import { ParcelInfo } from '@shared/schemas';
import { adShipmentCreateSchema } from '@shared/schemas/adShipment';
import { useRouter } from 'expo-router';

const formParcelSchema = adShipmentCreateSchema.pick({
	parcelInfo: true,
});

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
		onSuccess: (data) => {
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
