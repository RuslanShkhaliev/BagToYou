import { RouteTargetType } from '@widgets/LocationSelector/types';
import { useEffect, useState } from 'react';
import { RouteSchema } from 'src/shared/schemas';

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
