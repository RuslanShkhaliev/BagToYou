import { ButtonStyled } from '@components/ui-kit';
import { ModalWrapper } from '@modals/ModalWrapper';
import { RouteSelection } from '@modules/delivery';
import { debounce } from '@utils/debounce';
import React, {
	forwardRef,
	Ref,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import { View } from 'tamagui';
import { RouteFieldRef } from '../components/RouteField';
import { RouteFieldsGroup } from '../components/RouteFieldsGroup';
import { fromIsActive, toIsActive } from '../helpers';
import { InputTargetType } from '../types';
import { useLocationSearchBehavior } from './hooks/useLocationSearchBehavior';
import { useLocationSearchState } from './hooks/useLocationSearchState';
import { LocationsList } from './LocationsList';
import { useLoadLocationsQuery } from './query';

interface ModalWrapperRef {
	open: (target?: InputTargetType) => void;
	close: () => void;
}

interface ModalSearchLocationProps {
	initialRoute: RouteSelection;
	onlyTo?: boolean;
	target?: InputTargetType;
	onComplete?: (route: RouteSelection) => void;
	onClose?: () => void;
	visible?: boolean;
}

export const useModalSearch = () => {
	const modalRef = useRef<ModalWrapperRef>(null);

	return {
		modalRef,
		open: (target?: InputTargetType) => modalRef.current?.open(target),
		close: () => modalRef.current?.close(),
	};
};

const useDefineSearchModal = (
	ref: Ref<ModalWrapperRef>,
	onOpen: (target: InputTargetType) => void,
) => {
	const [visible, setVisible] = useState(false);
	const open = useCallback((target?: InputTargetType) => {
		onOpen(target || InputTargetType.From);
		setVisible(true);
	}, []);
	const close = useCallback(() => setVisible(false), []);
	useImperativeHandle(ref, () => ({
		open,
		close,
	}));

	return {
		visible,
		open,
		close,
	};
};

export const ModalSearchLocation = forwardRef<
	ModalWrapperRef,
	ModalSearchLocationProps
>(({ initialRoute, onComplete, onClose, onlyTo = false }, ref) => {
	const handleClose = () => {
		close();
		onClose?.();
	};

	const [route, setRoute] = useState<RouteSelection>(
		initialRoute || { from: null, to: null },
	);

	const { searchText, inputTarget, setSearchText, setInputTarget } =
		useLocationSearchState({ route });

	const { visible, close } = useDefineSearchModal(ref, (target) => {
		setInputTarget(target);
	});

	const { data: cities, refetch } = useLoadLocationsQuery(searchText);
	const fetchDebounced = useMemo(() => debounce(refetch, 330), [refetch]);
	const inputFromRef = useRef<RouteFieldRef>(null);
	const inputToRef = useRef<RouteFieldRef>(null);

	const { selectCity } = useLocationSearchBehavior({
		inputFromRef,
		inputToRef,
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
			onClose={handleClose}
			title='Search for a location'
			ref={ref}
			visible={visible}
			footer={<ButtonStyled onPress={handleClose}>Close</ButtonStyled>}
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
							setInputTarget(InputTargetType.From);
						},
					}}
					fieldTo={{
						ref: inputToRef,
						value: toIsActive(inputTarget) ? searchText : route.to?.city,
						active: toIsActive(inputTarget),
						onChangeText: setSearchText,
						onFocus: () => {
							setInputTarget(InputTargetType.To);
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
});
