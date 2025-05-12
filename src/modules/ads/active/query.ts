import { useQuery } from '@tanstack/react-query';
import { fetchActiveAds } from './api';

export const useActiveAdsQuery = () => {
	return useQuery({
		queryKey: ['activeAds'],
		queryFn: fetchActiveAds,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
