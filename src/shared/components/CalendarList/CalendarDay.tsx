import { DateData } from 'react-native-calendars';

import { ButtonStyled, TextThemed } from '@components/ui-kit';
import { memo } from 'react';
import { MarkedDates } from 'react-native-calendars/src/types';
import { XStack } from 'tamagui';

interface CalendarDayProps {
	date: DateData;
	marking: MarkedDates;
	disabled: boolean;
	onPress: (date: DateData) => void;
}

export const CalendarDay = memo(
	({ date, marking, disabled, onPress }: CalendarDayProps) => {
		const isStart = marking?.startingDay;
		const isEnd = marking?.endingDay;
		const isWithin = !isStart && !isEnd && marking?.color;
		return (
			<XStack
				flex={1}
				shrink={0}
				width={'100%'}
			>
				<ButtonStyled
					cursor={'pointer'}
					rounded={8}
					width={'100%'}
					borderWidth={0}
					height={48}
					disabled={disabled}
					justify='center'
					items='center'
					noTextWrap
					onPress={() => {
						onPress(date);
					}}
					bg={marking?.selectedColor || 'transparent'}
					pressStyle={{
						bg: '$tabBg',
					}}
					disabledStyle={{
						bg: '$graphite600',
					}}
				>
					<TextThemed
						fontWeight={700}
						fontSize={13}
						whiteSpace='nowrap'
						color={disabled ? '$textDisabled' : '$textPrimary'}
					>
						{date?.day}
					</TextThemed>
				</ButtonStyled>
			</XStack>
		);
	},
);
