import { UserAd, UserAds } from '@/modules/ads/interfaces';
import { createContext, useContext } from 'react';
import { UseQueryResult } from 'react-query';

type RefetchFn = UseQueryResult<UserAd[]>['refetch'];

export interface UserAdsContextType {
	ads: UserAds;
	refetchActive: RefetchFn;
	refetchDrafts: RefetchFn;
}

export const UserAdsContext = createContext<UserAdsContextType | null>(null);

export const useUserAdsContext = (): UserAdsContextType => {
	const ctx = useContext(UserAdsContext);
	if (!ctx) {
		throw new Error('UserAdsContext not found');
	}

	return ctx;
};
