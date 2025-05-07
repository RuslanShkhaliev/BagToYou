import { useLayoutInsetsContext } from '@context/layout-insets.context';
import { Portal } from '@shared/constants/constants';
import { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled, YStack, YStackProps } from 'tamagui';

interface StickyActionProps extends PropsWithChildren {
	/**
	 * @default true — использовать Portal
	 */
	position?: 'screen' | 'tabbar';
	portalName?: Portal;
	/**
	 * @default true — добавить отступ по safe area bottom
	 */
	withSafeArea?: boolean;
	fixedToBottom?: boolean;
	/**
	 * @default $bg — фон контейнера
	 */
	bg?: YStackProps['bg'];
}

const StyledContainer = styled(YStack, {
	b: 0,
	l: 0,
	r: 0,
	px: 16,
	py: 12,
});

export const StickyAction = ({
	children,
	fixedToBottom = false,
	bg = '$bg',
	...props
}: StickyActionProps & YStackProps) => {
	const insets = useSafeAreaInsets();
	const { setStickyHeight } = useLayoutInsetsContext();

	let offset = 0;

	if (fixedToBottom) {
		offset += insets.bottom;
	}

	return (
		<StyledContainer
			z={100}
			bg={bg}
			b={offset}
			animation={'200ms'}
			animatePresence
			{...props}
			onLayout={(e) => {
				console.log(e.nativeEvent.layout.height);
				setStickyHeight(e.nativeEvent.layout.height);
			}}
		>
			{children}
		</StyledContainer>
	);
};
