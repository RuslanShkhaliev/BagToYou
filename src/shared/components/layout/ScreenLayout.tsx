import { useLayoutInsetsContext } from '@context/layout-insets.context';
import { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, YStack, YStackProps } from 'tamagui';

export interface ScreenLayoutProps {
	footer?: React.ReactNode;
	navbar?: React.ReactNode;
	withBottomSafeArea?: boolean;
}

export const ScreenLayout = ({
	children,
	footer,
	navbar,
	withBottomSafeArea = true,
	px = 12,
	...props
}: PropsWithChildren<ScreenLayoutProps> & YStackProps) => {
	const { tabBarHeight } = useLayoutInsetsContext();
	const insets = useSafeAreaInsets();

	const bottomOffset = withBottomSafeArea ? tabBarHeight : insets.bottom;

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
