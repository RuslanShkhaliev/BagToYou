import { TextThemed } from '@components/ui-kit';
import { IconProps } from '@tamagui/helpers-icon';
import { NamedExoticComponent } from 'react';
import { XStack } from 'tamagui';

interface AdMetricsItemProps {
	Icon: NamedExoticComponent<IconProps>;
	value: number;
	size?: 'small' | 'large';
}

export const AdMetricsItem = ({
	Icon,
	value,
	size = 'large',
}: AdMetricsItemProps) => {
	return (
		<XStack
			items={'center'}
			gap={size === 'small' ? 4 : 8}
		>
			<Icon
				size={size === 'small' ? 10 : 18}
				color={'$textSecondary'}
			/>
			<TextThemed
				fontSize={size === 'small' ? 12 : 16}
				color={'$textSecondary'}
			>
				{value}
			</TextThemed>
		</XStack>
	);
};
