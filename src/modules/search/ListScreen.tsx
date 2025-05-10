import { DeliveryInfo } from '@shared/interfaces';
import { CardDelivery } from '@modules/delivery/components/CardDelivery';
import { ScreenView } from '@components/layout';
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
