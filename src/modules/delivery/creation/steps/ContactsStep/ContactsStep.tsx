import { ScreenLayout } from '@components/layout/ScreenLayout';
import { InputField } from '@components/ui-kit';
import { faker } from '@faker-js/faker';
import { Heading } from 'tamagui';
const ProfileNumber = faker.phone.number();
export const ContactsStep = () => {
	return (
		<ScreenLayout>
			<Heading>Как с вами связаться?</Heading>
			<InputField
				placeholder={'Введите номер телефона'}
				value={ProfileNumber}
			/>
		</ScreenLayout>
	);
};
