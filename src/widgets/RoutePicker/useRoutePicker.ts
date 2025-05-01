import { Location } from '@/common/schema';
import { DeliveryRoute } from '@/modules/delivery/store';
import { fromIsActive, toIsActive } from '@/widgets/RoutePicker/helpers';
import { ActiveInputType } from '@/widgets/RoutePicker/types';
import { useLoadLocations } from '@/widgets/RoutePicker/useLoadLocations';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';


interface UseRoutePickerProps {
	initialValue?: DeliveryRoute;
	onComplete?: (route: DeliveryRoute) => void;
	onFlowChange?: (nextInput: ActiveInputType | null, route: DeliveryRoute) => void;
}


let iter = 0;

export const useRoutePicker = ({
	initialValue = { from: null, to: null },
	onFlowChange,
	onComplete,
}: UseRoutePickerProps) => {
	const [route, setRoute] = useState(initialValue);
	const [searchText, setSearchText] = useState('');
	const [activeInput, setActiveInput] = useState<ActiveInputType>(ActiveInputType.From);

	const [citiesFrom, setCitiesFrom] = useState<Location[]>([]);
	const [citiesTo, setCitiesTo] = useState<Location[]>([]);

	const { loading, fetch } = useLoadLocations({
		onLoad: (locations) => {
			if (activeInput === ActiveInputType.From) {
				setCitiesFrom(() => locations);
			} else {
				setCitiesTo(() => locations);
			}
		},
	});

	useEffect(() => {
		setRoute(() => initialValue);
	}, [initialValue]);

	const fetchDebounced = useMemo(() => debounce(async (text: string) => {
		iter++;
		console.log(iter);
		await fetch(text);
	}, 330), [fetch]);

	useEffect(() => {
		if (!searchText) {
			fromIsActive(activeInput) ? setCitiesFrom([]) : setCitiesTo([]);
			return;
		}

		if (fromIsActive(activeInput) && searchText === route.from?.city || toIsActive(activeInput) && searchText === route.to?.city) {
			return;
		}


		fetchDebounced(searchText);

		return () => fetchDebounced.cancel();
	}, [searchText]);

	const selectCity = (location: Location) => {
		const updatedRoute = { ...route, [activeInput]: location };
		setRoute(() => updatedRoute);
		setSearchText(location.city);

		// Determine what field is still empty
		const fromIsEmpty = !updatedRoute.from?.city;
		const toIsEmpty = !updatedRoute.to?.city;

		let nextInput: ActiveInputType | null = null;

		// Case 1: from was active and to is still empty → go to 'to'
		if (fromIsActive(activeInput) && toIsEmpty) {
			nextInput = ActiveInputType.To;
		}

		// Case 2: to was active, but from is empty → go to 'from'
		else if (toIsActive(activeInput) && fromIsEmpty) {
			nextInput = ActiveInputType.From;
		}

		// Case 3: both fields are filled → complete
		else if (!fromIsEmpty && !toIsEmpty) {
			nextInput = null;
		}

		if (nextInput !== null) {
			setActiveInput(() => nextInput);

			// Set the search text to existing value (if any) of the next input
			const nextSearchText = fromIsActive(nextInput) ? updatedRoute.from?.city : updatedRoute.to?.city;
			setSearchText(nextSearchText ?? '');
		}
		if (nextInput === null) {
			onComplete?.(updatedRoute);
			return;
		}
		onFlowChange?.(nextInput, updatedRoute);
	};

	return {
		route,
		setRoute,
		searchText,
		setSearchText,
		activeInput,
		setActiveInput,
		loading,
		cities: fromIsActive(activeInput) ? citiesFrom : citiesTo,
		selectCity,
	};
};
