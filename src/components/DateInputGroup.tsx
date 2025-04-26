import { DateControl } from '@/components/DateControl';
import { DateValue } from '@/components/interfaces';
import { Divider } from '@/components/ui/Divider';
import { XGroup } from 'tamagui';

interface Props {
	onFromPress: () => void;
	onToPress: () => void;
	fromVal: DateValue;
	toVal: DateValue;
	range?: boolean;
}
export const DateInputGroup = ({ onFromPress, onToPress, fromVal, toVal, range = true }: Props) => {
	return (
		<XGroup backgroundColor="none" width="max-content">
			<XGroup.Item forcePlacement="center">
				<DateControl onPress={onFromPress} value={fromVal} placeholder="Выбрать дату" />
			</XGroup.Item>
			{range && (
				<>
					<Divider vertical borderColor="$graphite400" />
					<XGroup.Item forcePlacement="last">
						<DateControl onPress={onToPress} value={toVal} placeholder="Выбрать дату" />
					</XGroup.Item>
				</>
			)}
		</XGroup>
	);
};
