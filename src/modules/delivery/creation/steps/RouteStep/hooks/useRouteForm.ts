import { useFormValidate } from '@hooks/useFormValidate';
import { ROUTES_DELIVERY } from '@modules/delivery/routes';
import { deliveryCreationSchema } from '@modules/delivery/schema';
import { useDeliveryStore } from '@modules/delivery/store';
import { TransportType } from '@shared/enums';
import { DateRangeSchema, RouteSchema } from '@shared/schema';
import { useRouter } from 'expo-router';

const formRouteSchema = deliveryCreationSchema.pick({
	route: true,
	dates: true,
	transport: true,
});
export const useRouteForm = () => {
	const { updateState } = useDeliveryStore();
	const router = useRouter();

	const { control, handleSubmit, setValue, setError, clearErrors, ...rest } =
		useFormValidate({
			schema: formRouteSchema,
			onSuccess: (data) => {
				updateState(data);
				console.log(data);

				router.push(ROUTES_DELIVERY.CREATE.DETAILS);
			},
		});

	const onSelectRoute = (route: RouteSchema) => {
		clearErrors();

		setValue('route', route, {
			shouldValidate: true,
		});
	};

	const onSelectDates = (dates: DateRangeSchema) => {
		clearErrors();
		console.log(dates);

		setValue('dates', dates, {
			shouldValidate: true,
		});
	};
	const onSelectTransport = (transport: TransportType) => {
		setValue('transport', transport, {
			shouldValidate: true,
		});
	};
	return {
		onSelectRoute,
		onSelectDates,
		onSelectTransport,
		control,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		...rest,
	};
};
