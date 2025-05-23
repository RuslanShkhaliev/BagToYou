import { TextThemed } from '@components/ui-kit';
import { XStack, YStack } from 'tamagui';

interface DetailsItemProps {
	label?: string;
	description?: string;
	left?: React.ReactNode;
}

export const DetailsItem = ({ label, description, left }: DetailsItemProps) => {
	return (
		<XStack
			gap={10}
			items='center'
		>
			{left}
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
					<TextThemed
						fontWeight={600}
						fontSize={16}
					>
						{description}
					</TextThemed>
				)}
			</YStack>
		</XStack>
	);
};
