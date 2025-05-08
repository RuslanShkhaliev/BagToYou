import { ModalWrapper } from '@modals/ModalWrapper';
import { RouteSelection } from '@modules/delivery';
import { debounce } from '@utils/debounce';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Input, View } from 'tamagui';
import { RouteFieldsGroup } from '../components/RouteFieldsGroup';
import { fromIsActive, toIsActive } from '../helpers';
import { RouteTargetType } from '../types';
import { useLocationSearchBehavior } from './hooks/useLocationSearchBehavior';
import { useLocationSearchState } from './hooks/useLocationSearchState';
import { useDefineSearchModal } from './hooks/useModalSearchLocation';
import { LocationsList } from './LocationsList';
import { useLoadLocationsQuery } from './query';

export interface ModalWrapperRef {
	open: (target?: RouteTargetType) => void;
	close: () => void;
}
export interface ModalSearchLocationProps {
	initialRoute: RouteSelection;
	onlyTo?: boolean;
	target?: RouteTargetType;
	onComplete?: () => void;
	onSelect?: (route: RouteSelection) => void;
	onClose?: () => void;
	onBack?: () => void;
	visible?: boolean;
}

export const ModalSearchLocation = forwardRef<
	ModalWrapperRef,
	ModalSearchLocationProps
>(
	(
		{ initialRoute, onComplete, onSelect, onClose, onBack, onlyTo = false },
		ref,
	) => {
		const handleClose = () => {
			close();
			onClose?.();
		};
		const { visible, close } = useDefineSearchModal({
			ref,
			onOpen: (target) => {
				setInputTarget(target);
			},
		});

		const [route, setRoute] = useState<RouteSelection>(initialRoute);

		const { searchText, inputTarget, setSearchText, setInputTarget } =
			useLocationSearchState(route);

		const { data: cities, refetch } = useLoadLocationsQuery(searchText);
		const fetchDebounced = useMemo(() => debounce(refetch, 330), [refetch]);
		const inputFromRef = useRef<Input>(null);
		const inputToRef = useRef<Input>(null);

		const { selectCity } = useLocationSearchBehavior({
			inputFromRef,
			inputToRef,
			route,
			inputTarget,
			onSelect: (city, newRoute) => {
				onSelect?.(newRoute);
				setRoute(() => newRoute);
				setSearchText(city);
			},
			onComplete,
		});

		useEffect(() => {
			if (!searchText) {
				return;
			}

			fetchDebounced();

			return () => fetchDebounced.cancel();
		}, [searchText]);

		return (
			<ModalWrapper
				onClose={handleClose}
				onBack={onBack}
				title='Search for a location'
				visible={visible}
			>
				<View px={12}>
					<RouteFieldsGroup
						onlyTo={onlyTo}
						fieldFrom={{
							ref: inputFromRef,
							value: fromIsActive(inputTarget) ? searchText : route.from?.city,
							active: fromIsActive(inputTarget),
							onChangeText: setSearchText,
							onFocus: () => {
								setInputTarget(RouteTargetType.From);
							},
						}}
						fieldTo={{
							ref: inputToRef,
							value: toIsActive(inputTarget) ? searchText : route.to?.city,
							active: toIsActive(inputTarget),
							onChangeText: setSearchText,
							onFocus: () => {
								setInputTarget(RouteTargetType.To);
							},
						}}
					/>
				</View>
				<LocationsList
					onSelect={selectCity}
					data={cities}
				/>
			</ModalWrapper>
		);
	},
);
