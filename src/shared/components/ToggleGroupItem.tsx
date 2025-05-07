import { styled, ToggleGroup } from 'tamagui';

export const ToggleGroupItem = styled(ToggleGroup.Item, {
	color: '$textSecondary',
	bg: '$inputBg',
	borderColor: 'transparent',
	borderWidth: 2,
	focusStyle: {
		borderColor: '$orange500',
	},
	height: 32,
	variants: {
		active: {
			true: {
				borderColor: '$orange500',
			},
		},
	} as const,
});
