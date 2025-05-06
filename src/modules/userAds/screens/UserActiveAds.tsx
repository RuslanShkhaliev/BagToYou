import { ListUserAds } from '@/modules/userAds/components/ListUserAds';
import { useUserActiveAdsQuery } from '@/modules/userAds/query';

export const UserActiveAds = () => {
	const { isFetching, refetch, data = [] } = useUserActiveAdsQuery();

	return (
		<ListUserAds
			data={data}
			onRefresh={refetch}
			refreshing={isFetching}
		/>
	);
};
