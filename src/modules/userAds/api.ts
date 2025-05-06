import { UserAd } from '@/modules/userAds/interfaces';
import { generateUserAdMock } from '@/modules/userAds/seed';
import { generateArray, randomInt } from '@/seed/helpers';
import { delay } from '@/shared/utils/delay';

export const fetchUserActiveAds = async (): Promise<UserAd[]> => {
	await delay(randomInt({ min: 300, max: 2000 }));
	return generateArray(randomInt({ min: 2, max: 15 }), generateUserAdMock);
};
export const fetchUserDraftsAds = async (): Promise<UserAd[]> => {
	await delay(randomInt({ min: 300, max: 2000 }));
	return generateArray(randomInt({ min: 1, max: 5 }), generateUserAdMock);
};
