import { IconBaggage, IconKg, IconTransport } from '@/components/icons';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { Surface } from '@/components/ui/Surface';
import { DeliveryInfo } from '@/shared/interfaces';
import { NBSP } from '@/shared/unicodes';
import {
	ChevronDown,
	MapPin,
	MoveRight,
	SquareArrowUpRight,
} from '@tamagui/lucide-icons';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Avatar, Button, Text, XStack, YStack } from 'tamagui';

export function formatRelativeDate(date: Date) {
	return formatDistanceToNow(date, { addSuffix: true, locale: ru });
}

const formatDate = (date: Date) => {
	return format(date, 'dd MMM');
};

export const CardDelivery = (props: DeliveryInfo) => {
	return (
		<Surface>
			<YStack gap={8}>
				<YStack gap={12}>
					<XStack justify='space-between'>
						<YStack
							maxW={240}
							gap={8}
						>
							<XStack
								gap={4}
								items='center'
							>
								<MapPin
									size={16}
									color='$white'
									shrink={0}
								/>
								<Text
									numberOfLines={1}
									ellipsizeMode='tail'
									overflow='hidden'
									color='$textPrimary'
									fontSize={16}
									shrink={1}
								>
									{props.route[0].from.city}
								</Text>
							</XStack>

							<XStack
								gap={4}
								items='center'
							>
								<MapPin
									size={16}
									color='$green800'
								/>
								<Text
									numberOfLines={1}
									ellipsizeMode='tail'
									overflow='hidden'
									color='$textPrimary'
									fontSize={16}
									shrink={1}
								>
									{props.route.at(-1)?.to?.city}
								</Text>
								{props.route[1]?.to?.country && (
									<Badge
										containerProps={{
											height: '100%',
										}}
									>
										{props.route[1].to.country}
									</Badge>
								)}
							</XStack>
						</YStack>
						<Text
							numberOfLines={1}
							ellipsizeMode='tail'
							color='$textPrimary'
							fontSize={18}
						>
							{props.rewards}
							{NBSP}$
						</Text>
					</XStack>
					<XStack
						gap={4}
						items='flex-start'
						justify='space-between'
					>
						<YStack
							grow={1}
							justify='space-between'
						>
							<XStack
								items='center'
								gap={4}
							>
								<IconTransport
									type={props.transportType}
									color='$blue800'
									size={16}
								/>
								<XStack
									items='center'
									gap={4}
								>
									<Text
										fontSize={14}
										color='$textPrimary'
									>
										{formatDate(props.dates.from)}
									</Text>
								</XStack>
								<MoveRight
									size={12}
									color='$textSecondary'
								/>
								<XStack
									items='center'
									gap={4}
								>
									<Text
										fontSize={14}
										color='$textPrimary'
									>
										{formatDate(props.dates.to)}
									</Text>
								</XStack>
							</XStack>
							<Button
								unstyled
								borderWidth={0}
								flexDirection='row'
								items='center'
								color='$blue800'
								px={0}
								fontSize={14}
								bg='transparent'
								iconAfter={ChevronDown}
							>
								Раскрыть детали
							</Button>
						</YStack>
						<YStack
							justify='space-between'
							items='flex-end'
							gap={8}
						>
							<Text
								fontSize={10}
								color='$textSecondary'
							>
								Условия:
							</Text>
							<YStack
								gap={4}
								items='flex-end'
							>
								<XStack
									items='center'
									gap={4}
								>
									<IconBaggage
										color='$textSecondary'
										size={12}
									/>
									<Text
										color='$textSecondary'
										lineHeight={14}
										fontSize={12}
									>
										{props.parcelInfo.length}x{props.parcelInfo.width}x
										{props.parcelInfo.height}
										см
									</Text>
								</XStack>
								<XStack
									items='center'
									gap={4}
								>
									<IconKg
										color='$textSecondary'
										size={12}
									/>
									<Text
										color='$textSecondary'
										fontSize={12}
									>
										{props.parcelInfo.weight} кг
									</Text>
								</XStack>
							</YStack>
						</YStack>
					</XStack>
				</YStack>

				<Divider />

				<XStack
					justify='space-between'
					items='flex-end'
				>
					<XStack
						gap={8}
						justify='space-between'
						items='center'
						width='max-content'
					>
						<Avatar
							size={30}
							circular
						>
							<Avatar.Image src={props.author.avatar} />
						</Avatar>
						<YStack
							gap={4}
							justify='center'
						>
							<XStack items='center'>
								<Text
									color='$textPrimary'
									fontSize={13}
									numberOfLines={1}
									ellipsizeMode='tail'
								>
									{props.author.firstName}
								</Text>
								<SquareArrowUpRight
									shrink={0}
									ml={8}
									size={12}
									color='$textSecondary'
								/>
							</XStack>
							<XStack
								items='center'
								gap={8}
							>
								<Text
									color='$textSecondary'
									fontSize={12}
									items='center'
									display='flex'
								>
									{props.author.rating} ⭐️
								</Text>
								<Text
									fontSize={10}
									color='$textSecondary'
								>
									{props.author.reviews} отзыва
								</Text>
							</XStack>
						</YStack>
					</XStack>
					<XStack
						gap={8}
						items='center'
					>
						<Button
							bg='$blue500'
							color='$textPrimary'
							height={40}
							size='$2'
						>
							Откликнуться
						</Button>
					</XStack>
				</XStack>
			</YStack>
		</Surface>
	);
};
