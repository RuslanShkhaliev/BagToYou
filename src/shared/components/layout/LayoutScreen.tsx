import { useLayoutInsetsContext } from '@context/layout-insets.context';
import { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, YStack, YStackProps } from 'tamagui';

export interface LayoutScreenProps {
	footer?: React.ReactNode;
	navbar?: React.ReactNode;
	withBottomSafeArea?: boolean;
	tabBarSafeArea?: boolean;
}

export const LayoutScreen = ({
	children,
	footer,
	navbar,
	withBottomSafeArea = true,
	px = 12,
	tabBarSafeArea = false,
	...props
}: PropsWithChildren<LayoutScreenProps> & YStackProps) => {
	const insets = useSafeAreaInsets();
	const { tabBarHeight } = useLayoutInsetsContext();

	const bottomOffset = tabBarSafeArea ? tabBarHeight : insets.bottom;

	return (
		<View
			flex={1}
			bg={'$bg'}
		>
			{navbar}
			<YStack
				flex={1}
				px={px}
				{...props}
			>
				{children}
			</YStack>

			{footer}
			{withBottomSafeArea && (
				<View
					bg={'transparent'}
					height={bottomOffset}
				/>
			)}
		</View>
	);
};
