import { useLayoutInsets } from '@/context/layout-insets.context';
import { AppHeader } from '@/layout/AppHeader';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewProps } from 'tamagui';

interface ScreenViewProps extends ViewProps {
	hideHeader?: boolean;
	scrollable?: boolean;
}

export const ScreenView = ({
	hideHeader = false,
	pt = 0,
	children,
	...props
}: ScreenViewProps) => {
	const insets = useSafeAreaInsets();
	const { bottomOffset } = useLayoutInsets();
	return (
		<View
			bg={'$bg'}
			pt={Number(pt) + insets.top}
			flex={1}
			pb={bottomOffset}
			{...props}
		>
			{!hideHeader && <AppHeader />}

			<View
				px={12}
				flex={1}
			>
				{children}
			</View>
		</View>
	);
};
