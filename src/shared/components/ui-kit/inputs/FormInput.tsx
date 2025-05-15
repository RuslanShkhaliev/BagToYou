import {
	InputField,
	InputFieldProps,
} from '@components/ui-kit/inputs/InputField';
import React, { memo, useId } from 'react';
import {
	Controller,
	FieldPath,
	FieldValues,
	UseControllerProps,
} from 'react-hook-form';
import { GetProps, Text, YStack } from 'tamagui';
import { LabelStyled } from '../LabelStyled';
import { TextThemed } from '../TextThemed';

export type FormInputProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> = Omit<InputFieldProps, 'value'> & {
	label?: string;
	hint?: string;
	required?: boolean;
	error?: string;
	labelSize?: number;
	labelStyles?: GetProps<typeof LabelStyled>;
} & UseControllerProps<TFieldValues, TName>;

/**
 * Компонент ввода для использования с react-hook-form
 * Автоматически интегрируется с Controller
 */
export const FormInput = memo(
	<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
		label,
		hint,
		required,
		labelStyles,
		labelSize = 16,
		control,
		name,
		defaultValue,
		onChangeText,
		rules,
		...inputProps
	}: FormInputProps<TFieldValues, TName>) => {
		const generatedId = useId();
		const inputId =
			inputProps.id ?? (label ? `input-${generatedId}` : undefined);
		const showError = Boolean(inputProps.error);

		return (
			<YStack gap={8}>
				{label && (
					<LabelStyled
						unstyled
						htmlFor={inputId}
						fontSize={labelSize}
						color={showError ? '$error' : '$textPrimary'}
						mb={4}
						{...labelStyles}
					>
						{label} {required && <Text color='$error'>*</Text>}
					</LabelStyled>
				)}
				<Controller<TFieldValues, TName>
					control={control}
					name={name}
					defaultValue={defaultValue}
					rules={rules}
					render={({
						field: { onChange, value, ...field },
						fieldState: { error },
					}) => (
						<YStack gap={6}>
							<InputField
								id={inputId}
								inValid={Boolean(error?.message)}
								rounded={10}
								value={String(value ?? '')}
								onChangeText={(text) => {
									onChange(text);
									onChangeText?.(text);
								}}
								{...inputProps}
								{...field}
							/>
							<TextThemed
								fontSize={12}
								lineHeight={12}
								color={
									error?.message ? '$error' : '$textSecondary'
								}
							>
								{error?.message ?? hint}
							</TextThemed>
						</YStack>
					)}
				/>

				{required && !label && (
					<Text
						position='absolute'
						fontSize='$8'
						r={5}
						t={0}
						color='$error'
					>
						*
					</Text>
				)}
			</YStack>
		);
	},
);
