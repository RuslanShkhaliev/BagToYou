import { TextThemed } from '@components/ui-kit';
import { XStack, YStack } from 'tamagui';

interface RouteDetailsItemProps {
	label?: string;
	description?: string;
	icon?: React.ReactNode;
}

export const DetailsItem = ({
	label,
	description,
	icon,
}: RouteDetailsItemProps) => {
	return (
		<XStack
			gap={16}
			items='center'
		>
			{icon}
			<YStack gap={6}>
				{label && (
					<TextThemed
						fontWeight={500}
						fontSize={14}
						color={'$textSecondary'}
					>
						{label}
					</TextThemed>
				)}
				{description && (
					<TextThemed fontSize={16}>{description}</TextThemed>
				)}
			</YStack>
		</XStack>
	);
};
