import { InputThemed } from '@/components/ui/InputThemed';
import { LabelStyled } from '@/components/ui/LabelStyled';
import { InputProps, Text, YStack } from 'tamagui';

interface InputFieldProps extends InputProps {
	label?: string;
	fontSize?: number;
	required?: boolean;
	hint?: string;
	errorMessage?: string;
	isInvalid?: boolean;
}

const paddingLeft = 12;
export const InputField = ({
	label,
	hint,
	errorMessage,
	isInvalid = false,
	fontSize = 14,
	required,
	...inputProps
}: InputFieldProps) => {
	const defaultId = `input-${label}`;

	return (
		<YStack flex={1} gap={4}>
			{label && (
				<LabelStyled
					unstyled
					lineHeight={fontSize}
					htmlFor={inputProps.id ?? defaultId}
					fontSize={fontSize}
					color={isInvalid ? '$red500' : '$textPrimary'}
					marginBottom={4}
				>
					{label} {required && <Text color="$red500">*</Text>}
				</LabelStyled>
			)}
			<InputThemed
				paddingVertical={12}
				paddingLeft={paddingLeft}
				lineHeight={22}
				aria-invalid={isInvalid}
				paddingRight={0}
				fontSize={fontSize}
				borderColor={isInvalid ? '$red500' : '$inputBg'}
				height="100%"
				placeholderTextColor={isInvalid ? '$red500' : '$textSecondary'}
				id={label && defaultId}
				{...inputProps}
			/>

			{required && !label && (
				<Text position="absolute" right={5} top={0} color="$red500">
					*
				</Text>
			)}
			<Text height={8} fontSize={8} color={errorMessage ? '$red500' : '$textSecondary'}>
				{errorMessage ?? hint}
			</Text>
		</YStack>
	);
};
