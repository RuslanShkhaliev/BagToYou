import { ListUserAds } from 'src/modules/userAds/ui/ListUserAds';
import { useActiveAdsQuery } from './query';

export const ActiveList = () => {
	const { isFetching, refetch, data = [] } = useActiveAdsQuery();

	return (
		<ListUserAds
			data={data}
			onRefresh={refetch}
			refreshing={isFetching}
		/>
	);
};
