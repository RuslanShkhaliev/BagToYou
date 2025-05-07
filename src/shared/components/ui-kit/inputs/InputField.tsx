import { X } from '@tamagui/lucide-icons';
import React, { forwardRef, memo } from 'react';
import { Button, GetProps, Input, styled, XStack, YStack } from 'tamagui';


export const InputThemed = styled(Input, {
	bg: '$inputBg',
	color: '$inputText',
	caretColor: '$textPrimary',
	placeholderTextColor: '$textSecondary',
	borderColor: '$inputBg',
	outlineStyle: 'none',
	flex: 1,
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
	height: 52,
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


export interface InputFieldProps extends GetProps<typeof InputThemed> {
	icon?: React.ReactNode;
	clearable?: boolean;
	onClear?: () => void;
}


export const InputField = memo(forwardRef<Input, InputFieldProps>(({
			icon,
			clearable = false,
			onChangeText,
			value = '',
			onClear,
			height = 52,
			...props
		}, ref) => {

			const clear = () => {
				onChangeText?.('');
				onClear?.();
			};

			const ClearButton = () => {
				return (<YStack
					position={'absolute'}
					z={1}
					r={0}
					t={0}
					pr={16}
					height={height}
					items="center"
					justify="center"
				>
					<Button
						rounded="$12"
						width={20}
						height={20}
						p={0}
						items="center"
						justify="center"
						bg="$graphite500"
						onPress={clear}
					>
						<X
							color="$white"
							size={12}
						/>
					</Button>
				</YStack>);
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
						onChangeText={onChangeText}
						height={height}
						value={value}
						pl={icon ? 52 : 16}
						{...props}
					/>
					{clearable && !!value?.length && (
						<ClearButton />
					)}
				</XStack>
			);
		},
	),
);
