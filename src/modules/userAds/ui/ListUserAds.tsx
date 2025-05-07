import { FlatList, FlatListProps } from 'react-native';
import { View } from 'tamagui';
import { UserAd } from '../interfaces';
import { CardUserAd } from './CardUserAd';

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
