import { TransportType } from '@/common';
import { IconProps } from '@tamagui/helpers-icon';
import { Bike, Bus, Car, Plane, Ship, TrainFront } from '@tamagui/lucide-icons';
import React from 'react';

const icons = {
	[TransportType.Plane]: Plane,
	[TransportType.Bike]: Bike,
	[TransportType.Car]: Car,
	[TransportType.Ship]: Ship,
	[TransportType.Train]: TrainFront,
	[TransportType.Bus]: Bus,
};

interface Props extends IconProps {
	type: TransportType;
}
export const IconTransport = ({ type, size = 16, ...props }: Props) => {
	const Icon = icons[type];

	return <Icon {...props} width={size} height={size} />;
};
