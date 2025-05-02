import { DateValue } from '@/common/interface';
import { InputField, InputFieldProps } from '@/components/ui/Inputs';
import { format } from 'date-fns';
import { useMemo } from 'react';

interface Props extends Omit<InputFieldProps, 'value'> {
	value?: DateValue | undefined;
}

export const DateControl = ({ value = '', ...props }: Props) => {
	const val = useMemo(() => {
		if (!value) {
			return '';
		}

		return format(new Date(value), 'dd MMM');
	}, [value]);
	return (
		<InputField
			borderWidth={0}
			value={val}
			readOnly
			{...props}
		/>
	);
};
