import { Direction } from '@/common';
import { DateValue } from '@/common/interface';
import { ToggleGroupItem } from '@/components/ToggleGroupItem';
import { Divider } from '@/components/ui/Divider';
import { DateControl } from '@/widgets/DatesPicker/DateControl';
import { ToggleGroup } from 'tamagui';


interface Props {
	fromVal?: DateValue;
	toVal?: DateValue;
	dir: Direction;
	onChange: (val: Direction) => void;
}


export const DateInputTabs = ({ fromVal, toVal, dir, onChange }: Props) => {
	console.log('render', 'ew');
	return (
		<ToggleGroup
			value={dir}
			type="single"
			bg="$white"
			onValueChange={onChange}
		>
			<ToggleGroupItem
				active={dir === Direction.From}
				value={Direction.From}
				p={0}
				height="max-content"
				overflow="hidden"
			>
				<DateControl
					value={fromVal}
					placeholder="Дата отправления"
				/>
			</ToggleGroupItem>
			<Divider vertical />
			<ToggleGroupItem
				active={dir === Direction.To}
				value={Direction.To}
				p={0}
				height="max-content"
				overflow="hidden"
			>
				<DateControl
					value={toVal}
					placeholder="Дата прибытия"
				/>
			</ToggleGroupItem>
		</ToggleGroup>
	);
};
