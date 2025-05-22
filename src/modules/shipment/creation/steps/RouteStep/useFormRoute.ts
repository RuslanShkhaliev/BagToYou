import { useFormValidate } from '@hooks/useFormValidate';
import { useShipmentStore } from '@modules/shipment';
import { DateType } from '@modules/shipment/creation/interfaces';
import { ROUTES_SHIPMENT } from '@modules/shipment/routes';
import { DateISOSchema } from '@shared/schemas';
import { adShipmentCreateSchema } from '@shared/schemas/adShipment';
import { RouteSchema } from '@shared/schemas/common/location';
import { useRouter } from 'expo-router';

const formRouteStep = adShipmentCreateSchema.pick({
	route: true,
	date: true,
});

export const useFormRouteStep = () => {
	const { updateState } = useShipmentStore();
	const router = useRouter();

	const { control, handleSubmit, setValue, clearErrors, ...rest } =
		useFormValidate({
			schema: formRouteStep,
			onSuccess: (data) => {
				updateState(data);

				router.push(ROUTES_SHIPMENT.CREATE.PARCEL);
			},
		});

	const onSelectRoute = (route: RouteSchema) => {
		setValue('route', route);
		clearErrors();
	};

	const onSelectDate = (date: DateISOSchema) => {
		clearErrors();

		setValue('date.value', date, {
			shouldValidate: true,
		});
	};

	const onChangeDateType = (type: DateType) => {
		clearErrors();

		if (type === DateType.ASAP) {
			setValue('date.value', null, {
				shouldValidate: true,
			});
		}

		setValue('date.type', type, {
			shouldValidate: true,
		});
	};

	return {
		control,
		handleSubmit,
		setValue,
		clearErrors,
		...rest,
		onSelectRoute,
		onSelectDate,
		onChangeDateType,
	};
};
