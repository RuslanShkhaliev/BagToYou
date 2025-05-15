import { View, ViewProps } from 'tamagui';

export const FloatAction = ({ children, ...props }: ViewProps) => {
	return (
		<View
			p={12}
			{...props}
		>
			{children}
		</View>
	);
};
