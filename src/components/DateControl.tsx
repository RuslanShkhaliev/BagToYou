import { DateValue } from '@/components/interfaces';
import { InputThemed } from '@/components/ui/InputThemed';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { InputProps } from 'tamagui';

interface Props extends Omit<InputProps, 'value'> {
	value: DateValue | undefined;
}
export const DateControl = ({ value, ...props }: Props) => {
	const val = useMemo(() => {
		if (!value) return '';

		return format(new Date(value), 'dd MMM');
	}, [value]);
	return (
		<InputThemed
			paddingVertical={16}
			paddingLeft={36}
			paddingRight={12}
			fontWeight={600}
			fontSize={12}
			value={val}
			readOnly
			{...props}
		/>
	);
};
