import { TextThemed } from '@components/ui-kit';
import { formatDistanceToNow } from 'date-fns';
import { Image, XStack, YStack } from 'tamagui';
import { UserAd } from '../interfaces';

export const CardUserAd = ({ images, expired, name }: UserAd) => {
	const imagePreview = images[0];
	const duration = formatDistanceToNow(expired);

	return (
		<XStack gap={8}>
			<XStack
				rounded={8}
				overflow={'hidden'}
			>
				<Image
					width={100}
					height={80}
					source={{ uri: imagePreview }}
				/>
			</XStack>
			<YStack>
				<TextThemed>{name}</TextThemed>
				<TextThemed
					fontSize={12}
					color={'$textSecondary'}
				>
					{duration}
				</TextThemed>
			</YStack>
		</XStack>
	);
};
