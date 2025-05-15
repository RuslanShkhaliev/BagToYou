import { RouteSchema } from '@shared/schema';
import React from 'react';
import { View } from 'tamagui';
import {
	ModalSearchLocation,
	useModalSearch,
} from './components/ModalSearchLocation';
import { RouteFieldsGroup } from './components/RouteFieldsGroup';
import { RouteTargetType } from './types';
interface LocationSelectorProps {
	route: RouteSchema;
	errors: {
		from?: string;
		to?: string;
	};
	error?: string;
	onlyTo?: boolean;
	onChange?: (route: RouteSchema) => void;
	onBlur?: () => void;
}

export const LocationSelector = ({
	route,
	errors,
	error,
	onlyTo = false,
	onChange,
	onBlur,
}: LocationSelectorProps) => {
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
	const onSelect = (route: RouteSchema) => {
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
						onClear,
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
