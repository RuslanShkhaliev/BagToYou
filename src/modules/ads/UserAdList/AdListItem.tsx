import ImagePlaceholder from '@assets/images/placeholder-image.jpg';
import { AdMetrics } from '@components/AdMetrics';
import { TextThemed } from '@components/ui-kit';
import { UserAdModel } from '@modules/ads/api';
import { Banknote, MapPin } from '@tamagui/lucide-icons';
import { getAdMetadata } from '@utils/getAdMetadata';
import { useMemo } from 'react';
import { Image, View, XStack, YStack } from 'tamagui';

interface AdListItemProps {
	data: UserAdModel;
	onPress: (id: string) => void;
}

export const AdListItem = ({ data, onPress }: AdListItemProps) => {
	const { rewards, route, createdAt, media, name, metrics } = data;
	const { daysLeft } = useMemo(
		() => getAdMetadata({ createdAt }),
		[createdAt],
	);

	const imagePreview = useMemo(() => {
		return media[0] || ImagePlaceholder;
	}, [media]);

	const displayRoute = useMemo(() => {
		if (route.from && route.to) {
			return `${route.from.city} - ${route.to.city}`;
		}
		return '';
	}, [route]);

	const handlePress = () => {
		console.log(data.id);
		onPress(data.id);
	};

	return (
		<XStack
			gap={8}
			flex={1}
		>
			<XStack
				rounded={8}
				overflow={'hidden'}
			>
				<Image
					height={110}
					width={150}
					source={imagePreview}
				/>
			</XStack>
			<YStack gap={10}>
				<View gap={4}>
					<TextThemed
						truncate
						fontSize={16}
						width={'100%'}
						maxW={'90%'}
					>
						{name}
					</TextThemed>
					<XStack
						items={'center'}
						gap={4}
					>
						<Banknote
							size={16}
							color={'$green800'}
						/>
						<TextThemed
							fontWeight={600}
							fontSize={16}
						>
							{rewards} ₽
						</TextThemed>
					</XStack>
				</View>

				<YStack gap={4}>
					<XStack
						items={'center'}
						gap={4}
					>
						<MapPin
							size={16}
							color={'$accent'}
						/>
						<TextThemed fontSize={14}>{displayRoute}</TextThemed>
					</XStack>
					<TextThemed
						fontSize={12}
						color={'$textSecondary'}
					>
						{`Осталось ${daysLeft} дней`}
					</TextThemed>
					<AdMetrics
						size={'small'}
						metrics={metrics}
					/>
				</YStack>
			</YStack>
		</XStack>
	);
};
