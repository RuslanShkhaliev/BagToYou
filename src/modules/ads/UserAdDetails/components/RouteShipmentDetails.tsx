import { DetailsCard } from '@components/DetailsCard';
import { DateType } from '@modules/shipment/creation/interfaces';
import { RouteSchema } from '@shared/schemas';
import { DateShipmentSchema } from '@shared/schemas/adShipment';
import { Calendar, MapPin } from '@tamagui/lucide-icons';
import { formatDate } from '@utils/dates';

interface RouteDetailsProps {
	route: RouteSchema;
	date: DateShipmentSchema;
}

export const RouteShipmentDetails = ({ route, date }: RouteDetailsProps) => {
	const { from, to } = route;

	const displayDate =
		date.type === DateType.BY_DATE
			? formatDate(date.value!)
			: 'Как можно быстрее';
	return (
		<DetailsCard.Layout>
			<DetailsCard.Item
				icon={
					<MapPin
						size={20}
						color='$accent'
					/>
				}
				label='Откуда'
				description={from.city}
			/>
			<DetailsCard.Item
				icon={
					<MapPin
						size={20}
						color='$accent'
					/>
				}
				label='Куда'
				description={to.city}
			/>
			<DetailsCard.Item
				icon={
					<Calendar
						size={20}
						color='$accent'
					/>
				}
				label='Дата получения'
				description={displayDate}
			/>
		</DetailsCard.Layout>
	);
};
