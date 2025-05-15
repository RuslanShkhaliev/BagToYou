import { YStack } from 'tamagui';
import { CONTACT_FORM_FIELDS } from '../constants';
import { CheckboxProfile } from './CheckboxProfile';
import { ContactForm } from './ContactForm';

interface ContactPartyFormProps {
	title: string;
	fieldPrefix: 'senderInfo' | 'recipientInfo';
	isProfileData: boolean;
	checkboxLabel: string;
	onUseProfileData: (value: boolean) => void;
}

export function ContactPartyForm({
	title,
	fieldPrefix,
	isProfileData,
	onUseProfileData,
	checkboxLabel,
}: ContactPartyFormProps) {
	return (
		<YStack gap={20}>
			<ContactForm
				title={title}
				name={fieldPrefix}
				fields={CONTACT_FORM_FIELDS}
			/>
			<CheckboxProfile
				label={checkboxLabel}
				description='Заполнить данными профиля'
				isChecked={isProfileData}
				onCheck={onUseProfileData}
			/>
		</YStack>
	);
}
