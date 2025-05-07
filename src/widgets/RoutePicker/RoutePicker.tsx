import { ReverseButton } from '@components/ui-kit';
import { RouteSelection } from '@modules/delivery/store';
import React from 'react';
import { View } from 'tamagui';
import { RouteFieldsGroup } from './components/RouteFieldsGroup';
import { useModalSearch } from './ModalSearchLocation/hooks/useModalSearchLocation';
import { ModalSearchLocation } from './ModalSearchLocation/ModalSearchLocation';
import { RouteTargetType } from './types';
interface RoutePickerProps {
	route: RouteSelection;
	errors: {
		from?: string;
		to?: string;
	};
	onlyTo?: boolean;
	onChange?: (route: RouteSelection) => void;
}

export const RoutePicker = ({
	route,
	errors,
	onlyTo = false,
	onChange,
}: RoutePickerProps) => {
	const { modalRef, open: openModal } = useModalSearch();

	const onReverse = () => {
		onChange?.({
			from: route.to,
			to: route.from,
		});
	};

	return (
		<React.Fragment>
			<View position={'relative'}>
				<RouteFieldsGroup
					readOnly
					onlyTo={onlyTo}
					fieldFrom={{
						value: route?.from?.city || '',
						error: errors.from,
						onPress: () => {
							openModal(RouteTargetType.From);
						},
					}}
					fieldTo={{
						value: route?.to?.city || '',
						error: errors.to,
						onPress: () => {
							openModal(RouteTargetType.To);
						},
					}}
				/>
				<ReverseButton
					position={'absolute'}
					items={'center'}
					onPress={onReverse}
					r={5}
					t={5}
					height={40}
				/>
			</View>
			<ModalSearchLocation
				ref={modalRef}
				onlyTo={onlyTo}
				onComplete={onChange}
				initialRoute={route}
			/>
		</React.Fragment>
	);
};
