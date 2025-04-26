import { TransportType } from '@/common';
import { ToggleGroupItem } from '@/components/ToggleGroupItem';
import { Text, ToggleGroup } from 'tamagui';

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
];

export const TransportGroup = ({ value, onChange }: Props) => {
	const handleChange = (val: string) => {
		onChange?.(Number(val) as TransportType);
	};
	return (
		<ToggleGroup
			justifyContent="space-between"
			type="single"
			value={String(value)}
			disableDeactivation
			onValueChange={handleChange}
			backgroundColor="$bgContent"
		>
			{items.map((item) => (
				<ToggleGroupItem
					flexGrow={1}
					alignItems="center"
					key={item.name}
					padding="2px"
					backgroundColor="$tabBg"
					active={item.value === value}
					value={String(item.value)}
				>
					<Text>{item.name}</Text>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};
