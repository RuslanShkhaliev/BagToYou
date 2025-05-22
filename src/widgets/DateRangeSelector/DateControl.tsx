import { InputField, InputFieldProps } from '@components/ui-kit';
import { NBSP } from '@shared/unicodes';
import { Calendar } from '@tamagui/lucide-icons';
import { useMemo } from 'react';
import { DateISOSchema, DateRangeSchema } from 'src/shared/schemas';
import { View } from 'tamagui';
import { formatDate } from './utils';

export interface DateControlProps extends Omit<InputFieldProps, 'value'> {
	value?: DateISOSchema | DateRangeSchema | null;
	range?: boolean;
}

export const DateControl = ({
	value = '',
	range,
	...props
}: DateControlProps) => {
	const displayDate = useMemo(() => {
		if (range) {
			const { startDate, endDate } = (value as DateRangeSchema) || {};

			const labelStart = startDate ? formatDate(startDate) : '';
			const labelEnd = endDate ? formatDate(endDate) : '';

			if (labelStart && labelEnd) {
				return `${labelStart}${NBSP}—${NBSP}${labelEnd}`;
			}
			if (labelStart) {
				return labelStart;
			}
			if (labelEnd) {
				return labelEnd;
			}

			return '';
		}

		return formatDate(value as DateISOSchema) || '';
	}, [value, range]);
	return (
		<View position='relative'>
			<InputField
				borderWidth={0}
				value={displayDate}
				readOnly
				fontWeight={700}
				{...props}
			/>
			<View
				position='absolute'
				r={0}
				t={0}
				b={0}
				pr={16}
				height={'100%'}
				justify={'center'}
			>
				<Calendar color={'$accent'} />
			</View>
		</View>
	);
};
