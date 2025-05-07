import { RouteSelection, RouteTargetType } from '@widgets/RoutePicker/types';
import { useEffect, useState } from 'react';

export const useLocationSearchState = (route: RouteSelection) => {
	const [searchText, setSearchText] = useState('');
	const [inputTarget, setInputTarget] = useState<RouteTargetType>(
		RouteTargetType.From,
	);

	useEffect(() => {
		setSearchText(route[inputTarget]?.city || '');
	}, [inputTarget]);

	return {
		searchText,
		inputTarget,
		setSearchText,
		setInputTarget,
	};
};
