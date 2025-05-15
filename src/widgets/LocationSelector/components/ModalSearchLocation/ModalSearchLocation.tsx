import { ModalWrapper } from '@modals/ModalWrapper';
import { RouteSchema } from '@shared/schema';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Input, useDebounce, View } from 'tamagui';
import { fromIsActive, toIsActive } from '../../helpers';
import { RouteTargetType } from '../../types';
import { InlineLoader } from '../InlineLoader';
import { RouteFieldsGroup } from '../RouteFieldsGroup';
import { useLocationSearchBehavior } from './hooks/useLocationSearchBehavior';
import { useDefineSearchModal as useModalControls } from './hooks/useModalSearchLocation';
import { LocationsList } from './LocationListResult';
import { useLoadLocationsQuery } from './query';

export interface ModalWrapperRef {
	open: (target?: RouteTargetType) => void;
	close: () => void;
}
export interface ModalSearchLocationProps {
	route: RouteSchema;
	onlyTo?: boolean;
	target?: RouteTargetType;
	onComplete?: () => void;
	onSelect?: (route: RouteSchema) => void;
	onClose?: () => void;
	onBack?: () => void;
	visible?: boolean;
}

export const ModalSearchLocation = forwardRef<
	ModalWrapperRef,
	ModalSearchLocationProps
>(({ route, onComplete, onSelect, onClose, onBack, onlyTo = false }, ref) => {
	const [searchFrom, setSearchFrom] = useState<string>('');
	const [searchTo, setSearchTo] = useState<string>('');
	const [searchText, setSearchText] = useState<string>('');
	const [inputTarget, setInputTarget] = useState<RouteTargetType>(
		RouteTargetType.From,
	);

	const inputFromRef = useRef<Input>(null);
	const inputToRef = useRef<Input>(null);

	const { visible, close } = useModalControls({
		ref,
		onOpen: (target) => {
			setInputTarget(target);
		},
		onClose: () => {
			onClose?.();
		},
	});

	const { data: cities, isLoading } = useLoadLocationsQuery(searchText);

	useEffect(() => {
		setSearchFrom(route.from?.city || '');
		setSearchTo(route.to?.city || '');
	}, [route.from?.city, route.to?.city, visible]);

	const { selectCity } = useLocationSearchBehavior({
		inputFromRef,
		inputToRef,
		route,
		inputTarget,
		onSelect: (city, newRoute) => {
			onSelect?.(newRoute);
			setSearchText(city);
		},
		onComplete,
	});

	const setSearchTextDebounced = useDebounce(setSearchText, 330);

	const onSearchFrom = (text: string) => {
		setSearchFrom(text);
		setSearchTextDebounced(text);
	};
	const onSearchTo = (text: string) => {
		setSearchTo(text);
		setSearchTextDebounced(text);
	};

	return (
		<ModalWrapper
			onClose={close}
			onBack={onBack}
			title='Search for a location'
			visible={visible}
		>
			<View
				px={12}
				gap={12}
			>
				<RouteFieldsGroup
					onlyTo={onlyTo}
					canReverse={false}
					fieldFrom={{
						ref: inputFromRef,
						value: searchFrom ?? route.from?.city,
						active: fromIsActive(inputTarget),
						onChangeText: onSearchFrom,
						onFocus: () => {
							setInputTarget(RouteTargetType.From);
						},
					}}
					fieldTo={{
						ref: inputToRef,
						clearable: true,
						value: searchTo ?? route.to?.city,
						active: toIsActive(inputTarget),
						onChangeText: onSearchTo,
						onFocus: () => {
							setInputTarget(RouteTargetType.To);
						},
					}}
				/>

				<InlineLoader loading={isLoading} />
			</View>

			{cities && (
				<LocationsList
					onSelect={selectCity}
					data={cities}
				/>
			)}
		</ModalWrapper>
	);
});
