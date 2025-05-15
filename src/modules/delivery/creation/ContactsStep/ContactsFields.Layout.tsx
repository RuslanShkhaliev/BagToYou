import { FormInput, FormInputProps } from '@components/ui-kit';
import { Controller, useFormContext } from 'react-hook-form';
import { Heading, YStack } from 'tamagui';
import { SocialSelector } from './SocialSelector';

interface ContactsFieldsLayout {
	title: string;
	name: 'recipientInfo' | 'senderInfo';
	fields: FormInputProps[];
	isChecked?: boolean;
	onCheckedChange?: (isChecked: boolean) => void;
}
export const ContactsFieldsLayout = ({
	title,
	fields,
	name,
}: ContactsFieldsLayout) => {
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
						<SocialSelector
							selected={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</YStack>
		</YStack>
	);
};
