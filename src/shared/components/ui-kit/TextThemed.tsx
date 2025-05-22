import { styled, Text } from 'tamagui';

export const TextThemed = styled(Text, {
	color: '$textPrimary',

	variants: {
		truncate: {
			true: {
				numberOfLines: 1,
				ellipse: true,
				ellipsizeMode: 'tail',
			},
		},
		unselectable: {
			true: {
				userSelect: 'none',
				cursor: 'default',
			},
		},
	} as const,
});
