import { CalendarList } from '@components/CalendarList/CalendarList';
import { eachDayOfInterval } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { DateRangeSchema } from 'src/shared/schemas';
import { View } from 'tamagui';
import { parseISO, toISO } from '../utils';
import { ActiveTab, DateRangeTabs } from './DateRangeTabs/DateRangeTabs';
import { useDateRangeReducer } from './useDateRangeReducer';

interface CalendarRangeProps {
	onRangeSelect: (date: DateRangeSchema) => void;
	initialDates: DateRangeSchema;
}

export const CalendarRange = ({
	initialDates,
	onRangeSelect,
}: CalendarRangeProps) => {
	const isFirstRender = useRef(true);
	const [tab, setActiveTab] = useState<ActiveTab>(ActiveTab.WHEN);
	const { dates, setStartDate, setEndDate, clearDates } =
		useDateRangeReducer(initialDates);

	useEffect(() => {
		if (initialDates.startDate && !initialDates.endDate) {
			setActiveTab(ActiveTab.RETURN);
		} else {
			setActiveTab(ActiveTab.WHEN);
		}
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		onRangeSelect({
			startDate: toISO(dates.startDate),
			endDate: toISO(dates.endDate),
		});
	}, [dates]);

	const marked = useMemo(() => {
		const startDate = parseISO(dates.startDate);
		const endDate = parseISO(dates.endDate);
		const markedDates: MarkedDates = {
			[startDate]: {
				selected: true,
				selectedColor: '$accent',
				startingDay: true,
				marked: true,
			},
			[endDate]: {
				selected: true,
				selectedColor: '$accent',
				endingDay: true,
				marked: true,
			},
		};

		if (startDate && endDate) {
			const days = eachDayOfInterval({
				start: startDate,
				end: endDate,
			});

			days.forEach((day, i) => {
				if (i === 0 || i === days.length - 1) {
					return;
				} else {
					markedDates[parseISO(day.toISOString())] = {
						marked: true,
					};
				}
			});
		}

		return markedDates;
	}, [dates]);

	const handleTabChange = (tab: ActiveTab) => {
		setActiveTab(tab);
	};

	const changeTabFlow = () => {
		if (tab === ActiveTab.WHEN) {
			setActiveTab(ActiveTab.RETURN);
		} else if (tab === ActiveTab.RETURN) {
			setActiveTab(ActiveTab.WHEN);
		}
	};

	const handleDayPress = ({ dateString: selectedDate }: DateData) => {
		if (tab === ActiveTab.WHEN) {
			setStartDate(selectedDate);
		}

		if (tab === ActiveTab.RETURN) {
			setEndDate(selectedDate);
		}
		changeTabFlow();
	};

	const handleDateClear = () => {
		clearDates();
		setActiveTab(ActiveTab.WHEN);
	};
	return (
		<View>
			<DateRangeTabs
				onChange={handleTabChange}
				startDate={dates.startDate}
				endDate={dates.endDate}
				activeTab={tab}
				onClear={handleDateClear}
			/>
			<CalendarList
				markedDates={marked}
				markingType='period'
				onDayPress={handleDayPress}
			/>
		</View>
	);
};
