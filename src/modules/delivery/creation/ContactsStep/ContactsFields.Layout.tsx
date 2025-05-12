import {
	FormInput,
	FormInputProps,
	LabelStyled,
	TextThemed,
} from '@components/ui-kit';
import { Check } from '@tamagui/lucide-icons';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox, Heading, XStack, YStack } from 'tamagui';

interface ContactsFieldsLayout {
	title: string;
	fields: FormInputProps[];
	isChecked?: boolean;
	onCheckedChange?: (isChecked: boolean) => void;
}
export const ContactsFieldsLayout = ({
	title,
	fields,
	isChecked,
	onCheckedChange,
}: ContactsFieldsLayout) => {
	const { control } = useFormContext();
	const checkboxId = `checkbox-${useId()}`;
	return (
		<YStack flex={1}>
			<Heading
				fontSize={18}
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
						/>
					))}
				</YStack>
				<XStack
					gap='$3'
					items='stretch'
				>
					<Checkbox
						id={checkboxId}
						size='$4'
						checked={isChecked}
						defaultChecked={isChecked}
						onCheckedChange={onCheckedChange}
					>
						<Checkbox.Indicator>
							<Check color='$textPrimary' />
						</Checkbox.Indicator>
					</Checkbox>
					<LabelStyled
						fontSize={14}
						htmlFor={checkboxId}
					>
						<YStack>
							<TextThemed>Я {title.toLowerCase()}</TextThemed>
							<TextThemed
								color='$textSecondary'
								fontSize={10}
							>
								заполнить данными профиля
							</TextThemed>
						</YStack>
					</LabelStyled>
				</XStack>
			</YStack>
		</YStack>
	);
};
