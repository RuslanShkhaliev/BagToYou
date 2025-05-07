import { Portal } from '@shared/constants/constants';
import { PropsWithChildren } from 'react';
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
	px: 16,
});

export const StickyAction = ({
	children,
	bg = '$bg',
	...props
}: StickyActionProps & YStackProps) => {
	return (
		<StyledContainer
			z={100}
			bg={bg}
			animation={'200ms'}
			animatePresence
			{...props}
		>
			{children}
		</StyledContainer>
	);
};
