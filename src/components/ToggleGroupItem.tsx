import { styled, ToggleGroup } from 'tamagui';

export const ToggleGroupItem = styled(ToggleGroup.Item, {
	color: '$white',
	backgroundColor: 'transparent',
	borderWidth: 0,
	borderColor: 'transparent',
	height: 32,
	variants: {
		active: {
			true: {
				backgroundColor: '$tabBgActive',
				color: '$tabText',
			},
		},
	},
});
