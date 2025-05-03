import { ListUserAds } from '@/modules/ads/components/ListUserAds';
import { useUserActiveAds } from '@/modules/ads/service';

export const UserActiveAds = () => {
	const { isFetching, refetch, data = [] } = useUserActiveAds();

	return (
		<ListUserAds
			data={data}
			onRefresh={refetch}
			refreshing={isFetching}
		/>
	);
};
