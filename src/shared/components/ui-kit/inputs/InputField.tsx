import { X } from '@tamagui/lucide-icons';
import React, { forwardRef, memo } from 'react';
import { Button, GetProps, Input, styled, XStack, YStack } from 'tamagui';

export interface InputFieldProps extends GetProps<typeof InputThemed> {
	icon?: React.ReactNode;
	clearable?: boolean;
	onClear?: () => void;
	type?: 'text' | 'number' | 'decimal';
	allowNegative?: boolean;
	maxDecimals?: number;
}

export const InputField = memo(
	forwardRef<Input, InputFieldProps>(
		(
			{
				icon,
				clearable = false,
				value = '',
				height = 52,
				type = 'text',
				allowNegative = false,
				maxDecimals = 2,
				onClear,
				onChangeText,
				...props
			},
			ref,
		) => {
			const showClearButton = clearable && !!value?.length;

			const handleChange = (text: string) => {
				onChangeText?.(text);
			};
			const handleClear = () => {
				onChangeText?.('');
				onClear?.();
			};

			return (
				<XStack
					position={'relative'}
					items={'center'}
					group
				>
					{icon && (
						<XStack
							position={'absolute'}
							height={height}
							width={34}
							t={0}
							l={0}
							z={1}
							justify={'flex-end'}
							items={'center'}
						>
							{icon}
						</XStack>
					)}
					<InputThemed
						ref={ref}
						onChangeText={handleChange}
						height={height}
						value={String(value)}
						pl={icon ? 44 : 16}
						width={'100%'}
						{...props}
					/>
					{showClearButton && (
						<YStack
							position={'absolute'}
							z={1}
							r={0}
							t={0}
							pr={16}
							height={height}
							items='center'
							justify='center'
						>
							<ClearButton onClear={handleClear} />
						</YStack>
					)}
				</XStack>
			);
		},
	),
);

const ClearButton = ({ onClear }: { onClear: () => void }) => {
	return (
		<Button
			rounded='$12'
			width={20}
			height={20}
			p={0}
			items='center'
			justify='center'
			bg='$graphite500'
			onPress={onClear}
		>
			<X
				color='$white'
				size={12}
			/>
		</Button>
	);
};
export const InputThemed = styled(Input, {
	bg: '$inputBg',
	color: '$inputText',
	caretColor: '$textPrimary',
	placeholderTextColor: '$textSecondary',
	outlineStyle: 'none',
	focusVisibleStyle: {
		outlineColor: 'transparent',
	},
	pressStyle: {
		bg: '$white8',
	},
	rounded: 0,
	pr: 16,
	fontSize: 16,
	selectTextOnFocus: false,
	minH: 52,
	variants: {
		disableAssist: {
			true: {
				autoCorrect: false,
				keyboardType: 'default',
				textContentType: 'none',
				autoCapitalize: 'none',
				importantForAutofill: 'no',
				spellCheck: false,
			},
		},
		inValid: {
			true: {
				color: '$error',
				borderColor: '$error',
				outlineColor: '$error',
				placeholderTextColor: '$error',
			},
		},
	} as const,
});
