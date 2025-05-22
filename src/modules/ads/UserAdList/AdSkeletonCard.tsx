import { Skeleton } from '@components/ui-kit/Sekeleton';
import { XStack, YStack } from 'tamagui';

export const AdSkeletonCard = () => {
	return (
		<XStack gap={8}>
			<XStack
				rounded={8}
				overflow={'hidden'}
			>
				<Skeleton
					width={100}
					height={80}
					rounded={8}
				/>
			</XStack>
			<YStack
				justify='center'
				gap={4}
			>
				<Skeleton
					width={150}
					height={18}
					rounded={4}
				/>
				<Skeleton
					width={80}
					height={12}
					rounded={4}
				/>
			</YStack>
		</XStack>
	);
};
