import { FormInput, FormInputProps } from '@components/ui-kit';
import { Controller, useFormContext } from 'react-hook-form';
import { Heading, YStack } from 'tamagui';
import { MessengerSelector } from './MessengerSelector';

interface ContactFormProps {
	title: string;
	name: 'recipientInfo' | 'senderInfo';
	fields: Omit<FormInputProps, 'control'>[];
}
export const ContactForm = ({ title, fields, name }: ContactFormProps) => {
	const { control } = useFormContext();

	return (
		<YStack flex={1}>
			<Heading
				fontSize={20}
				fontWeight={600}
				color='$textPrimary'
			>
				{title}
			</Heading>

			<YStack gap={8}>
				<YStack gap={8}>
					{fields.map((field) => (
						<FormInput
							key={field.name}
							control={control}
							clearable
							{...field}
							name={`${name}.${field.name}`}
						/>
					))}
				</YStack>
				<Controller
					control={control}
					name={`${name}.messenger`}
					render={({ field }) => (
						<MessengerSelector
							selected={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</YStack>
		</YStack>
	);
};
