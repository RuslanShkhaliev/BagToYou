import { InputField, InputFieldProps } from '@/components/ui/Inputs/InputField';
import { LabelStyled } from '@/components/ui/LabelStyled';
import { memo, useId } from 'react';
import { GetProps, Text, YStack } from 'tamagui';


interface FormInputProps extends InputFieldProps {
	label?: string;
	hint?: string;
	required?: boolean;
	error?: string;
	labelSize?: number;
	labelStyles?: GetProps<typeof LabelStyled>;
}


export const FormInput = memo(({
	label,
	hint,
	error,
	required,
	labelStyles,
	labelSize = 16,
	...inputProps
}: FormInputProps) => {
	const generatedId = useId();
	const inputId = inputProps.id ?? (label ? `input-${generatedId}` : undefined);
	const showError = Boolean(error);

	return (
		<YStack
			gap={4}
			flex={1}
		>
			{label && (
				<LabelStyled
					unstyled
					htmlFor={inputId}
					fontSize={labelSize}
					color={showError ? '$error' : '$textPrimary'}
					mb={4}
					{...labelStyles}
				>
					{label} {required && <Text color="$error">*</Text>}
				</LabelStyled>
			)}
			<InputField
				id={inputId}
				inValid={showError}
				rounded={16}
				{...inputProps}
			/>

			{required && !label && (
				<Text
					position="absolute"
					fontSize="$8"
					r={5}
					t={0}
					color="$error"
				>
					*
				</Text>
			)}
			<Text
				height={12}
				fontSize={12}
				color={showError ? '$error' : '$textSecondary'}
			>
				{error ?? hint}
			</Text>
		</YStack>
	);
});
