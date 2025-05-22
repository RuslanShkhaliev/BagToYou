import { Surface } from '@components/Surface';
import { SquareArrowUpRight } from '@tamagui/lucide-icons';
import { Avatar, Text, XStack, YStack } from 'tamagui';

interface ProfileInfoProps {
	id: string;
	name: string;
	rating: number;
	reviews: number;
	avatar: string;
}

export const ProfileInfo = ({
	id,
	name,
	rating,
	reviews,
	avatar,
}: ProfileInfoProps) => {
	console.log(id);
	return (
		<Surface gap={8}>
			<XStack gap={16}>
				<Avatar
					size={44}
					circular
				>
					<Avatar.Image src={avatar} />
				</Avatar>
				<YStack
					gap={10}
					items={'stretch'}
				>
					<XStack items='center'>
						<Text
							color='$textPrimary'
							fontSize={18}
							numberOfLines={1}
							ellipsizeMode='tail'
						>
							{name}
						</Text>
						<SquareArrowUpRight
							shrink={0}
							ml={8}
							size={16}
							color='$textSecondary'
						/>
					</XStack>
					<XStack
						items='center'
						gap={8}
					>
						<Text
							color='$textSecondary'
							fontSize={15}
							items='center'
							display='flex'
						>
							{rating} ⭐️
						</Text>
						<Text
							fontSize={15}
							color='$textSecondary'
						>
							{reviews} отзыва
						</Text>
					</XStack>
				</YStack>
			</XStack>
		</Surface>
	);
};
