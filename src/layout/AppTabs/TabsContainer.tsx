import { BlurView } from 'expo-blur';
import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabsListProps, XStack, YStack } from 'tamagui';

export const TabsContainer = forwardRef<View, TabsListProps>(
	({ children, ...props }: TabsListProps, ref) => {
		const insets = useSafeAreaInsets();
		return (
			<YStack
				position={'absolute'}
				l={0}
				r={0}
				b={0}
			>
				<XStack
					ref={ref}
					px={12}
					py={4}
					pb={insets.bottom}
					bg={'transparent'}
					overflow={'hidden'}
					{...props}
				>
					<BlurView
						intensity={85}
						tint={'dark'}
						style={[StyleSheet.absoluteFill]}
					/>

					<XStack flex={1}>{children}</XStack>
				</XStack>
			</YStack>
		);
	},
);
