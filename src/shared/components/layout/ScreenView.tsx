import { useLayoutInsetsContext } from '@context/layout-insets.context';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewProps, YStack } from 'tamagui';

interface ScreenViewProps extends ViewProps {
	isModal?: boolean;
	withBottomSafeArea?: boolean;
}

export const ScreenView = ({
	isModal = false,
	withBottomSafeArea = true,
	children,
	...props
}: ScreenViewProps) => {
	const insets = useSafeAreaInsets();
	const { tabBarHeight } = useLayoutInsetsContext();

	const bottomOffset = isModal ? insets.bottom : tabBarHeight;
	return (
		<YStack
			bg={'$bg'}
			flex={1}
			{...props}
		>
			{!isModal && (
				<View
					height={insets.top}
					bg={'transparent'}
				/>
			)}
			{children}
			{withBottomSafeArea && (
				<View
					height={bottomOffset}
					bg={'transparent'}
				/>
			)}
		</YStack>
	);
};
