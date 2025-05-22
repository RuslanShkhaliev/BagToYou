import { LayoutScreen } from '@components/layout';
import { CardDelivery } from '@modules/shipment/components/CardDelivery';
import { DeliveryInfo } from '@shared/interfaces';
import { useState } from 'react';
import { FlatList } from 'react-native';

export const ListScreen = () => {
	const [data, setData] = useState<DeliveryInfo[]>([]);
	return (
		<LayoutScreen px={0}>
			<FlatList
				data={data}
				renderItem={({ item, index }) => <CardDelivery {...item} />}
			/>
		</LayoutScreen>
	);
};
