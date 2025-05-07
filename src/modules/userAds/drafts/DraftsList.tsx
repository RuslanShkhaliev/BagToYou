import { useUserDraftsAdsQuery } from 'src/modules/userAds/model/query';
import { ListUserAds } from 'src/modules/userAds/ui/ListUserAds';

export const DraftsList = () => {
	const { isFetching, refetch, data = [] } = useUserDraftsAdsQuery();

	return (
		<ListUserAds
			onRefresh={refetch}
			refreshing={isFetching}
			data={data}
		/>
	);
};
