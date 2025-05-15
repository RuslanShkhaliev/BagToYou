import { Separator, styled } from 'tamagui';

export const Divider = styled(Separator, {
	borderColor: '$graphite500',
	variants: {
		invalid: {
			true: {
				borderColor: '$error',
			},
		},
	} as const,
});
