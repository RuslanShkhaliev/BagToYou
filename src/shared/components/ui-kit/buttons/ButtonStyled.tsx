import { Button as TButton, GetProps, Spinner, styled } from 'tamagui';

export const StyledButton = styled(TButton, {
	name: 'Button',
	bg: '$btnBg',
	rounded: 8,
	color: '$btnText',
	fontSize: 16,
	variants: {
		loading: {
			true: {
				bg: '$bgCard',
			},
		},
		variant: {
			ghost: {
				color: '$textPrimary',
				bg: 'transparent',
				padding: 0,
				pressStyle: {
					opacity: 0.8,
				},
			},
			inverse: {
				bg: '$white',
				color: '$bg',
				borderWidth: 1,
				borderColor: '$btnAccentText',
				pressStyle: {
					color: '$bg',
					bg: '$white',
					opacity: 0.7,
				},
				hoverStyle: {
					bg: '$white8',
					color: '$textPrimary',
				},
			},
			outlined: {
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
			primary: {
				bg: '$btnAccentBg',
				color: '$btnAccentText',
				pressStyle: {
					bg: '$btnAccentBgPress',
				},
				hoverStyle: {
					bg: '$btnAccentBgHover',
				},
			},
			default: {
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
		variant: 'default',
	},
});
export type ButtonStyledProps = GetProps<typeof StyledButton>;

export const ButtonStyled = StyledButton.styleable((props, ref) => (
	<StyledButton
		{...props}
		disabled={props.loading || props.disabled}
		ref={ref}
	>
		{props.loading ? <Spinner size={'small'} /> : props.children}
	</StyledButton>
));
