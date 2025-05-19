import { CalendarList } from '@components/CalendarList/CalendarList';
import { DateISOSchema } from '@shared/schema/date';
import { formatDate } from 'date-fns';
import { useMemo } from 'react';
import { DateData } from 'react-native-calendars';

interface CalendarSingleProps {
	onDaySelect: (date: DateISOSchema) => void;
	date: DateISOSchema;
}
export const CalendarSingle = ({ date, onDaySelect }: CalendarSingleProps) => {
	const formattedDate = date ? formatDate(date, 'yyyy-MM-dd') : '';

	const marked = useMemo(
		() => ({
			[formattedDate]: {
				selected: true,
				selectedColor: '$accent',
			},
		}),
		[date],
	);

	const handleDayPress = (date: DateData) => {
		onDaySelect(new Date(date.dateString).toISOString());
	};
	return (
		<CalendarList
			markedDates={marked}
			onDayPress={handleDayPress}
		/>
	);
};
