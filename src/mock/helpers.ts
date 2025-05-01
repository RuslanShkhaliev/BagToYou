import { TransportType } from '@/common';
import { DeliveryInfo } from '@/common/interfaces';
import { Location, RouteSchema } from '@/common/schema';
import { faker } from '@faker-js/faker';

function randomEnumValue<T extends object>(anEnum: T): number {
	const values = Object.values(anEnum).filter((val) => typeof val === 'number');
	return faker.helpers.arrayElement(values);
}

const generateProfileInfo = () => ({
	avatar: faker.image.avatar(),
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
	reviews: faker.number.int({ min: 0, max: 200000 }),
});

const generateParcelInfo = () => ({
	weight: faker.number.int({ min: 1, max: 20 }).toString(),
	length: faker.number.int({ min: 10, max: 120 }).toString(),
	width: faker.number.int({ min: 10, max: 90 }).toString(),
	height: faker.number.int({ min: 22, max: 100 }).toString(),
	photos: Array.from({ length: faker.number.int({ min: 0, max: 4 }) }, () =>
		faker.image.url(),
	),
});
export const generateLocationMock = (): Location => ({
	city: faker.location.city(),
	country: faker.location.country(),
	lng: faker.location.longitude(),
	lat: faker.location.latitude(),
});
export const generateMockDeliveryInfo = (
	props: { route?: RouteSchema } = {},
): DeliveryInfo => {
	const fromDate = faker.date.future(); // например, через 0–1 год
	const toDate = faker.date.between({
		from: fromDate,
		to: faker.date.future({ years: 1, refDate: fromDate }), // максимум через год после from
	});

	const route = props.route
		? [props.route]
		: Array.from({ length: faker.number.int({ min: 1, max: 9 }) }, () => ({
				from: generateLocationMock(),
				to: generateLocationMock(),
			}));

	return {
		id: faker.number.int(),
		route,
		rewards: faker.number.int({ min: 1244, max: 140249 }),
		parcelInfo: generateParcelInfo(),
		dates: {
			from: fromDate,
			to: toDate,
		},
		author: generateProfileInfo(),
		transportType: randomEnumValue(TransportType),
		createdAt: faker.date.recent({
			days: faker.number.int({ min: 1, max: 30 }),
		}),
	};
};

export const createMockRequests = (length = 20) => {
	return Array.from({ length }, () => generateMockDeliveryInfo());
};
