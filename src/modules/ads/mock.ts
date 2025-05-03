import { randomInt } from '@/mock/helpers';
import { UserAd } from '@/modules/ads/interfaces';
import { faker } from '@faker-js/faker';

export const generateUserAdMock = (): UserAd => ({
	expired: faker.date.future().toString(),
	images: Array.from({ length: randomInt({ min: 1, max: 5 }) }, () =>
		faker.image.url(),
	),
	name: faker.commerce.productName(),
});
