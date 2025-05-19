import { tokens } from '@shared/styles';
import { memo, useCallback } from 'react';
import {
	CalendarList as CalendarListBase,
	CalendarProps,
	DateData,
} from 'react-native-calendars';
import { useTheme } from 'tamagui';
import { CalendarDay } from './CalendarDay';

interface CalendarListProps extends Omit<CalendarProps, 'onDayPress'> {
	onDayPress: (date: DateData) => void;
}

interface Marking {
	selected?: boolean;
	marked?: boolean;
	startingDay?: boolean;
	endingDay?: boolean;
}

interface DayProps {
	date: DateData;
	marking: Marking;
}

export const CalendarList = memo(
	({ onDayPress, ...props }: CalendarListProps) => {
		const theme = useTheme();
		const today = new Date().toISOString().split('T')[0]!;

		const handleDayPress = useCallback(
			(day: DateData) => {
				onDayPress(day);
			},
			[onDayPress],
		);

		const renderDay = useCallback(
			({ date, marking }: DayProps) => {
				return (
					<CalendarDay
						date={date}
						{...marking}
						onPress={handleDayPress}
					/>
				);
			},
			[handleDayPress],
		);

		return (
			<CalendarListBase
				futureScrollRange={12}
				pastScrollRange={0}
				bounces
				minDate={today}
				markingType='period'
				calendarStyle={calendarStyleMemo}
				contentContainerStyle={{
					paddingVertical: 16,
				}}
				dayComponent={renderDay}
				theme={calendarTheme(theme)}
				{...props}
			/>
		);
	},
);

const calendarTheme = (
	theme: ReturnType<typeof useTheme>,
): CalendarProps['theme'] =>
	({
		textMonthFontSize: 17,
		textMonthFontWeight: 'bold',
		calendarBackground: 'transparent',
		dayTextColor: 'red',
		backgroundColor: 'red',

		monthTextColor: theme.textPrimary.val,
		textSectionTitleColor: theme.textSecondary.val,
		selectedDayBackgroundColor: theme.outlineColor.val,
		selectedDayTextColor: theme.textPrimary.val,
		todayTextColor: theme.textPrimary.val,
		contentStyle: {
			gap: 16,
		},
		'stylesheet.calendar.header': {
			week: {
				marginTop: 10,
				marginHorizontal: 12,
				flexDirection: 'row',
				justifyContent: 'space-between',
			},
			month: {
				textAlign: 'left',
				justifyContent: 'flex-start',
			},
		},
	}) as const;
const calendarStyleMemo = {
	marginBottom: 16,
	paddingBottom: 8,
	backgroundColor: tokens.color.graphite600.val,
	borderRadius: 16,
	width: '100%',
} as const;
