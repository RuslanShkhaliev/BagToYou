import { InputField, InputFieldProps } from '@/components/ui/Inputs/InputField';
import { LabelStyled } from '@/components/ui/LabelStyled';
import React, { memo, useId } from 'react';
import { Control, Controller } from 'react-hook-form';
import { GetProps, Text, YStack } from 'tamagui';

interface FormInputProps extends InputFieldProps {
	label?: string;
	hint?: string;
	required?: boolean;
	error?: string;
	labelSize?: number;
	labelStyles?: GetProps<typeof LabelStyled>;
	control: Control;
	name: string;
}

export const FormInput = memo(
	({
		label,
		hint,
		error,
		required,
		labelStyles,
		labelSize = 16,
		control,
		name,
		onChangeText,
		...inputProps
	}: FormInputProps) => {
		const generatedId = useId();
		const inputId =
			inputProps.id ?? (label ? `input-${generatedId}` : undefined);
		const showError = Boolean(error);

		return (
			<YStack gap={4}>
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
						<React.Fragment>
							<InputField
								id={inputId}
								inValid={Boolean(error?.message)}
								rounded={10}
								onChangeText={(text) => {
									onChange(text);
									onChangeText?.(text);
								}}
								{...field}
							/>
							<Text
								height={12}
								fontSize={12}
								color={error?.message ? '$error' : '$textSecondary'}
							>
								{error?.message ?? hint}
							</Text>
						</React.Fragment>
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
