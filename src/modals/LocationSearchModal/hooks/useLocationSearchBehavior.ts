import { RouteSelection } from '@/modules/delivery/store';
import { Location } from '@/shared/schema';
import { RouteFieldRef } from '@/widgets/RoutePicker/components/RouteField';
import { fromIsActive, toIsActive } from '@/widgets/RoutePicker/helpers';
import { InputTargetType } from '@/widgets/RoutePicker/types';
import { useEffect, useRef } from 'react';

export interface UseLocationSearchBehaviorProps {
	route: RouteSelection;
	onSelect: (city: string, newRoute: RouteSelection) => void;
	inputTarget: InputTargetType;
	onComplete?: (newRoute: RouteSelection) => void;
}

export const useLocationSearchBehavior = ({
	route,
	onSelect,
	inputTarget,
	onComplete,
}: UseLocationSearchBehaviorProps) => {
	const inputRefs = {
		from: useRef<RouteFieldRef>(null),
		to: useRef<RouteFieldRef>(null),
	};

	useEffect(() => {
		if (fromIsActive(inputTarget)) {
			inputRefs.from.current?.focus();
		} else {
			inputRefs.to.current?.focus();
		}
	}, []);

	const selectCity = (location: Location) => {
		const { city } = location;
		const newRoute = { ...route, [inputTarget]: location };
		onSelect(city, newRoute);

		// Determine what field is still empty
		const fromIsEmpty = !newRoute.from?.city;
		const toIsEmpty = !newRoute.to?.city;

		// Case 1: from was active and to is still empty → go to 'to'
		if (fromIsActive(inputTarget) && toIsEmpty) {
			inputRefs.to.current?.focus();
		}

		// Case 2: to was active, but from is empty → go to 'from'
		else if (toIsActive(inputTarget) && fromIsEmpty) {
			inputRefs.from.current?.focus();
		}

		// Case 3: both fields are filled → complete
		if (!fromIsEmpty && !toIsEmpty) {
			onComplete?.(newRoute);
		}
	};

	return {
		selectCity,
		inputFromRef: inputRefs.from,
		inputToRef: inputRefs.to,
	};
};
