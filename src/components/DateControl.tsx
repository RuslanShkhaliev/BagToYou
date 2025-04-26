import { DateValue } from '@/components/interfaces';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Input, InputProps, styled } from 'tamagui';

export const InputStyled = styled(Input, {
	cursor: 'pointer',
	fontWeight: 600,
	fontSize: 12,
	unstyled: true,
	readOnly: true,
	paddingVertical: 16,
	paddingLeft: 36,
	paddingRight: 12,
	backgroundColor: '$inputBg',
	color: '$textPrimary',
	outline: 'none',
	outlineStyle: 'none',
});

interface Props extends Omit<InputProps, 'value'> {
	value: DateValue | undefined;
}
export const DateControl = ({ value, ...props }: Props) => {
	const val = useMemo(() => {
		if (!value) return '';

		return format(new Date(value), 'dd MMM');
	}, [value]);
	return <InputStyled value={val} readOnly {...props} />;
};
