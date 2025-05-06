import { useRouteBackward } from '@/hooks';
import { LocationSearchModal } from '@/modals/LocationSearchModal';
import { RouteSelection, useDeliveryStore } from '@/modules/delivery/store';

export const DeliverySearchLocations = () => {
	const store = useDeliveryStore();
	const { goBack } = useRouteBackward();
	const onComplete = (route: RouteSelection) => {
		store.updateState({ route });
		goBack();
	};
	return (
		<LocationSearchModal
			initialRoute={store.route}
			onComplete={onComplete}
			onClose={goBack}
		/>
	);
};
