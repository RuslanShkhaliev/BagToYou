import { ButtonStyled, ReverseButton } from '@components/ui-kit';
import { RouteSelection } from '@modules/delivery/creation/store';
import { X } from '@tamagui/lucide-icons';
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
		matched?: string;
	};
	onlyTo?: boolean;
	onChange?: (route: Partial<RouteSelection>) => void;
	onBlur?: () => void;
}

export const RoutePicker = ({
	route,
	errors,
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
					error={errors.matched}
					fieldFrom={{
						value: route.from.city || '',
						error: errors.from,
						onPress: () => {
							openModal(RouteTargetType.From);
						},
					}}
					fieldTo={{
						value: route.to.city || '',
						error: errors.to,
						onPress: () => {
							openModal(RouteTargetType.To);
						},
					}}
				/>
				<ButtonStyled
					position={'absolute'}
					variant={'ghost'}
					onPress={onClear}
					b={5}
					r={5}
					width={30}
					circular
					icon={
						<X
							shrink={0}
							size={18}
							color={'$textPrimary'}
						/>
					}
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
				onSelect={onSelect}
				onComplete={onComplete}
				initialRoute={route}
			/>
		</React.Fragment>
	);
};
