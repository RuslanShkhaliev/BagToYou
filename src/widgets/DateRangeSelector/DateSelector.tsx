import { TextThemed } from '@components/ui-kit';
import { ModalWrapper } from '@modals/ModalWrapper';
import { DateISOSchema, DateRangeSchema } from '@shared/schema';
import React, { useState } from 'react';
import { View } from 'tamagui';
import { CalendarRange } from './CalendarRange/CalendarRange';
import { CalendarSingle } from './CalendarSingle';
import { DateControl, DateControlProps } from './DateControl';

interface DateRangeProps {
	date: DateRangeSchema;
	range?: true;
	onChange: (date: DateRangeSchema) => void;
}
interface DateSingleProps {
	date?: DateISOSchema;
	range?: false;
	onChange: (date: DateISOSchema) => void;
}

type DateSelectorProps = {
	controlStyles?: Partial<DateControlProps>;
} & (DateSingleProps | DateRangeProps);

export const DateRangeSelector = ({
	date,
	range = false,
	onChange,
	controlStyles,
}: DateSelectorProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => {
		setIsOpen(false);
	};

	const handleRangeSelect = (date: DateRangeSchema) => {
		onChange(date);
		if (Object.values(date).every((value) => value !== '')) {
			closeModal();
		}
	};

	const handleSingleSelect = (date: DateISOSchema) => {
		onChange(date);
		closeModal();
	};

	return (
		<View>
			<DateControl
				height={44}
				range={range}
				placeholder={'Select dates'}
				rounded={8}
				value={date}
				onPress={openModal}
				{...controlStyles}
			/>
			<ModalWrapper
				visible={isOpen}
				title={
					<TextThemed
						fontSize={20}
						fontWeight={600}
					>
						Календарь
					</TextThemed>
				}
				onClose={() => setIsOpen(false)}
			>
				<View
					px={16}
					flex={1}
					pb={100}
				>
					{range ? (
						<CalendarRange
							initialDates={date as DateRangeSchema}
							onRangeSelect={handleRangeSelect}
						/>
					) : (
						<CalendarSingle
							date={date as DateISOSchema}
							onDaySelect={handleSingleSelect}
						/>
					)}
				</View>
			</ModalWrapper>
		</View>
	);
};
