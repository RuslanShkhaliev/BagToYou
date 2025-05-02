import { DeliveryInfo } from '@/common/interfaces';
import { CardDelivery } from '@/components/CardDelivery';
import { ScreenView } from '@/components/ScreenView';
import { useState } from 'react';
import { FlatList } from 'react-native';

export const ListScreen = () => {
	const [data, setData] = useState<DeliveryInfo[]>([]);
	return (
		<ScreenView>
			<FlatList
				ListHeaderComponent={() => (

				)}
				data={data}
				renderItem={
					({item, index}) => (
						<CardDelivery {...item}/>
					)
				}
			/>
		</ScreenView>
	);
};
