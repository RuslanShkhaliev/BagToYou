import { forwardRef, useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView, ScrollViewProps } from 'tamagui';

interface ScreenWrapperProps extends ScrollViewProps {
	onRefresh?: () => Promise<void> | void;
}

export const ScreenScroll = forwardRef<ScrollView, ScreenWrapperProps>(
	({ onRefresh, children, ...props }: ScreenWrapperProps, ref) => {
		const [refreshing, setRefreshing] = useState(false);
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
			<ScrollView
				ref={ref}
				flex={1}
				refreshControl={
					onRefresh ? (
						<RefreshControl
							refreshing={refreshing}
							onRefresh={handleRefresh}
							tintColor='$white'
						/>
					) : undefined
				}
				bg={'$bg'}
				automaticallyAdjustKeyboardInsets
				{...props}
			>
				{children}
			</ScrollView>
		);
	},
);
