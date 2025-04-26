import { TransportType } from '@/common';
import { IconBaggage } from '@/components/icons/IconBaggage';
import { IconKg } from '@/components/icons/IconKg';
import { PageWrapper } from '@/components/PageWrapper';
import { RoutesInputGroup } from '@/components/RoutesInputGroup';
import { Divider } from '@/components/ui/Divider';
import { Surface } from '@/components/ui/Surface';
import { faker } from '@faker-js/faker';
import {
	BaggageClaim,
	Bike,
	Bus,
	Car,
	Clock2,
	MapPin,
	MoveRight,
	Plane,
	Route,
	Ship,
	SquareArrowUpRight,
	TrainFront,
} from '@tamagui/lucide-icons';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Avatar, H1, Text, XStack, YStack } from 'tamagui';

function randomEnumValue<T extends object>(anEnum: T): number {
	const values = Object.values(anEnum).filter((val) => typeof val === 'number');
	return faker.helpers.arrayElement(values);
}
export function formatRelativeDate(date: Date) {
	return formatDistanceToNow(date, { addSuffix: true, locale: ru });
}

const transportIcons = {
	[TransportType.Plane]: Plane,
	[TransportType.Bike]: Bike,
	[TransportType.Car]: Car,
	[TransportType.Ship]: Ship,
	[TransportType.Train]: TrainFront,
	[TransportType.Bus]: Bus,
};
export function getTransportIcon(type: TransportType) {
	const Icon = transportIcons[type];

	return <Icon color="$blue800" size={16} />;
}

const formatDate = (date: Date) => {
	return format(date, 'dd MMM');
};

const createMockRequest = () => {
	const fromDate = faker.date.future(); // например, через 0–1 год
	const toDate = faker.date.between({
		from: fromDate,
		to: faker.date.future({ years: 1, refDate: fromDate }), // максимум через год после from
	});

	const route = Array.from({ length: faker.number.int({ min: 1, max: 9 }) }, () => ({
		from: faker.location.city(),
		to: faker.location.city(),
	}));

	return {
		id: faker.number.int(),
		route,
		rewards: faker.number.int({ min: 1244, max: 140249 }),
		packageInfo: {
			weight: faker.number.int({ min: 1, max: 20 }),
			length: faker.number.int({ min: 10, max: 120 }),
			width: faker.number.int({ min: 10, max: 90 }),
			height: faker.number.int({ min: 22, max: 100 }),
		},
		dates: {
			from: fromDate,
			to: toDate,
		},
		author: {
			avatar: faker.image.avatar(),
			name: faker.person.fullName(),
			rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
			reviews: faker.number.int({ min: 0, max: 200000 }),
		},
		transportType: randomEnumValue(TransportType),
		createdAt: faker.date.recent({ days: faker.number.int({ min: 1, max: 30 }) }),
	};
};
const requests = Array.from({ length: 100 }, () => createMockRequest());

export const SearchScreen = () => {
	return (
		<PageWrapper>
			<H1 size="$4" textAlign="center" paddingVertical={20} color="$textPrimary">
				Поиск по заявкам
			</H1>
			<YStack gap={10}>
				<RoutesInputGroup to={''} from={''} onFromSelect={() => {}} onToSelect={() => {}} />
				<YStack gap={10}>
					{requests.map((request) => (
						<Surface padding={10} key={request.id}>
							<YStack gap={8}>
								<XStack justifyContent="space-between">
									<YStack gap={12}>
										<XStack flexShrink={1} alignItems="center" gap={8}>
											<MapPin size={16} color="$blue800" />
											<Text
												numberOfLines={1}
												ellipsizeMode="tail"
												color="$textPrimary"
												fontSize={16}
											>
												{request.route[0].from}{' '}
												{request.route.length > 1 ? (
													<Route size={12} color="$orange800" />
												) : (
													<MoveRight size={12} color="$textSecondary" />
												)}{' '}
												{request.route.at(-1)!.to}
											</Text>
										</XStack>
										<XStack flexGrow={1} flexShrink={0} gap={4} alignItems="center">
											{getTransportIcon(request.transportType)}
											<XStack alignItems="center" gap={4}>
												<Text fontSize={14} color="$textPrimary">
													{formatDate(request.dates.from)}
												</Text>
											</XStack>
											<MoveRight size={12} color="$textSecondary" />
											<XStack alignItems="center" gap={4}>
												<Text fontSize={14} color="$textPrimary">
													{formatDate(request.dates.to)}
												</Text>
											</XStack>
										</XStack>
									</YStack>
									<YStack justifyContent="space-between" alignItems="flex-end" gap={8}>
										<Text color="$textPrimary" fontSize={18}>
											{request.rewards} $
										</Text>
										<YStack gap={4} alignItems="flex-end">
											<XStack alignItems="center" gap={2}>
												<IconBaggage color="$textSecondary" size={14} />
												<Text color="$textSecondary" fontSize={12}>
													{request.packageInfo.length}x{request.packageInfo.width}x
													{request.packageInfo.height}см
												</Text>
											</XStack>
											<XStack alignItems="center" gap={2}>
												<IconKg color="$textSecondary" size={14} />
												<Text color="$textSecondary" fontSize={12}>
													{request.packageInfo.weight} кг
												</Text>
											</XStack>
										</YStack>
									</YStack>
								</XStack>

								<Divider />

								<XStack justifyContent="space-between" alignItems="flex-end">
									<XStack
										gap={8}
										justifyContent="space-between"
										alignItems="center"
										width="max-content"
									>
										<Avatar size={30} circular>
											<Avatar.Image src={request.author.avatar} />
										</Avatar>
										<YStack gap={4} justifyContent="center">
											<XStack alignItems="center">
												<Text color="$textPrimary" fontSize={13}>
													{request.author.name}
												</Text>
												<SquareArrowUpRight marginLeft={8} size={12} color="$textSecondary" />
											</XStack>
											<XStack alignItems="center" gap={8}>
												<Text
													color="$textSecondary"
													fontSize={12}
													alignItems="center"
													display="flex"
												>
													{request.author.rating} ⭐️
												</Text>
												<Text fontSize={10} color="$textSecondary">
													{request.author.reviews} отзыва
												</Text>
											</XStack>
										</YStack>
									</XStack>
									<YStack gap={4} justifyContent="space-between" alignItems="flex-end">
										<XStack alignItems="center" gap={4}>
											<BaggageClaim size={12} color="$textSecondary" />
											<Text fontSize={12} color="$textSecondary">
												1 / 4 откликов
											</Text>
										</XStack>
										<XStack alignItems="center" gap={4}>
											<Clock2 size={12} color="$textSecondary" />
											<Text color="$textSecondary" fontSize={12}>
												{formatRelativeDate(request.createdAt)}
											</Text>
										</XStack>
									</YStack>
								</XStack>
							</YStack>
						</Surface>
					))}
				</YStack>
			</YStack>
		</PageWrapper>
	);
};
