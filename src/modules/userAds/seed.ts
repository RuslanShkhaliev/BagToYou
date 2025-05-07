import { faker } from '@faker-js/faker';
import { UserAd } from '@modules/userAds/interfaces';
import { randomInt } from '@shared/api/seed/helpers';

export const generateUserAdMock = (): UserAd => ({
	expired: faker.date.future().toString(),
	images: Array.from({ length: randomInt({ min: 1, max: 5 }) }, () =>
		faker.image.url(),
	),
	name: faker.commerce.productName(),
});
