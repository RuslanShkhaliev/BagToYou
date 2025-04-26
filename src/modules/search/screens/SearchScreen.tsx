import { TransportType } from '@/common';
import { CardDelivery } from '@/components/CardDelivery';
import { PageWrapper } from '@/components/PageWrapper';
import { RoutesInputGroup } from '@/components/RoutesInputGroup';
import { SheetWrapper } from '@/components/SheetWrapper';
import { faker } from '@faker-js/faker';
import { Bike, Bus, Car, Plane, Ship, TrainFront } from '@tamagui/lucide-icons';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { H1, ScrollView, YStack } from 'tamagui';

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
	console.log('create mock');
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
			weight: faker.number.int({ min: 1, max: 20 }).toString(),
			length: faker.number.int({ min: 10, max: 120 }).toString(),
			width: faker.number.int({ min: 10, max: 90 }).toString(),
			height: faker.number.int({ min: 22, max: 100 }).toString(),
		},
		dates: {
			from: fromDate,
			to: toDate,
		},
		author: {
			avatar: faker.image.avatar(),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
			reviews: faker.number.int({ min: 0, max: 200000 }),
		},
		transportType: randomEnumValue(TransportType),
		createdAt: faker.date.recent({ days: faker.number.int({ min: 1, max: 30 }) }),
	};
};
const requests = Array.from({ length: 100 }, () => createMockRequest());

console.log(requests);
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
						<CardDelivery key={request.id} {...request} />
					))}
				</YStack>
			</YStack>
			<SheetWrapper>
				<ScrollView></ScrollView>
			</SheetWrapper>
		</PageWrapper>
	);
};
