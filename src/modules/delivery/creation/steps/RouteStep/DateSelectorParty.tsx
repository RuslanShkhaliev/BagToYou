import { Heading } from 'tamagui';

import { ErrorMessage } from '@components/ui-kit/ErrorMessage';
import { DateRangeSchema } from '@shared/schema';
import { DateRangeSelector } from '@widgets/DateRangeSelector/DateSelector';
import { View } from 'tamagui';

interface DatePartyProps {
	date: DateRangeSchema;
	onChange: (date: DateRangeSchema) => void;
	error?: string;
}
export const DateSelectorParty = ({
	date,
	onChange,
	error,
}: DatePartyProps) => {
	return (
		<View>
			<Heading
				color={'$textPrimary'}
				fontSize={18}
			>
				Выберите даты поездки
			</Heading>
			<View gap={6}>
				<DateRangeSelector
					range
					date={date}
					onChange={onChange}
				/>
				<ErrorMessage message={error} />
			</View>
		</View>
	);
};
