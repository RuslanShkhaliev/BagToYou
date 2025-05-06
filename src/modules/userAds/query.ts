import { fetchUserActiveAds, fetchUserDraftsAds } from '@/modules/userAds/api';
import { useQuery } from 'react-query';

export const useUserActiveAdsQuery = () => {
	return useQuery(['activeAds'], fetchUserActiveAds, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useUserDraftsAdsQuery = () => {
	return useQuery(['draftsAds'], fetchUserDraftsAds, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
