import { faker } from '@faker-js/faker';
import { randomInt } from '@shared/api/seed/helpers';

export const getUserInfo = () => ({
	name: faker.person.firstName(),
	surname: faker.person.lastName(),
	avatar: faker.image.avatar(),
	rating: randomInt({ min: 1, max: 5 }),
	phone: '+7 (999) 999-99-99',
	reviews: randomInt({ min: 0, max: 20 }),
});
