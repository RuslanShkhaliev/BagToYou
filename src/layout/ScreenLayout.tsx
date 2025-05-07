import { useLayoutInsetsContext } from '@context/layout-insets.context';
import { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewProps, XStack, YStack } from 'tamagui';

export interface ScreenLayoutProps {
	header?: React.ReactNode;
	hideHeader?: boolean;
	title?: React.ReactNode;
	navBar?: React.ReactNode;
	left?: React.ReactNode;
	right?: React.ReactNode;
	stickyAction?: React.ReactNode;
	fullscreen?: boolean;
	withBack?: boolean;
	closable?: boolean;
	onClose?: () => void;
	onBack?: () => void;
	modal?: boolean;
	bodyProps?: ViewProps;
	containerProps?: ViewProps;
	withoutTabBarOffset?: boolean;
}

export const ScreenLayout = ({
	header,
	hideHeader = false,
	title,
	children,
	onBack,
	onClose,
	navBar,
	left,
	right,
	stickyAction,
	modal = false,
	containerProps,
	bodyProps,
	withoutTabBarOffset = false,
}: PropsWithChildren<ScreenLayoutProps>) => {
	const { tabBarHeight } = useLayoutInsetsContext();
	const insets = useSafeAreaInsets();

	const showHeader = !hideHeader && !modal;

	const { setStickyHeight } = useLayoutInsetsContext();

	const bottomOffset =
		modal || withoutTabBarOffset ? insets.bottom : tabBarHeight;

	return (
		<View
			flex={1}
			bg={'$bg'}
			pt={modal ? 12 : 0}
			{...containerProps}
		>
			{/* {!modal && <XStack height={insets.top} />} */}
			{/*  }
			{showHeader && (header ?? <AppHeader />)}
			<Navbar
				onClose={onClose}
				onBack={onBack}
				title={title}
				left={left}
				right={right}
			>
				{navBar}
			</Navbar> */}

			<View
				flex={1}
				px={12}
				{...bodyProps}
			>
				{children}
			</View>

			{stickyAction && (
				<YStack
					p={12}
					onLayout={(e) => {
						setStickyHeight(e.nativeEvent.layout.height);
					}}
				>
					{stickyAction}
				</YStack>
			)}
			<XStack height={bottomOffset} />
		</View>
	);
};
