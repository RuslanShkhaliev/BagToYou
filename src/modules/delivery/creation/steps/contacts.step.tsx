import { FormInput } from '@components/ui-kit';
import { TextThemed } from '@components/ui-kit/TextThemed';
import { ScreenView } from '@layout/ScreenView';
import { Button, Form, Heading, YStack } from 'tamagui';
export const ContactsStep = () => {
	return (
		<ScreenView>
			<TextThemed fontSize={18}>Введите контактные данные</TextThemed>

			<Form>
				<YStack gap={16}>
					<Heading>Имя отправителя</Heading>
					<FormInput label={'Имя'} />
					<FormInput label={'Фамилия'} />
					<FormInput label={'Телефон'} />
				</YStack>
				<YStack gap={16}>
					<Heading>Имя получателя</Heading>
					<FormInput label={'Имя'} />
					<FormInput label={'Фамилия'} />
					<FormInput label={'Телефон'} />
				</YStack>
				<Form.Trigger asChild>
					<Button>Далее</Button>
				</Form.Trigger>
			</Form>
		</ScreenView>
	);
};
