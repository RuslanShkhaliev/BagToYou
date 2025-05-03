import { ListUserAds } from '@/modules/ads/components/ListUserAds';
import { useUserDraftsAds } from '@/modules/ads/service';

export const UserDraftAds = () => {
	const { isFetching, refetch, data = [] } = useUserDraftsAds();

	return (
		<ListUserAds
			onRefresh={refetch}
			refreshing={isFetching}
			data={data}
		/>
	);
};
