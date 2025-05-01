import { BottomSheet } from '@/components/BottomSheet';
import { GroupFields } from '@/components/GroupFields';
import { DeliveryRoute } from '@/modules/delivery/store';
import { CitiesList } from '@/widgets/RoutePicker/CitiesList';
import { CitySearchInput } from '@/widgets/RoutePicker/CitySearchInput';
import { InlineLoader } from '@/widgets/RoutePicker/components/InlineLoader';
import { ReverseButton } from '@/widgets/RoutePicker/components/ReverseButton';
import { fromIsActive, toIsActive } from '@/widgets/RoutePicker/helpers';
import { ActiveInputType } from '@/widgets/RoutePicker/types';
import { useRoutePicker } from '@/widgets/RoutePicker/useRoutePicker';
import { MapPin } from '@tamagui/lucide-icons';
import React, { useRef, useState } from 'react';
import { Input, View, XStack, YStack } from 'tamagui';


interface PickerProps {
	value?: DeliveryRoute;
	onPick?: (route: DeliveryRoute) => void;
}


const iter = 0;
export const RoutePicker = ({
	value = { from: null, to: null },
	onPick,
}: PickerProps) => {
	const [sheetOpen, toggleOpen] = useState(false);
	const inputRefs = {
		from: useRef<Input>(null),
		to: useRef<Input>(null),
	};

	const {
		route,
		setRoute,
		cities,
		activeInput,
		setActiveInput,
		selectCity,
		setSearchText,
		searchText,
		loading,
	} = useRoutePicker({
		initialValue: value,
		onComplete: (route) => {
			toggleOpen(false);
			onPick?.(route);
		},
		onFlowChange: (nextInput) => {
			if (fromIsActive(nextInput)) {
				inputRefs.from.current?.focus();
			} else {
				inputRefs.to.current?.focus();
			}
		},
	});

	const openSheet = (activeInput: ActiveInputType) => {
		setActiveInput(activeInput);
		toggleOpen(true);
	};
	const onFocus = (activeInput: ActiveInputType) => {
		setActiveInput(activeInput);
		const input = fromIsActive(activeInput) ? route.from?.city : route.to?.city;
		setSearchText(input || '');
	};

	const onClose = () => {
		onPick?.(route);
	};
	const onChangeDir = () => {
		const reversed = { from: route.to, to: route.from };
		// setRoute(() => reversed);

		onPick?.(reversed);
	};

	return (
		<View flex={1}>
			<GroupFields
				bg={'$inputBg'}
				rounded={16}
				overflow={'hidden'}
				fields={[
					{
						value: value.from?.city,
						placeholder: 'Origin',
						error: '',
						onPress: () => {
							openSheet(ActiveInputType.From);
						},
					},
					{
						value: value.to?.city,
						placeholder: 'Where to',
						error: '',
						onPress: () => {
							openSheet(ActiveInputType.To);
						},
					},
				]}
			>
				{(field) => (
					<CitySearchInput
						icon={
							<MapPin
								size={18}
								color={'$textSecondary'}
							/>
						}
						readOnly
						active={false}
						value={field.value}
						onPress={field.onPress}
						height={50}
						inValid={!!field.error}
						placeholder={field.error || field.placeholder}
					/>
				)}
			</GroupFields>
			<XStack
				position={'absolute'}
				items={'center'}
				r={18}
				height={50}
			>
				<ReverseButton onPress={onChangeDir} />
			</XStack>

			<BottomSheet
				open={sheetOpen}
				onOpenChange={toggleOpen}
				onClose={onClose}
				unmountChildrenWhenHidden
				keyboardShouldPersistTaps={'always'}
				header={
					<YStack gap={10}>
						<GroupFields
							fields={[
								{
									ref: inputRefs.from,
									icon: (
										<MapPin
											size={20}
											color={'$textSecondary'}
										/>
									),
									placeholder: 'Origin',
									active: fromIsActive(activeInput),
									value: fromIsActive(activeInput) ? searchText : route.from?.city,
									onChangeText: setSearchText,
									onFocus: () => {
										onFocus(ActiveInputType.From);
									},
								},
								{
									ref: inputRefs.to,
									icon: (
										<MapPin
											size={20}
											color={'$textSecondary'}
										/>
									),
									placeholder: 'Where to',
									active: toIsActive(activeInput),
									value: toIsActive(activeInput) ? searchText : route.to?.city,
									onChangeText: setSearchText,
									onFocus: () => {
										onFocus(ActiveInputType.To);
									},
								},
							]}
						>
							{(field) => <CitySearchInput {...field} />}
						</GroupFields>
						<InlineLoader loading={loading} />
					</YStack>
				}
			>
				<View
					flex={1}
					pt={20}
					pb={20}
				>
					<CitiesList
						onSelect={selectCity}
						cities={cities}
					/>
				</View>
			</BottomSheet>
		</View>
	);
};
