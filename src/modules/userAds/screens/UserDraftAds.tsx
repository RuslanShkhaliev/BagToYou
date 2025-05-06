import { ListUserAds } from '@/modules/userAds/components/ListUserAds';
import { useUserDraftsAdsQuery } from '@/modules/userAds/query';

export const UserDraftAds = () => {
	const { isFetching, refetch, data = [] } = useUserDraftsAdsQuery();

	return (
		<ListUserAds
			onRefresh={refetch}
			refreshing={isFetching}
			data={data}
		/>
	);
};
