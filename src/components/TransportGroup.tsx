import { TransportType } from '@/common';
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
			padding="4px"
			gap="4px"
			value={String(value)}
			disableDeactivation
			onValueChange={handleChange}
		>
			{items.map((item) => (
				<ToggleGroup.Item
					height="28px"
					padding={0}
					flexGrow={1}
					alignItems="center"
					key={item.name}
					value={String(item.value)}
					backgroundColor={item.value === value && '#333'}
					color={item.value === value && '#fff'}
				>
					<Text>{item.name}</Text>
				</ToggleGroup.Item>
			))}
		</ToggleGroup>
	);
};
