import { addYears, eachMonthOfInterval, format, getDay, getDaysInMonth } from 'date-fns';
import React from 'react';
import { Text, XStack, YStack } from 'tamagui';

export const CustomCalendar = () => {
	const buildCalendarMatrix = (date: Date) => {
		const daysInMonth = getDaysInMonth(date);
		const firstDayIndex = (getDay(date) + 6) % 7;

		const matrix: (number | null)[][] = [];
		let week: (number | null)[] = [];

		for (let i = 0; i < firstDayIndex; i++) {
			week.push(null);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			week.push(day);
			if (week.length === 7) {
				matrix.push(week);
				week = [];
			}
		}

		if (week.length > 0) {
			while (week.length < 7) {
				week.push(null);
			}
		}

		if (matrix.length < 6) {
			while (week.length < 7) {
				week.push(null);
			}
			matrix.push(week);
		}

		return matrix;
	};

	const now = Date.now();
	const dates = eachMonthOfInterval({
		start: now,
		end: addYears(now, 1),
	}).map((monthDate) => ({
		month: format(monthDate, 'MMM'),
		weeks: buildCalendarMatrix(monthDate),
	}));
	return (
		<YStack bg={'$graphite700'}>
			{dates.map((date, key) => (
				<YStack
					px={12}
					py={16}
					key={key}
					mb={20}
					rounded={16}
					bg={'$graphite500'}
				>
					<XStack
						pt={7}
						pb={19}
						pl={12}
					>
						<Text
							textTransform={'capitalize'}
							color={'$textPrimary'}
							verticalAlign={'top'}
							fontWeight={700}
							fontSize={17}
							lineHeight={22}
							height={22}
						>{date.month}</Text>
					</XStack>
					<XStack>
						<XStack
							flex={1}
							justify={'space-between'}
							height={14}
							items={'center'}
							mb={16}
						>
							{['Пн', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((day) => (
								<XStack
									key={day}
									flex={1}
									justify={'center'}
								>
									<Text
										fontWeight={600}
										lineHeight={11}
										fontSize={11}
										text={'center'}
										textTransform={'uppercase'}
										color={
											['ВС', 'СБ'].includes(day) ? '$textPrimary' : '$textSecondary'
										}

									>{day.toUpperCase()}</Text>
								</XStack>
							))}
						</XStack>
					</XStack>
					<YStack>
						{date.weeks.map((week, index) => (
							<XStack key={index}>
								{week.map((day, index) => (
									<XStack
										key={index}
										minH={48}
										width={20}
										flex={1}
										justify={'center'}
										pt={2}
									>
										<Text
											color={'$textPrimary'}
											fontSize={15}
											lineHeight={19}
											fontWeight={400}
										>
											{day}
										</Text>
									</XStack>
								))}
							</XStack>
						))}
					</YStack>
				</YStack>
			))}
		</YStack>
	);
};
