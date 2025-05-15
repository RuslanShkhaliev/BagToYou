import { DeliveryInfo } from '@shared/interfaces';
import { CardDelivery } from '@modules/shipment/components/CardDelivery';
import { ScreenLayout } from '@components/layout';
import { useState } from 'react';
import { FlatList } from 'react-native';

export const ListScreen = () => {
	const [data, setData] = useState<DeliveryInfo[]>([]);
	return (
		<ScreenLayout>
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
		</ScreenLayout>
	);
};
