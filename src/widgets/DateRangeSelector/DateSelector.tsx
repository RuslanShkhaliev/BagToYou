import { ModalWrapper } from '@modals/ModalWrapper';
import { DateISOSchema, DateRangeSchema } from '@shared/schema';
import React, { useState } from 'react';
import { View } from 'tamagui';
import { CalendarRange } from './CalendarRange/CalendarRange';
import { CalendarSingle } from './CalendarSingle';
import { DateControl, DateControlProps } from './DateControl';
import { DateSelectorMode } from './enums';

interface DateRangeProps {
	date: DateRangeSchema;
	mode: DateSelectorMode.RANGE;
	onChange: (date: DateRangeSchema) => void;
}
interface DateSingleProps {
	date?: DateISOSchema;
	mode?: DateSelectorMode.SINGLE;
	onChange: (date: DateISOSchema) => void;
}

type DateSelectorProps = {
	controlStyles?: Partial<DateControlProps>;
} & (DateSingleProps | DateRangeProps);

export const DateRangeSelector = ({
	date,
	mode = DateSelectorMode.SINGLE,
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
				mode={mode}
				placeholder={'Select dates'}
				rounded={8}
				value={date}
				onPress={openModal}
				{...controlStyles}
			/>
			<ModalWrapper
				visible={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<View px={16}>
					{mode === DateSelectorMode.SINGLE && (
						<CalendarSingle
							date={date as DateISOSchema}
							onDaySelect={handleSingleSelect}
						/>
					)}
					{mode === DateSelectorMode.RANGE && (
						<CalendarRange
							initialDates={date as DateRangeSchema}
							onRangeSelect={handleRangeSelect}
						/>
					)}
				</View>
			</ModalWrapper>
		</View>
	);
};
