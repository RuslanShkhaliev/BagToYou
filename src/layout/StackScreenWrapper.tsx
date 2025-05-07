import React from 'react';
import { useTheme, View } from 'tamagui';

interface StackScreenWrapperProps {
	routeName: string;
	title: string;
	children: React.ReactNode;
	headerShown?: boolean;
	onChangeText?: (e: string) => void;
}

export function StackScreenWrapper({
	routeName,
	children,
	title,
	headerShown = false,
}: StackScreenWrapperProps) {
	const theme = useTheme();

	const onChangeText = (e: string) => {
		console.log(e);
	};
	const isHeaderShown = headerShown || !!title;
	return (
		<View
			bg={'$bg'}
			flex={1}
		>
			{children}
		</View>
	);
}
