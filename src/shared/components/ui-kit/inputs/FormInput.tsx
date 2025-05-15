import {
	InputField,
	InputFieldProps,
} from '@components/ui-kit/inputs/InputField';
import React, { memo, useId } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { GetProps, Text, YStack } from 'tamagui';
import { LabelStyled } from '../LabelStyled';
import { TextThemed } from '../TextThemed';

export interface FormInputProps<T extends FieldValues = FieldValues>
	extends InputFieldProps {
	label?: string;
	hint?: string;
	required?: boolean;
	error?: string;
	labelSize?: number;
	labelStyles?: GetProps<typeof LabelStyled>;
	control: Control<T>;
	name: Path<T>;
}

export const FormInput = memo(
	<T extends FieldValues>({
		label,
		hint,
		required,
		labelStyles,
		labelSize = 16,
		control,
		name,
		onChangeText,
		...inputProps
	}: FormInputProps<T>) => {
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
				<Controller
					control={control}
					name={name}
					render={({
						field: { onChange, ...field },
						fieldState: { error },
					}) => (
						<YStack gap={6}>
							<InputField
								id={inputId}
								inValid={Boolean(error?.message)}
								rounded={10}
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
