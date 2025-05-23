import { DetailsCard } from '@components/DetailsCard';
import { CirclePoint } from '@icons/CirclePoint';
import { LocationSchema } from '@shared/schemas';
import { CalendarDays } from '@tamagui/lucide-icons';
import { formatDate } from '@utils/dates';
import { YStack } from 'tamagui';

interface RouteDetailsItemProps {
	location: LocationSchema;
	date: string | null;
}

const DEFAULT_DATE_MESSAGE = 'Дата не задана';

export const RouteDetailsItem = ({ location, date }: RouteDetailsItemProps) => {
	const displayDate = date ? formatDate(date) : DEFAULT_DATE_MESSAGE;

	return (
		<YStack
			gap={4}
			position={'relative'}
		>
			<DetailsCard.Item
				left={<CirclePoint />}
				description={location.city}
			/>
			<DetailsCard.Item
				left={
					<CalendarDays
						size={16}
						color={'transparent'}
					/>
				}
				label={displayDate}
			/>
		</YStack>
	);
};
