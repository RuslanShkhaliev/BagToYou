import { CalendarList } from '@components/CalendarList/CalendarList';
import { DateRangeSchema } from '@shared/schema';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DateData } from 'react-native-calendars';
import { View } from 'tamagui';
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
		onRangeSelect(dates);
	}, [dates]);

	const marked = useMemo(() => {
		return {
			[dates.startDate]: {
				selected: true,
				selectedColor: '$accent',
				startingDay: true,
				endingDay: true,
			},
			[dates.endDate]: {
				selected: true,
				selectedColor: '$accent',
				startingDay: true,
				endingDay: true,
			},
		};
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
