import { faker } from '@faker-js/faker';
import { generateLocationMock, generateMockDeliveryInfo } from './helpers';

const length = 500;
const lastIndex = length - 1;
export const locations = Array.from({ length }, () => generateLocationMock());
export const deliveries = Array.from({ length: length * 3 }, (_, i) => {
	const from = locations[i % lastIndex];
	const to =
		locations[faker.number.int({ min: (i + 1) % lastIndex, max: lastIndex })];
	return generateMockDeliveryInfo({
		route: {
			from,
			to,
		},
	});
});

export const dbSeed = {
	locations,
	deliveries,
};
