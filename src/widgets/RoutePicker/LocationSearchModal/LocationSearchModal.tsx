import { ButtonStyled } from '@components/ui-kit';
import { ModalWrapper, ModalWrapperRef } from '@modals/ModalWrapper';
import { RouteSelection } from '@modules/delivery';
import { MapPin } from '@tamagui/lucide-icons';
import { debounce } from '@utils/debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { YStack } from 'tamagui';
import { RouteField } from '../components/RouteField';
import { fromIsActive, toIsActive } from '../helpers';
import { InputTargetType } from '../types';
import { useLocationSearchBehavior } from './hooks/useLocationSearchBehavior';
import { useLocationSearchState } from './hooks/useLocationSearchState';
import { LocationsList } from './LocationsList';
import { useLoadLocationsQuery } from './query';

interface LocationSearchModalProps {
	initialRoute: RouteSelection;
	onlyTo?: boolean;
	target?: InputTargetType;
	onComplete?: (route: RouteSelection) => void;
	onClose?: () => void;
	visible?: boolean;
}

export const LocationSearchModal = ({
	initialRoute,
	onComplete,
	onClose,
	onlyTo = false,
	target = InputTargetType.From,
	visible = false,
}: LocationSearchModalProps) => {
	const modalRef = useRef<ModalWrapperRef>(null);

	useEffect(() => {
		visible ? modalRef?.current?.open() : modalRef?.current?.close();
	}, [visible]);

	const [route, setRoute] = useState<RouteSelection>(
		initialRoute || { from: null, to: null },
	);

	const { searchText, inputTarget, setSearchText, setInputTarget } =
		useLocationSearchState({ route, target });

	const { data: cities, refetch } = useLoadLocationsQuery(searchText);
	const fetchDebounced = useMemo(() => debounce(refetch, 330), [refetch]);

	const { selectCity, inputFromRef, inputToRef } = useLocationSearchBehavior({
		route,
		inputTarget,
		onSelect: (city, newRoute) => {
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
			onClose={onClose}
			title='Search for a location'
			ref={modalRef}
			footer={
				<ButtonStyled
					onPress={() => {
						modalRef.current?.close();
					}}
				>
					Close
				</ButtonStyled>
			}
		>
			<YStack
				flex={1}
				rounded={16}
			>
				{!onlyTo && (
					<RouteField
						flex={1}
						ref={inputFromRef}
						value={fromIsActive(inputTarget) ? searchText : route.from?.city}
						placeholder='Origin'
						active={fromIsActive(inputTarget)}
						onChangeText={setSearchText}
						onFocus={() => {
							setInputTarget(InputTargetType.From);
						}}
						icon={
							<MapPin
								size={20}
								color={'$textSecondary'}
							/>
						}
					/>
				)}
				<RouteField
					flex={1}
					ref={inputToRef}
					value={toIsActive(inputTarget) ? searchText : route.to?.city}
					placeholder='Where to'
					active={toIsActive(inputTarget)}
					onChangeText={setSearchText}
					onFocus={() => {
						setInputTarget(InputTargetType.To);
					}}
					icon={
						<MapPin
							size={20}
							color={'$textSecondary'}
						/>
					}
				/>
			</YStack>
			<LocationsList
				onSelect={selectCity}
				data={cities}
			/>
		</ModalWrapper>
	);
};
