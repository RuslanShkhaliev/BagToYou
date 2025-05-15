import { useFormValidate } from '@hooks/useFormValidate';
import { useShipmentStore } from '@modules/shipment';
import { shipmentCreationSchema } from '@modules/shipment/creation/schema';
import { ROUTES_SHIPMENT } from '@modules/shipment/routes';
import { DateSchema } from '@shared/schema';
import { RouteSchema } from '@shared/schema/location';
import { useRouter } from 'expo-router';
import { z } from 'zod';
const formRouteStep = shipmentCreationSchema.pick({
	route: true,
	dates: true,
});

export type FormRouteStep = z.infer<typeof formRouteStep>;

export const useFormRouteStep = () => {
	const { updateState } = useShipmentStore();
	const router = useRouter();

	const { control, handleSubmit, setValue, clearErrors, errors } =
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

	const onSelectDates = (dates: DateSchema[]) => {
		setValue('dates', {
			from: dates[0],
			to: dates[1],
		});
		clearErrors();
	};

	return {
		control,
		handleSubmit,
		setValue,
		errors,
		onSelectRoute,
		onSelectDates,
	};
};
