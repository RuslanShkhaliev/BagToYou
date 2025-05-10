import { RouteSelection } from '@modules/delivery/creation/store';
import React from 'react';
import { View } from 'tamagui';
import { RouteFieldsGroup } from './components/RouteFieldsGroup';
import { ModalSearchLocation, useModalSearch } from './ModalSearchLocation';
import { RouteTargetType } from './types';
interface RoutePickerProps {
	route: RouteSelection;
	errors: {
		from?: string;
		to?: string;
	};
	error?: string;
	onlyTo?: boolean;
	onChange?: (route: Partial<RouteSelection>) => void;
	onBlur?: () => void;
}

export const RoutePicker = ({
	route,
	errors,
	error,
	onlyTo = false,
	onChange,
	onBlur,
}: RoutePickerProps) => {
	const { modalRef, open: openModal, close: closeModal } = useModalSearch();

	const onReverse = () => {
		onChange?.({
			from: route.to,
			to: route.from,
		});
	};

	const onComplete = () => {
		closeModal();
	};
	const onSelect = (route: RouteSelection) => {
		onChange?.(route);
	};
	const onClear = () => {
		onChange?.({ ...route, to: { city: '' } });
	};

	return (
		<React.Fragment>
			<View
				position={'relative'}
				onBlur={onBlur}
			>
				<RouteFieldsGroup
					readOnly
					onlyTo={onlyTo}
					error={error}
					onReverse={onReverse}
					fieldFrom={{
						value: route.from?.city || '',
						error: errors.from,
						onPress: () => {
							openModal(RouteTargetType.From);
						},
					}}
					fieldTo={{
						value: route.to?.city || '',
						error: errors.to,
						clearable: true,
						onClear: () => {
							onChange?.({ ...route, to: { city: '' } });
						},
						onPress: () => {
							openModal(RouteTargetType.To);
						},
					}}
				/>
			</View>
			<ModalSearchLocation
				ref={modalRef}
				onlyTo={onlyTo}
				onSelect={onSelect}
				onComplete={onComplete}
				route={route}
			/>
		</React.Fragment>
	);
};
