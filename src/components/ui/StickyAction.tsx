import { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal, YStack, YStackProps } from 'tamagui';

interface StickyActionProps extends PropsWithChildren {
	/**
	 * @default true — использовать Portal
	 */
	portal?: boolean;
	/**
	 * @default true — добавить отступ по safe area bottom
	 */
	withSafeArea?: boolean;
	/**
	 * @default $bg — фон контейнера
	 */
	background?: YStackProps['bg'];
}

export const StickyAction = ({
	children,
	portal = true,
	withSafeArea = true,
	background = '$bg',
}: StickyActionProps) => {
	const insets = useSafeAreaInsets();

	const Content = (
		<YStack
			position='absolute'
			b={0}
			l={0}
			r={0}
			z={100}
			pt={12}
			px={16}
			pb={withSafeArea ? insets.bottom + 12 : 12}
			bg={background}
			borderTopWidth={1}
			borderColor='$borderColor'
		>
			{children}
		</YStack>
	);

	return portal ? <Portal>{Content}</Portal> : Content;
};
