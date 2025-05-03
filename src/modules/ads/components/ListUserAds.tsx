import { CardUserAd } from '@/modules/ads/components/CardUserAd';
import { UserAd } from '@/modules/ads/interfaces';
import { FlatList, FlatListProps } from 'react-native';
import { View } from 'tamagui';

interface ListUserAdsProps extends Omit<FlatListProps<UserAd>, 'renderItem'> {}

export const ListUserAds = ({ data = [], ...props }: ListUserAdsProps) => {
	return (
		<FlatList
			contentContainerStyle={{
				paddingTop: 20,
			}}
			data={data}
			renderItem={({ item }) => (
				<View pb={10}>
					<CardUserAd {...item} />
				</View>
			)}
			{...props}
		/>
	);
};
