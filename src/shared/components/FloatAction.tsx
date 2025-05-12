import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { View } from 'tamagui';

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
