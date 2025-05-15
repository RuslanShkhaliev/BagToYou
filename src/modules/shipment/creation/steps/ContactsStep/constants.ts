import { faker } from '@faker-js/faker';
import { FormInputProps } from '@shared/components/ui-kit/inputs/FormInput';
import { MessengerType } from '@shared/enums';
export const generateProfileInfo = () => ({
	name: faker.person.firstName(),
	surname: faker.person.lastName(),
	phone: faker.phone.number(),
	messenger: [MessengerType.fb],
});

export const CONTACT_FORM_FIELDS: Omit<FormInputProps, 'control'>[] = [
	{
		name: 'name',
		placeholder: 'Имя',
		textContentType: 'name',
	},
	{
		name: 'surname',
		placeholder: 'Фамилия',
		textContentType: 'name',
	},
	{
		name: 'phone',
		placeholder: 'Телефон для связи',
		keyboardType: 'phone-pad',
		textContentType: 'telephoneNumber',
	},
];
