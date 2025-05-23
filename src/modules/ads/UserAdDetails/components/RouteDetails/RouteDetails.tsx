import { DetailsCard } from '@components/DetailsCard';
import { IconTransport } from '@components/icons';
import { RouteDetailsItem } from '@modules/ads/UserAdDetails/components/RouteDetails/RouteDetailsItem';
import { TransportType } from '@shared/enums';
import { RouteSchema } from '@shared/schemas';
import { View, YStack } from 'tamagui';

interface DatesRange {
	startDate: string | null;
	endDate: string | null;
}

interface RouteDetailsProps {
	route: RouteSchema;
	dates: DatesRange;
	transport?: TransportType;
}

export const RouteDetails = ({
	route,
	dates,
	transport,
}: RouteDetailsProps) => {
	const { from, to } = route;
	const { startDate, endDate } = dates;

	return (
		<DetailsCard.Layout>
			<YStack gap={20}>
				<View
					position={'absolute'}
					l={7}
					t={18}
					height={45}
					width={2}
					bg={'$textDisabled'}
				/>
				<RouteDetailsItem
					location={from}
					date={startDate}
				/>
				<RouteDetailsItem
					location={to}
					date={endDate}
				/>
			</YStack>
			{transport && (
				<DetailsCard.Item
					left={
						<IconTransport
							color={'$accent'}
							size={20}
							type={Number(transport)}
						/>
					}
					description='Транспорт'
				/>
			)}
		</DetailsCard.Layout>
	);
};
