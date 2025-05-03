import { BlurView } from 'expo-blur';
import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabsListProps, XStack } from 'tamagui';

export const TabsContainer = forwardRef<View, TabsListProps>(
	({ children, ...props }: TabsListProps, ref) => {
		const insets = useSafeAreaInsets();

		return (
			<XStack
				ref={ref}
				position={'absolute'}
				l={0}
				r={0}
				px={12}
				pt={4}
				height={60 + insets.bottom}
				pb={insets.bottom}
				b={0}
				bg={'transparent'}
				overflow={'hidden'}
				{...props}
			>
				<BlurView
					intensity={100}
					tint={'dark'}
					style={[StyleSheet.absoluteFill]}
				/>
				<XStack flex={1}>{children}</XStack>
			</XStack>
		);
	},
);
