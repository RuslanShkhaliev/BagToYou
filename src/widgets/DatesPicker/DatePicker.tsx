import { ToggleGroupItem } from '@components/ToggleGroupItem';
import { ButtonStyled } from '@components/ui-kit';
import { BottomSheet } from '@modals/BottomSheet';
import React, { useMemo, useState } from 'react';
import { CalendarList } from 'react-native-calendars';
import {
	Button,
	Text,
	ToggleGroup,
	useTheme,
	View,
	XStack,
	YStack,
} from 'tamagui';
import { DateControl } from './DateControl';

interface DatesPickerProps {
	dates: string[];
}

export const DatePicker = ({ dates }: DatesPickerProps) => {
	const [sheetOpen, toggleOpen] = useState(false);
	const showSheet = () => {
		toggleOpen(true);
	};
	const [activeTab, setTab] = useState<'when' | 'return'>('return');
	const [selected, setSelected] = useState('');
	const theme = useTheme();
	const now = Date.now();

	const marked = useMemo(() => {
		return {
			[selected]: {
				selected: true,
				disableTouchEvent: true,
				selectedColor: '$blue800',
			},
		};
	}, [selected]);

	return (
		<View>
			<DateControl
				height={40}
				placeholder={'select dates'}
				rounded={8}
				onPress={showSheet}
			/>
			<BottomSheet
				open={sheetOpen}
				onOpenChange={toggleOpen}
				dismissOnSnapToBottom={true}
				unmountChildrenWhenHidden={true}
				scroll={false}
				header={
					<YStack>
						<ToggleGroup
							bg={'$inputBg'}
							type={'single'}
							value={activeTab}
							disableDeactivation
							onValueChange={(value) => setTab(value)}
						>
							<ToggleGroupItem
								active={activeTab === 'when'}
								value={'when'}
								flex={1}
							>
								<Text>Когда</Text>
							</ToggleGroupItem>
							<ToggleGroupItem
								active={activeTab === 'return'}
								value={'return'}
								flex={1}
							>
								<Text>Обратно</Text>
							</ToggleGroupItem>
						</ToggleGroup>
					</YStack>
				}
			>
				<CalendarList
					current={new Date().toString()}
					futureScrollRange={12}
					pastScrollRange={0}
					bounces={true}
					markedDates={marked}
					onDayPress={setSelected}
					dayComponent={({ date, marking, onPress }) => {
						const isStart = marking?.startingDay;
						const isEnd = marking?.endingDay;
						const isWithin = !isStart && !isEnd && marking?.color;

						return (
							<XStack
								flex={1}
								shrink={0}
								width={'100%'}
							>
								<Button
									cursor={'pointer'}
									rounded={8}
									width={'100%'}
									borderWidth={0}
									height={48}
									justify='center'
									items='center'
									onPress={() => {
										onPress(date?.dateString);
									}}
									bg={marking?.selectedColor || 'transparent'}
									pressStyle={{
										bg: '$tabBg',
									}}
								>
									<Text
										fontWeight={700}
										fontSize={15}
										color={'$textPrimary'}
									>
										{date?.day}
									</Text>
								</Button>
							</XStack>
						);
					}}
					theme={{
						textMonthFontSize: 17,
						textMonthFontWeight: '700',
						calendarBackground: 'transparent', // фон всей страницы календаря
						monthTextColor: theme.textPrimary.val,
						textSectionTitleColor: theme.textSecondary.val, // цвет заголовков дней недели (Пн, Вт, ...)
						dayTextColor: theme.textPrimary.val, // основной цвет текста дней
						selectedDayBackgroundColor: theme.outlineColor.val, // если ты будешь выделять
						selectedDayTextColor: theme.textPrimary.val,
						todayTextColor: theme.textPrimary.val,
						textDisabledColor: 'gray', // дни вне текущего месяца
						arrowColor: 'white', // стрелки переключения месяцев
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
					}}
					ListFooterComponent={() => (
						<ButtonStyled
							primary
							t={0}
							z={100}
							position={'absolute'}
						>
							Продолжить
						</ButtonStyled>
					)}
				/>
			</BottomSheet>
		</View>
	);
};
