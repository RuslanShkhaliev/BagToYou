import { RouteSchema } from '@shared/schema';
import { RouteTargetType } from '@widgets/LocationSelector/types';
import { useEffect, useState } from 'react';

export const useLocationSearchState = (route: RouteSchema) => {
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
