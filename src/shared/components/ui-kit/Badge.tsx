import { ColorTokens } from '@tamagui/core';
import React from 'react';
import { Text, TextProps, XStack, XStackProps } from 'tamagui';

interface BadgeProps {
	children?: React.ReactNode;
	color?: ColorTokens;
	bg?: ColorTokens;
	containerProps?: XStackProps;
	textProps?: TextProps;
}

export const Badge = ({
	bg = '$tabBgActive',
	color = '$tabTextActive',
	textProps,
	containerProps,
	children,
}: BadgeProps) => {
	return (
		<XStack
			bg={bg}
			rounded={4}
			items={'center'}
			px={6}
			{...containerProps}
		>
			<Text
				fontSize={8}
				color={color}
				numberOfLines={1}
				{...textProps}
			>
				{children}
			</Text>
		</XStack>
	);
};
