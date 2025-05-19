import { DateData } from 'react-native-calendars';

import { ButtonStyled, TextThemed } from '@components/ui-kit';
import { isBefore } from 'date-fns';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View, XStack } from 'tamagui';

interface CalendarDayProps {
	date: DateData;
	selected?: boolean;
	marked?: boolean;
	startingDay?: boolean;
	endingDay?: boolean;
	onPress: (date: DateData) => void;
}

export const CalendarDay = memo(
	({
		date,
		selected,
		marked,
		startingDay,
		endingDay,
		onPress,
	}: CalendarDayProps) => {
		const isDisabled = isBefore(date.dateString, new Date());
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
					disabled={isDisabled}
					justify='center'
					items='center'
					noTextWrap
					onPress={() => {
						onPress(date);
					}}
					bg={selected ? '$accent' : 'transparent'}
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
						color={isDisabled ? '$textDisabled' : '$textPrimary'}
					>
						{date?.day}
					</TextThemed>
				</ButtonStyled>
				{marked && (
					<View
						style={StyleSheet.absoluteFill}
						bg={'$white4'}
						borderTopLeftRadius={startingDay ? 8 : 0}
						borderBottomLeftRadius={startingDay ? 8 : 0}
						borderTopRightRadius={endingDay ? 8 : 0}
						borderBottomRightRadius={endingDay ? 8 : 0}
					/>
				)}
			</XStack>
		);
	},
);
