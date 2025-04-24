import { styled, ToggleGroup } from 'tamagui';

export const ToggleGroupItem = styled(ToggleGroup.Item, {
	color: '$color10',
	variants: {
		active: {
			true: {
				backgroundColor: '#333',
				color: 'white',
			},
		},
	},
});
