import { TransportType } from '@/common';
import { IconTransport } from '@/components/icons';
import { ToggleGroupItem } from '@/components/ToggleGroupItem';
import { ToggleGroup } from 'tamagui';


interface Props {
	value?: TransportType;
	onChange?: (val: TransportType) => void;
}


const items = [
	{
		name: 'авиа',
		value: TransportType.Plane,
	},
	{
		name: 'авто',
		value: TransportType.Car,
	},
	{
		name: 'байк',
		value: TransportType.Bike,
	},
	{
		name: 'корабль',
		value: TransportType.Ship,
	},
	{
		name: 'корабль',
		value: TransportType.Bus,
	},
	{
		name: 'корабль',
		value: TransportType.Train,
	},
];

export const TransportGroup = ({ value, onChange }: Props) => {
	const handleChange = (val: string) => {
		onChange?.(Number(val) as TransportType);
	};
	return (
		<ToggleGroup
			justify="space-between"
			type="single"
			value={String(value)}
			disableDeactivation
			onValueChange={handleChange}
			bg="$tabBg"
		>
			{items.map((item) => (
				<ToggleGroupItem
					grow={1}
					items="center"
					key={item.value}
					p={2}
					active={item.value === value}
					value={String(item.value)}
				>
					<IconTransport type={item.value} />
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};
