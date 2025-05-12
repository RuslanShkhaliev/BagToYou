import { IconBoxS, IconL, IconM, IconXL, IconXS } from '@components/icons';
import { TextThemed } from '@components/ui-kit';
import { DeliveryInfo } from '@shared/interfaces';
import { ParcelInfo } from '@shared/schema';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable } from 'react-native';
import { Card, View, XStack, XStackProps, YStack } from 'tamagui';
import { useDeliveryStore } from '../store';
interface CardItemProps {
	icon: React.ReactNode;
	size: 'XS' | 'S' | 'M' | 'L' | 'XL';
	parcel: ParcelInfo;
	selected?: boolean;
}
const CardItem = ({
	icon,
	size,
	parcel,
	selected,
	...props
}: CardItemProps & XStackProps) => {
	return (
		<XStack
			gap={16}
			p={16}
			rounded={16}
			height={72}
			items={'center'}
			bg={'$bgContent'}
			borderWidth={1}
			borderColor={selected ? '$accent' : 'transparent'}
			{...props}
		>
			{icon}
			<YStack gap={4}>
				<TextThemed
					unselectable
					fontSize={14}
				>
					{`Короб ${size}`}
				</TextThemed>
				<TextThemed
					unselectable
					fontSize={12}
					color={'$textSecondary'}
				>
					{`${parcel.width}x${parcel.height}x${parcel.length}, до ${parcel.weight} кг`}
				</TextThemed>
			</YStack>
		</XStack>
	);
};

const presets: CardItemProps[] = [
	{
		icon: <IconXS />,
		size: 'XS',
		parcel: {
			width: 17,
			height: 12,
			length: 9,
			weight: 0.5,
		},
	},
	{
		icon: <IconBoxS />,
		size: 'S',
		parcel: {
			width: 23,
			height: 19,
			length: 10,
			weight: 2,
		},
	},
	{
		icon: <IconM />,
		size: 'M',
		parcel: {
			width: 33,
			height: 25,
			length: 15,
			weight: 5,
		},
	},
	{
		icon: <IconL />,
		size: 'L',
		parcel: {
			width: 31,
			height: 25,
			length: 38,
			weight: 12,
		},
	},
	{
		icon: <IconXL />,
		size: 'XL',
		parcel: {
			width: 60,
			height: 35,
			length: 30,
			weight: 18,
		},
	},
];

export const PresetsList = () => {
	const { updateField } = useDeliveryStore();
	const { setValue, getValues } = useFormContext<DeliveryInfo>();
	const [selectedPreset, setSelectedPreset] = useState<ParcelInfo | null>(null);

	const onSelect = (preset: ParcelInfo) => {
		updateField('parcelInfo', preset);
		setValue('parcelInfo', preset);
		console.log(getValues());

		setSelectedPreset(preset);
	};
	return (
		<View
			flex={1}
			pt={30}
		>
			<Card gap={8}>
				{presets.map((preset) => (
					<Pressable
						key={preset.size}
						onPress={() => onSelect(preset.parcel)}
					>
						{({ pressed }) => (
							<CardItem
								opacity={pressed ? 0.6 : 1}
								{...preset}
								selected={selectedPreset === preset.parcel}
							/>
						)}
					</Pressable>
				))}
			</Card>
		</View>
	);
};
