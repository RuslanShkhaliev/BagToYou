import { IconProps } from '@tamagui/helpers-icon';
import { Bike, Bus, Car, Plane, Ship, TrainFront } from '@tamagui/lucide-icons';
import React from 'react';
import { TransportType } from 'src/shared';

const icons = {
	[TransportType.Plane]: Plane,
	[TransportType.Bike]: Bike,
	[TransportType.Car]: Car,
	[TransportType.Ship]: Ship,
	[TransportType.Train]: TrainFront,
	[TransportType.Bus]: Bus,
};

interface IconTransportProps extends IconProps {
	type: TransportType;
}

export const IconTransport = ({
	type,
	size = 14,
	...props
}: IconTransportProps) => {
	const Icon = icons[type];

	return (
		<Icon
			size={size}
			{...props}
		/>
	);
};
