import { generateArray, randomInt } from '@shared/api/seed/helpers';
import { delay } from '@utils/delay';
import { UserAd } from '../interfaces';
import { generateUserAdMock } from '../seed';

export const fetchActiveAds = async (): Promise<UserAd[]> => {
	await delay(randomInt({ min: 300, max: 2000 }));
	return generateArray(randomInt({ min: 2, max: 15 }), generateUserAdMock);
};
