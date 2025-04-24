import { Direction } from '@/common';
import { DateControl } from '@/components/DateSelector/DateControl';
import { DateValue } from '@/components/DateSelector/interfaces';
import { ToggleGroupItem } from '@/components/ToggleGroupItem';
import { Separator, ToggleGroup } from 'tamagui';

interface Props {
	fromVal?: DateValue;
	toVal?: DateValue;
	dir: Direction;
	onChange: (val: Direction) => void;
}
export const DateInputTabs = ({ fromVal, toVal, dir, onChange }: Props) => {
	console.log('render', 'ew');
	return (
		<ToggleGroup value={dir} type="single" backgroundColor="white" onValueChange={onChange}>
			<ToggleGroupItem
				active={dir === Direction.From}
				value={Direction.From}
				padding={0}
				height="max-content"
				overflow="hidden"
			>
				<DateControl value={fromVal} placeholder="Дата отправления" />
			</ToggleGroupItem>
			<Separator vertical />
			<ToggleGroupItem
				active={dir === Direction.To}
				value={Direction.To}
				padding={0}
				height="max-content"
				overflow="hidden"
			>
				<DateControl value={toVal} placeholder="Дата прибытия" />
			</ToggleGroupItem>
		</ToggleGroup>
	);
};
