import { useFormValidate } from '@hooks/useFormValidate';
import { useShipmentStore } from '@modules/shipment';
import { shipmentCreationSchema } from '@modules/shipment/creation/schema';
import { ROUTES_SHIPMENT } from '@modules/shipment/routes';
import { DateISOSchema } from '@shared/schema';
import { RouteSchema } from '@shared/schema/location';
import { useRouter } from 'expo-router';
import { z } from 'zod';
const formRouteStep = shipmentCreationSchema.pick({
	route: true,
	date: true,
});

export type FormRouteStep = z.infer<typeof formRouteStep>;

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
		setValue('date.value', date, {
			shouldValidate: true,
		});

		clearErrors();
	};

	const onChangeDateType = (type: 'asap' | 'byDate') => {
		if (type === 'asap') {
			setValue('date.value', '');
		}

		setValue('date.type', type, {
			shouldValidate: true,
		});
		clearErrors();
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
