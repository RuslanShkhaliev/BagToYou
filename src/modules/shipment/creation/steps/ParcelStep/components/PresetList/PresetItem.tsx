import { TextThemed } from '@components/ui-kit';
import { ParcelInfo } from 'src/shared/schemas';
import { XStack, XStackProps, YStack } from 'tamagui';

export interface PresetItemProps {
	icon: React.ReactNode;
	size: 'XS' | 'S' | 'M' | 'L' | 'XL';
	parcel: ParcelInfo;
	selected?: boolean;
}

export const PresetItem = ({
	icon,
	size,
	parcel,
	selected,
	...props
}: PresetItemProps & XStackProps) => {
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
