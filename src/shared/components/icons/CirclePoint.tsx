import { View, ViewProps } from 'tamagui';

export const CirclePoint = (props?: ViewProps) => {
	return (
		<View
			height={16}
			width={16}
			borderColor={'$graphite300'}
			borderWidth={4}
			rounded={'$12'}
			{...props}
		/>
	);
};
