import { DetailsCard } from '@components/DetailsCard';
import { IconTransport } from '@components/icons';
import { TransportType } from '@shared/enums';
import { DateRangeSchema, RouteSchema } from '@shared/schemas';
import { Calendar, MapPin } from '@tamagui/lucide-icons';
import { formatDate } from '@utils/dates';

interface RouteDetailsProps {
	route: RouteSchema;
	dates: DateRangeSchema;
	transport: TransportType;
}

export const RouteDeliveryDetails = ({
	route,
	dates,
	transport,
}: RouteDetailsProps) => {
	const { from, to } = route;
	const { startDate, endDate } = dates;

	const displayStartDate = formatDate(startDate);
	const displayEndDate = formatDate(endDate);
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
				label='Дата отправления'
				description={displayStartDate}
			/>

			<DetailsCard.Item
				icon={
					<Calendar
						size={20}
						color='$accent'
					/>
				}
				label='Дата прибытия'
				description={displayEndDate}
			/>
			<DetailsCard.Item
				icon={
					<IconTransport
						color={'$accent'}
						size={20}
						type={Number(transport)}
					/>
				}
				description='Транспорт'
			/>
		</DetailsCard.Layout>
	);
};
