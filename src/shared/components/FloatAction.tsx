import { YStack, YStackProps } from 'tamagui';

export const FloatAction = ({ children, ...props }: YStackProps) => {
	return (
		<YStack
			z={100}
			px={16}
			py={12}
			{...props}
		>
			{children}
		</YStack>
	);
};
