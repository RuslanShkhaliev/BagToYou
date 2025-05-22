import { ButtonStyled, ButtonStyledProps } from '@components/ui-kit';
import { View, ViewProps } from 'tamagui';

interface FloatActionProps extends ButtonStyledProps {
	containerProps?: ViewProps;
}

export const FloatAction = ({
	children,
	containerProps,
	...props
}: FloatActionProps) => {
	return (
		<View
			p={12}
			{...containerProps}
		>
			<ButtonStyled {...props}>{children}</ButtonStyled>
		</View>
	);
};
