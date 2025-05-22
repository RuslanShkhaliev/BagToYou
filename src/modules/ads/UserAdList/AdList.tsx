import { UserAdModel } from '@modules/ads/api';
import { useUserAdsQuery } from '@modules/ads/queries';
import { AdListItem } from '@modules/ads/UserAdList/AdListItem';
import { AdSkeletonCard } from '@modules/ads/UserAdList/AdSkeletonCard';
import { AdStatus } from '@shared/api/models/ad';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { View } from 'tamagui';

export const AdList = ({
	status,
	data,
}: {
	status: AdStatus;
	data: UserAdModel[];
}) => {
	const { refetch, isFetching, isLoading } = useUserAdsQuery();

	const router = useRouter();
	const openDetails = (id: string) => {
		console.log({ id });
		router.push(`/details/${id}`);
	};

	if (isLoading) {
		return (
			<FlatList
				contentContainerStyle={{
					paddingTop: 20,
				}}
				data={Array(5).fill(null)}
				renderItem={() => (
					<View pb={10}>
						<AdSkeletonCard />
					</View>
				)}
				keyExtractor={(_, index) => `skeleton-${index}`}
			/>
		);
	}
	return (
		<FlatList
			contentContainerStyle={{
				paddingTop: 20,
			}}
			data={data}
			extraData={status}
			onRefresh={refetch}
			refreshing={isFetching}
			renderItem={({ item }) => (
				<View
					pb={10}
					onPress={() => openDetails(item.id)}
				>
					<AdListItem data={item} />
				</View>
			)}
			keyExtractor={(item) => String(item.id)}
		/>
	);
};
