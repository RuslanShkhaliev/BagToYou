// useRoutePicker.ts
import { Location } from '@/common/schema';
import { locations } from '@/mock/dbMock';
import { DeliveryRoute } from '@/modules/delivery/store';
import { delay } from '@/utils/delay';
import { filterCities } from '@/widgets/RoutePicker/utils';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'tamagui';

export const useRoutePicker = ({
	initialValue = { from: null, to: null },
}: {
	initialValue?: DeliveryRoute;
	onPick?: (val: DeliveryRoute) => void;
}) => {
	const [route, setRoute] = useState(initialValue);
	const [searchText, setSearchText] = useState('');
	const [activeInput, setActiveInput] = useState<'from' | 'to'>('from');
	const [loading, setLoading] = useState(false);
	const [citiesFrom, setCitiesFrom] = useState<Location[]>([]);
	const [citiesTo, setCitiesTo] = useState<Location[]>([]);

	const debouncedLoadCities = useMemo(
		() =>
			debounce(async (text: string, type: 'from' | 'to') => {
				setLoading(true);
				await delay(400);
				const result = filterCities(text, locations);
				setLoading(false);
				if (type === 'from') {
					setCitiesFrom(result);
				} else {
					setCitiesTo(result);
				}
			}, 500),
		[],
	);

	useEffect(() => {
		if (!searchText) {
			debouncedLoadCities.cancel();
			setLoading(false);
			if (activeInput === 'from') {
				setCitiesFrom([]);
			} else {
				setCitiesTo([]);
			}
			return;
		}
		debouncedLoadCities(searchText, activeInput);
	}, [searchText, activeInput]);

	const selectCity = (location: Location) => {
		const newRoute = { ...route, [activeInput]: location };
		setRoute(newRoute);

		if (activeInput === 'from') {
			setSearchText(newRoute.to?.city ?? '');
			setActiveInput('to');
		}
	};

	return {
		route,
		searchText,
		setSearchText,
		activeInput,
		setActiveInput,
		loading,
		cities: activeInput === 'from' ? citiesFrom : citiesTo,
		selectCity,
	};
};
