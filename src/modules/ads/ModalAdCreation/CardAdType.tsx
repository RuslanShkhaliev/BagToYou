import { TextThemed } from '@components/ui-kit';
import { IconProps } from '@tamagui/helpers-icon';
import { ChevronRight } from '@tamagui/lucide-icons';
import { NamedExoticComponent } from 'react';
import { Card, CardFooter, CardProps, XStack } from 'tamagui';

interface CardAdTypeProps {
	title: React.ReactNode;
	icon?: NamedExoticComponent<IconProps>;

	iconSize?: IconProps['size'];
	size?: CardProps['size'];
	width?: CardProps['width'];
	height?: CardProps['height'];
	cardStyles?: CardProps;
	onPress?: () => void;
}

export const CardAdType = ({
	title,
	icon,
	iconSize = 24,
	size,
	width,
	height,
	onPress,
}: CardAdTypeProps) => {
	const Icon = icon || null;
	return (
		<Card
			items={'center'}
			flexDirection={'row'}
			justify={'space-between'}
			width={width || '100%'}
			height={height}
			size={size}
			px={16}
			py={20}
			gap={10}
			overflow={'hidden'}
			rounded={16}
			onPress={onPress}
			pressStyle={{
				opacity: 0.8,
			}}
			bg={'$bgCard'}
		>
			<XStack
				items={'center'}
				gap={10}
			>
				{Icon && (
					<Icon
						shrink={0}
						size={iconSize}
						color={'$textPrimary'}
					/>
				)}
				<TextThemed
					fontSize={16}
					fontWeight={600}
					color={'$textPrimary'}
					text={'center'}
					unselectable
				>
					{title}
				</TextThemed>
			</XStack>
			<CardFooter>
				<ChevronRight
					size={iconSize}
					color={'$textPrimary'}
				/>
			</CardFooter>
		</Card>
	);
};
