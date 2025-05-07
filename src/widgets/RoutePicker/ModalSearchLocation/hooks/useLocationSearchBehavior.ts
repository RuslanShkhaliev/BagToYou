import { RouteSelection } from '@modules/delivery';
import { Location } from '@shared/schema';
import { RouteFieldRef } from '@widgets/RoutePicker/components/RouteField';
import { fromIsActive, toIsActive } from '@widgets/RoutePicker/helpers';
import { InputTargetType } from '@widgets/RoutePicker/types';

export interface UseLocationSearchBehaviorProps {
	route: RouteSelection;
	inputTarget: InputTargetType;
	inputFromRef: React.RefObject<RouteFieldRef>;
	inputToRef: React.RefObject<RouteFieldRef>;
	onSelect: (city: string, newRoute: RouteSelection) => void;
	onComplete?: (newRoute: RouteSelection) => void;
}

export const useLocationSearchBehavior = ({
	route,
	inputTarget,
	inputFromRef,
	inputToRef,
	onSelect,
	onComplete,
}: UseLocationSearchBehaviorProps) => {
	const selectCity = (location: Location) => {
		const { city } = location;
		const newRoute = { ...route, [inputTarget]: location };
		onSelect(city, newRoute);

		// Determine what field is still empty
		const fromIsEmpty = !newRoute.from?.city;
		const toIsEmpty = !newRoute.to?.city;

		// Case 1: from was active and to is still empty → go to 'to'
		if (fromIsActive(inputTarget) && toIsEmpty) {
			inputToRef.current?.focus();
		}

		// Case 2: to was active, but from is empty → go to 'from'
		else if (toIsActive(inputTarget) && fromIsEmpty) {
			inputFromRef.current?.focus();
		}

		// Case 3: both fields are filled → complete
		if (!fromIsEmpty && !toIsEmpty) {
			onComplete?.(newRoute);
		}
	};

	return {
		selectCity,
	};
};
