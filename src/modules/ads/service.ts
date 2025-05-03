import { fetchUserActiveAds, fetchUserDraftsAds } from '@/modules/ads/api';
import { useQuery } from 'react-query';

export const useUserActiveAds = () => {
	return useQuery(['activeAds'], fetchUserActiveAds, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useUserDraftsAds = () => {
	return useQuery(['draftsAds'], fetchUserDraftsAds, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
