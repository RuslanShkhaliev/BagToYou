import { Location } from '@/common/schema';
import { BottomSheet } from '@/components/BottomSheet';
import { GroupFields } from '@/components/GroupFields';
import { DeliveryRoute } from '@/modules/delivery/store';
import { CitiesList } from '@/widgets/RoutePicker/CitiesList';
import { CitySearchInput } from '@/widgets/RoutePicker/CitySearchInput';
import { InlineLoader } from '@/widgets/RoutePicker/components/InlineLoader';
import { ReverseButton } from '@/widgets/RoutePicker/components/ReverseButton';
import { useRoutePicker } from '@/widgets/RoutePicker/useRoutePicker';
import { MapPin } from '@tamagui/lucide-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Input, View, XStack, YStack } from 'tamagui';

interface PickerProps {
	value?: DeliveryRoute;
	onPick?: (route: DeliveryRoute) => void;
}

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
		cities,
		activeInput,
		setActiveInput,
		selectCity,
		setSearchText,
		searchText,
		loading,
	} = useRoutePicker({ initialValue: value, onPick });

	useEffect(() => {
		if (activeInput === 'from') {
			inputRefs.from.current?.focus();
		} else {
			inputRefs.to.current?.focus();
		}
	}, [activeInput]);

	const openSheet = () => {
		toggleOpen(true);
	};
	const closeSheet = () => {
		toggleOpen(false);
	};

	const onSelectCity = (loc: Location) => {
		selectCity(loc);

		if (activeInput === 'to' && route.from?.city) {
			closeSheet();
		}
	};

	const onClose = () => {
		console.log({ route, value });
		onPick?.(route);
	};
	const onChangeDir = () => {
		console.log(route);
		onPick?.({ from: route.to, to: route.from });
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
							openSheet();
							setActiveInput('from');
						},
					},
					{
						value: value.to?.city,
						placeholder: 'Where to',
						error: '',
						onPress: () => {
							openSheet();
							setActiveInput('to');
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
									active: activeInput === 'from',
									placeholder: 'Origin',
									value: activeInput === 'from' ? searchText : route.from?.city,
									onChangeText: setSearchText,
									onFocus: () => {
										setActiveInput('from');
										setSearchText(route.from?.city || '');
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
									active: activeInput === 'to',
									placeholder: 'Where to',
									value: activeInput === 'to' ? searchText : route.to?.city,
									onChangeText: setSearchText,
									onFocus: () => {
										setActiveInput('to');
										setSearchText(route.to?.city || '');
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
						onSelect={onSelectCity}
						cities={cities}
					/>
				</View>
			</BottomSheet>
		</View>
	);
};
