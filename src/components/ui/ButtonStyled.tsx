import { Button as TButton, styled } from 'tamagui';

export const ButtonStyled = styled(TButton, {
	name: 'Button',
	bg: '$btnBg',
	rounded: 8,
	color: '$btnText',
	fontSize: 16,
	variants: {
		inverse: {
			true: {
				bg: '$white',
				color: '$bg',
				borderWidth: 1,
				borderColor: '$btnAccentText',
				pressStyle: {
					bg: '$white8',
					color: '$textPrimary',
				},
				hoverStyle: {
					bg: '$white8',
					color: '$textPrimary',
				},
			},
		},
		outlined: {
			true: {
				bg: '$bg',
				color: '$btnAccentText',
				borderWidth: 1,
				borderColor: '$white8',
				pressStyle: {
					bg: '$inputBg',
				},
				hoverStyle: {
					bg: '$inputBg',
				},
			},
		},
		primary: {
			true: {
				bg: '$btnAccentBg',
				color: '$btnAccentText',
				pressStyle: {
					bg: '$btnAccentBgPress',
				},
				hoverStyle: {
					bg: '$btnAccentBgHover',
				},
			},
		},
		default: {
			true: {
				bg: '$btnBg',
				color: '$btnText',
				pressStyle: {
					bg: '$btnBgPress',
				},
				hoverStyle: {
					bg: '$btnBgFocus',
				},
			},
		},
	} as const,
	defaultVariants: {
		default: true,
	},
});
