import { RouteSchema } from '@shared/schemas';
import { fromIsActive, toIsActive } from '@widgets/LocationSelector/helpers';
import { RouteTargetType } from '@widgets/LocationSelector/types';
import { Input } from 'tamagui';

export interface UseLocationSearchBehaviorProps {
	route: RouteSchema;
	inputTarget: RouteTargetType;
	inputFromRef: React.RefObject<Input>;
	inputToRef: React.RefObject<Input>;
	onSelect: (city: string, newRoute: RouteSchema) => void;
	onComplete?: (newRoute: RouteSchema) => void;
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
