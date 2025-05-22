import { useAuth } from '@context/auth.context';
import { fetchAdById, fetchUserAds, UserAdModel } from '@modules/ads/api';
import { AdStatus } from '@shared/api/models/ad';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEYS = {
	userAds: ['userAds'],
	adDetails: (id: string) => ['adDetails', id],
};
type AdsByStatusMap = Record<Partial<AdStatus>, UserAdModel[]>;

export const useUserAdsQuery = () => {
	const { userId } = useAuth();

	return useQuery({
		queryKey: QUERY_KEYS.userAds,
		queryFn: () => fetchUserAds(userId!),
		placeholderData: [],
		staleTime: 60 * 5 * 1000,
		select: (data): AdsByStatusMap => {
			return data.reduce((adsMap, ad) => {
				const status = ad.status || AdStatus.Draft;
				if (!adsMap[status]) {
					adsMap[status] = [];
				}
				adsMap[status].push(ad);
				return adsMap;
			}, {} as AdsByStatusMap);
		},
	});
};

export const useAdQuery = (id: string) => {
	return useQuery({
		queryKey: QUERY_KEYS.adDetails(id),
		queryFn: () => fetchAdById(id),
	});
};
