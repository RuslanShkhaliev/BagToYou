import { ColorTokens } from '@tamagui/core';
import { X } from '@tamagui/lucide-icons';
import React, { useMemo } from 'react';
import { Button, FontSizeTokens, Text, XStack } from 'tamagui';

export interface TextFieldProps {
	value?: string;
	labelColor?: ColorTokens;
	placeholder?: string;
	placeholderColor?: ColorTokens;
	fontSize?: FontSizeTokens;
	onClear?: () => void;
	icon?: React.ReactNode;
	height?: number;
	error?: string;
}

export const TextField = ({
	value = '',
	labelColor = '$textPrimary',
	placeholderColor = '$textSecondary',
	placeholder = '',
	onClear,
	fontSize = 16,
	height = 44,
	error,
	icon,
}: TextFieldProps) => {
	const showClearBtn = useMemo(
		() => onClear && value.length > 0,
		[onClear, value],
	);

	const color = useMemo(() => {
		if (error) {
			return '$red500';
		}
		return value ? labelColor : placeholderColor;
	}, [error, value]);
	return (
		<XStack
			gap={6}
			grow={1}
			items='center'
			height={height}
			pl={16}
		>
			{icon && <XStack>{icon}</XStack>}

			<XStack
				flex={1}
				height={'100%'}
				items={'center'}
			>
				<Text
					numberOfLines={1}
					fontSize={fontSize}
					color={color}
					select='none'
					verticalAlign={'center'}
				>
					{error || value || placeholder}
				</Text>
			</XStack>
			{showClearBtn && (
				<XStack
					height={'100%'}
					items='center'
					pr={8}
				>
					<Button
						unstyled
						cursor='pointer'
						borderWidth={0}
						bg='transparent'
						px={8}
						py={8}
						circular
						pressStyle={{
							bg: '$inputBg',
						}}
						icon={
							<X
								size={14}
								color='$textSecondary'
							/>
						}
						onPress={(e) => {
							e.stopPropagation();
							onClear?.();
						}}
					/>
				</XStack>
			)}
		</XStack>
	);
};
