import { useFormValidate } from '@hooks/useFormValidate';
import { ROUTES_DELIVERY } from '@modules/delivery/routes';
import { deliveryCreationSchema } from '@modules/delivery/schema';
import { useDeliveryStore } from '@modules/delivery/store';
import { TransportType } from '@shared/enums';
import { DateSchema, RouteSchema } from '@shared/schema';
import { useRouter } from 'expo-router';

const formRouteSchema = deliveryCreationSchema.pick({
	route: true,
	// dates: true,
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
				router.push(ROUTES_DELIVERY.CREATE.DETAILS);
			},
		});

	const onSelectRoute = (route: RouteSchema) => {
		setValue('route', route);
		clearErrors();
	};

	const onSelectDates = (dates: DateSchema[]) => {
		setValue('dates', {
			from: dates[0] || '',
			to: dates[1] || '',
		});
		clearErrors();
	};
	const onSelectTransport = (transport: TransportType) => {
		setValue('transport', transport);
		clearErrors();
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
