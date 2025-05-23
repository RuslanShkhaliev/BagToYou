import { ButtonStyled, TextThemed } from '@components/ui-kit';
import { IconProps } from '@tamagui/helpers-icon';
import React, { NamedExoticComponent } from 'react';
import { ColorProp, View, YStack } from 'tamagui';

interface EmptyStateProps {
	/**
	 * Заголовок пустого состояния
	 */
	title: string;
	/**
	 * Описание пустого состояния
	 */
	description?: string;
	/**
	 * Иконка для отображения
	 */
	Icon?: NamedExoticComponent<IconProps>;
	/**
	 * Цвет иконки
	 */
	iconColor?: ColorProp;
	/**
	 * Размер иконки
	 */
	iconSize?: number;
	/**
	 * Текст кнопки
	 */
	buttonText?: string;
	/**
	 * Обработчик нажатия на кнопку
	 */
	onButtonPress?: () => void;
	/**
	 * Скрыть иконку
	 */
	hideIcon?: boolean;
}

export const EmptyState = ({
	title,
	description,
	Icon,
	iconColor = '$accent',
	iconSize = 40,
	buttonText,
	onButtonPress,
	hideIcon = false,
}: EmptyStateProps) => {
	return (
		<YStack
			flex={1}
			justify='center'
			items='center'
			gap={20}
			px={16}
		>
			{!hideIcon && Icon && (
				<View
					bg='$surfaceHover'
					width={80}
					height={80}
					rounded={40}
					justify='center'
					items='center'
				>
					<Icon
						size={iconSize}
						color={iconColor as never}
					/>
				</View>
			)}

			<YStack
				gap={8}
				items='center'
			>
				<TextThemed
					fontSize={20}
					fontWeight='600'
					text='center'
				>
					{title}
				</TextThemed>

				{description && (
					<TextThemed
						fontSize={16}
						color='$textSecondary'
						text='center'
						maxW={320}
					>
						{description}
					</TextThemed>
				)}
			</YStack>

			{buttonText && onButtonPress && (
				<ButtonStyled
					variant='inverse'
					onPress={onButtonPress}
					mt={10}
				>
					{buttonText}
				</ButtonStyled>
			)}
		</YStack>
	);
};
