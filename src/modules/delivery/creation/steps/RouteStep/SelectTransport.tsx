import {
	SelectOption,
	SelectWithBottomSheet,
} from '@shared/components/ui-kit/selects';
import { TransportType } from '@shared/enums';
import { Bike, Bus, Car, Plane, Ship, TrainFront } from '@tamagui/lucide-icons';

interface SelectTransportProps {
	selected: TransportType;
	onSelect: (value: TransportType) => void;
}

const transports: Record<TransportType, SelectOption<TransportType>> = {
	[TransportType.Car]: {
		label: 'Car',
		value: TransportType.Car,
		Icon: Car,
	},
	[TransportType.Plane]: {
		label: 'Plane',
		value: TransportType.Plane,
		Icon: Plane,
	},
	[TransportType.Bike]: {
		label: 'Bike',
		value: TransportType.Bike,
		Icon: Bike,
	},
	[TransportType.Ship]: {
		label: 'Ship',
		value: TransportType.Ship,
		Icon: Ship,
	},
	[TransportType.Train]: {
		label: 'Train',
		value: TransportType.Train,
		Icon: TrainFront,
	},
	[TransportType.Bus]: {
		label: 'Bus',
		value: TransportType.Bus,
		Icon: Bus,
	},
};

export const SelectTransport = ({
	selected,
	onSelect,
}: SelectTransportProps) => {
	return (
		<SelectWithBottomSheet
			options={Object.values(transports)}
			value={selected}
			onChange={onSelect}
			label='Тип транспорта'
			placeholder='Выберите тип транспорта'
		/>
	);
};
