import { UserAd } from '@modules/ads/interfaces';
import { generateUserAdMock } from '@modules/ads/seed';
import { generateArray, randomInt } from '@shared/api/seed/helpers';
import { delay } from '@utils/delay';

export const fetchUserActiveAds = async (): Promise<UserAd[]> => {
	await delay(randomInt({ min: 300, max: 2000 }));
	return generateArray(randomInt({ min: 2, max: 15 }), generateUserAdMock);
};
export const fetchUserDraftsAds = async (): Promise<UserAd[]> => {
	await delay(randomInt({ min: 300, max: 2000 }));
	return generateArray(randomInt({ min: 1, max: 5 }), generateUserAdMock);
};
