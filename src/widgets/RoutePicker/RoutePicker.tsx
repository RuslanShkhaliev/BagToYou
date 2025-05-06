import { FieldGroup } from '@/components/FieldGroup';
import { ReverseButton } from '@/components/ui/buttons/ReverseButton';
import { LocationSearchModal } from '@/modals/LocationSearchModal';
import { RouteSelection } from '@/modules/delivery/store';
import { RouteField } from '@/widgets/RoutePicker/components/RouteField';
import { InputTargetType } from '@/widgets/RoutePicker/types';
import { MapPin } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { View } from 'tamagui';

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
	const [visibleModal, setVisibleModal] = useState(false);
	const [target, setTarget] = useState<InputTargetType>(InputTargetType.From);

	const openModal = (target: InputTargetType) => {
		setTarget(target);
		setVisibleModal(true);
	};
	const onCloseModal = () => {
		setVisibleModal(false);
	};
	const onReverse = () => {
		onChange?.({
			from: route.to,
			to: route.from,
		});
	};

	return (
		<React.Fragment>
			<View position={'relative'}>
				<FieldGroup
					bg={'$inputBg'}
					rounded={16}
					fields={[
						{
							value: route?.from?.city || '',
							placeholder: 'Origin',
							error: errors.from,
							onPress: () => {
								openModal(InputTargetType.From);
							},
						},
						{
							value: route?.to?.city || '',
							placeholder: 'Where to',
							error: errors.to,
							onPress: () => {
								openModal(InputTargetType.To);
							},
						},
					]}
				>
					{(field) => (
						<RouteField
							flex={1}
							icon={
								<MapPin
									size={18}
									color={'$textSecondary'}
								/>
							}
							editable={false}
							active={false}
							value={field?.value}
							onPress={field.onPress}
							height={50}
							inValid={!!field.error}
							placeholder={field.error || field.placeholder}
						/>
					)}
				</FieldGroup>
				<ReverseButton
					position={'absolute'}
					items={'center'}
					onPress={onReverse}
					r={5}
					t={5}
					height={40}
				/>
			</View>
			<LocationSearchModal
				visible={visibleModal}
				onClose={onCloseModal}
				onComplete={onChange}
				initialRoute={route}
				target={target}
			/>
		</React.Fragment>
	);
};
