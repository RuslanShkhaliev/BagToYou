import { IconBoxS, IconL, IconM, IconXL, IconXS } from '@components/icons';
import { PresetItemProps } from './PresetItem';

export const presets: PresetItemProps[] = [
	{
		icon: <IconXS />,
		size: 'XS',
		parcel: {
			width: '17',
			height: '12',
			length: '9',
			weight: '0.5',
		},
	},
	{
		icon: <IconBoxS />,
		size: 'S',
		parcel: {
			width: '23',
			height: '19',
			length: '10',
			weight: '2',
		},
	},
	{
		icon: <IconM />,
		size: 'M',
		parcel: {
			width: '33',
			height: '25',
			length: '15',
			weight: '5',
		},
	},
	{
		icon: <IconL />,
		size: 'L',
		parcel: {
			width: '31',
			height: '25',
			length: '38',
			weight: '12',
		},
	},
	{
		icon: <IconXL />,
		size: 'XL',
		parcel: {
			width: '60',
			height: '35',
			length: '30',
			weight: '18',
		},
	},
];
