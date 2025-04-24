import { DateControl } from '@/components/DateSelector/DateControl';
import { DateValue } from '@/components/DateSelector/interfaces';
import { Separator, XGroup } from 'tamagui';

interface Props {
	onFromPress: () => void;
	onToPress: () => void;
	fromVal: DateValue;
	toVal: DateValue;
	range?: boolean;
}
export const DateInputGroup = ({ onFromPress, onToPress, fromVal, toVal, range = true }: Props) => {
	return (
		<XGroup backgroundColor="white" width="max-content">
			<XGroup.Item forcePlacement="first">
				<DateControl onPress={onFromPress} value={fromVal} placeholder="Выбрать дату" />
			</XGroup.Item>
			{range && (
				<>
					<Separator vertical />
					<XGroup.Item forcePlacement="last">
						<DateControl onPress={onToPress} value={toVal} placeholder="Выбрать дату" />
					</XGroup.Item>
				</>
			)}
		</XGroup>
	);
};
