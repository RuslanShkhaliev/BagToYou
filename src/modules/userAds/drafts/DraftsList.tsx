import { ListUserAds } from '../ui/ListUserAds';
import { useDraftsAdsQuery } from './query';

export const DraftsList = () => {
	const { isFetching, refetch, data = [] } = useDraftsAdsQuery();

	return (
		<ListUserAds
			onRefresh={refetch}
			refreshing={isFetching}
			data={data}
		/>
	);
};
