import { styled, Text } from 'tamagui';

export const TextThemed = styled(Text, {
	color: '$textPrimary',

	variants: {
		unselectable: {
			true: {
				userSelect: 'none',
				cursor: 'default',
			},
		},
	},
});
