import { RouteSelection } from '@/modules/delivery/store';
import { InputTargetType } from '@/widgets/RoutePicker/types';
import { useEffect, useState } from 'react';

interface UseLocationSearchStateProps {
	route: RouteSelection;
	target?: InputTargetType;
}

export const useLocationSearchState = ({
	route,
	target = InputTargetType.From,
}: UseLocationSearchStateProps) => {
	const [searchText, setSearchText] = useState('');
	const [inputTarget, setInputTarget] = useState<InputTargetType>(target);

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
