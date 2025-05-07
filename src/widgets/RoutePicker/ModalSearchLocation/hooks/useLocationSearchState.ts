import { InputTargetType, RouteSelection } from '@widgets/RoutePicker/types';
import { useEffect, useState } from 'react';

interface UseLocationSearchStateProps {
	route: RouteSelection;
	target?: InputTargetType;
}

export const useLocationSearchState = ({
	route,
}: UseLocationSearchStateProps) => {
	const [searchText, setSearchText] = useState('');
	const [inputTarget, setInputTarget] = useState<InputTargetType>(
		InputTargetType.From,
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
