import { useQuery } from '@tanstack/react-query';
import { fetchUserDraftsAds } from './api';

export const useDraftsAdsQuery = () => {
	return useQuery({
		queryKey: ['draftsAds'],
		queryFn: fetchUserDraftsAds,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
