import { useKeyboard } from '@/hooks/useKeyboard';
import { forwardRef, useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, ScrollViewProps, View } from 'tamagui';

interface ScreenWrapperProps extends ScrollViewProps {
	onRefresh?: () => Promise<void> | void;
}

export const ScreenScroll = forwardRef<ScrollView, ScreenWrapperProps>(
	({ onRefresh, children, pt = 20, ...props }: ScreenWrapperProps, ref) => {
		const [refreshing, setRefreshing] = useState(false);
		const insets = useSafeAreaInsets();
		const { keyboardHeight } = useKeyboard();
		const handleRefresh = useCallback(async () => {
			if (!onRefresh) {
				return;
			}
			setRefreshing(true);
			try {
				await onRefresh();
			} finally {
				setRefreshing(false);
			}
		}, [onRefresh]);
		return (
			<View flex={1}>
				<ScrollView
					ref={ref}
					refreshControl={
						onRefresh ? (
							<RefreshControl
								refreshing={refreshing}
								onRefresh={handleRefresh}
								tintColor='$white'
							/>
						) : undefined
					}
					pb={keyboardHeight}
					pl={12 + insets.left}
					pr={12 + insets.right}
					pt={Number(pt) + insets.top}
					flex={1}
					bg={'$bg'}
					{...props}
				>
					{children}
				</ScrollView>
			</View>
		);
	},
);
