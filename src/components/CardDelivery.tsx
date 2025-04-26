import { TransportType } from '@/common';
import { NBSP } from '@/common/unicodes';
import { IconBaggage, IconKg, IconTransport } from '@/components/icons';
import { DateSelection, Profile } from '@/components/interfaces';
import { Divider } from '@/components/ui/Divider';
import { Surface } from '@/components/ui/Surface';
import { PackageInfo } from '@/modules/request/schema';
import { ChevronDown, MapPin, MoveRight, SquareArrowUpRight } from '@tamagui/lucide-icons';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Avatar, Button, Text, XStack, YStack } from 'tamagui';

interface Props {
	route: {
		from: string;
		to: string;
	}[];
	rewards: number;
	packageInfo: Omit<PackageInfo, 'photos' | 'description'>;
	dates: DateSelection;
	author: Profile;
	transportType: TransportType;
	createdAt: Date;
}

export function formatRelativeDate(date: Date) {
	return formatDistanceToNow(date, { addSuffix: true, locale: ru });
}
const formatDate = (date: Date) => {
	return format(date, 'dd MMM');
};

export const CardDelivery = (props: Props) => {
	return (
		<Surface padding={10}>
			<YStack gap={8}>
				<YStack gap={12}>
					<XStack justifyContent="space-between">
						<YStack maxWidth={240} gap={8}>
							<XStack gap={4} alignItems="center">
								<MapPin size={16} color="$white" />
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									overflow="hidden"
									color="$textPrimary"
									fontSize={16}
									flexShrink={1}
								>
									{props.route[0].from}
								</Text>
							</XStack>

							<XStack gap={4} alignItems="center">
								<MapPin size={16} color="$green800" />
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									overflow="hidden"
									color="$textPrimary"
									fontSize={16}
									flexShrink={1}
								>
									{props.route.at(-1)?.to}
								</Text>
							</XStack>
						</YStack>
						<Text numberOfLines={1} ellipsizeMode="tail" color="$textPrimary" fontSize={18}>
							{props.rewards}
							{NBSP}$
						</Text>
					</XStack>
					<XStack
						flexGrow={1}
						flexShrink={0}
						gap={4}
						alignItems="flex-start"
						justifyContent="space-between"
					>
						<YStack justifyContent="space-between" height="100%">
							<XStack alignItems="center" gap={4}>
								<IconTransport type={props.transportType} color="$blue800" size={16} />
								<XStack alignItems="center" gap={4}>
									<Text fontSize={14} color="$textPrimary">
										{formatDate(props.dates.from)}
									</Text>
								</XStack>
								<MoveRight size={12} color="$textSecondary" />
								<XStack alignItems="center" gap={4}>
									<Text fontSize={14} color="$textPrimary">
										{formatDate(props.dates.to)}
									</Text>
								</XStack>
							</XStack>
							<Button
								unstyled
								borderWidth={0}
								flexDirection="row"
								alignItems="center"
								color="$blue800"
								paddingHorizontal={0}
								fontSize={14}
								backgroundColor="transparent"
								iconAfter={ChevronDown}
							>
								Раскрыть детали
							</Button>
						</YStack>
						<YStack justifyContent="space-between" alignItems="flex-end" gap={8}>
							<Text fontSize={8} color="$textSecondary">
								Условия:
							</Text>
							<YStack gap={4} alignItems="flex-end">
								<XStack alignItems="center" gap={2}>
									<IconBaggage color="$textSecondary" size={14} />
									<Text color="$textSecondary" fontSize={12}>
										{props.packageInfo.length}x{props.packageInfo.width}x{props.packageInfo.height}
										см
									</Text>
								</XStack>
								<XStack alignItems="center" gap={2}>
									<IconKg color="$textSecondary" size={14} />
									<Text color="$textSecondary" fontSize={12}>
										{props.packageInfo.weight} кг
									</Text>
								</XStack>
							</YStack>
						</YStack>
					</XStack>
				</YStack>

				<Divider />

				<XStack justifyContent="space-between" alignItems="flex-end">
					<XStack gap={8} justifyContent="space-between" alignItems="center" width="max-content">
						<Avatar size={30} circular>
							<Avatar.Image src={props.author.avatar} />
						</Avatar>
						<YStack gap={4} justifyContent="center">
							<XStack alignItems="center">
								<Text color="$textPrimary" fontSize={13} numberOfLines={1} ellipsizeMode="tail">
									{props.author.firstName}
								</Text>
								<SquareArrowUpRight
									flexShrink={0}
									marginLeft={8}
									size={12}
									color="$textSecondary"
								/>
							</XStack>
							<XStack alignItems="center" gap={8}>
								<Text color="$textSecondary" fontSize={12} alignItems="center" display="flex">
									{props.author.rating} ⭐️
								</Text>
								<Text fontSize={10} color="$textSecondary">
									{props.author.reviews} отзыва
								</Text>
							</XStack>
						</YStack>
					</XStack>
					<XStack gap={8} alignItems="center">
						<Button backgroundColor="$blue500" color="$textPrimary" height={40} size="$2">
							Откликнуться
						</Button>
					</XStack>
					{/*<YStack gap={4} justifyContent="space-between" alignItems="flex-end">
						<XStack alignItems="center" gap={4}>
							<BaggageClaim size={12} color="$textSecondary" />
							<Text fontSize={12} color="$textSecondary">
								1 / 4 откликов
							</Text>
						</XStack>
						<XStack alignItems="center" gap={4}>
							<Clock2 size={12} color="$textSecondary" />
							<Text color="$textSecondary" fontSize={12}>
								{formatRelativeDate(props.createdAt)}
							</Text>
						</XStack>
					</YStack>*/}
				</XStack>
			</YStack>
		</Surface>
	);
};
