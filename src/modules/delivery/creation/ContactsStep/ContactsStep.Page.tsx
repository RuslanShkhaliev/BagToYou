import { FloatAction } from '@components/FloatAction';
import { ScreenLayout, ScreenScroll } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { useDeliveryStore } from '@modules/delivery';
import { MessengerType } from '@shared/enums';
import { useNavbar } from '@widgets/Navbar';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, YStack } from 'tamagui';
import { CheckboxSelf } from './CheckboxSelf';
import { ContactsFieldsLayout } from './ContactsFields.Layout';
import { useContactsStep } from './useContactsStep';
const ProfileInfo = {
	name: 'Иван',
	surname: 'Иванов',
	phone: '+79999999999',
	messenger: [MessengerType.tg],
};

const getProfileInfo = () => {
	return ProfileInfo;
};

const formFields = [
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
export const ContactsStepPage = () => {
	const router = useRouter();
	const [isMeSender, setIsMeSender] = useState(false);
	const [isMeRecipient, setIsMeRecipient] = useState(false);

	const { updateState } = useDeliveryStore();
	const { control, onSubmit, setValue } = useContactsStep({
		onSubmit: (formData) => {
			console.log(formData, 'formData');

			updateState(formData);

			router.push('/delivery/create/parcel');
		},
	});

	useNavbar({
		right: (
			<ButtonStyled
				onPress={() => console.log('save')}
				variant={'ghost'}
			>
				Сохранить и выйти
			</ButtonStyled>
		),
	});

	useEffect(() => {
		if (isMeSender) {
			setValue('senderInfo', getProfileInfo());
		}
	}, [isMeSender]);

	useEffect(() => {
		if (isMeRecipient) {
			setValue('recipientInfo', getProfileInfo());
		}
	}, [isMeRecipient]);

	return (
		<ScreenLayout
			footer={
				<FloatAction>
					<ButtonStyled onPress={onSubmit}>Далее</ButtonStyled>
				</FloatAction>
			}
			pt={20}
			px={0}
		>
			<ScreenScroll
				flex={1}
				px={12}
			>
				<View
					flex={1}
					bg={'$bg'}
					gap={50}
					pb={30}
				>
					<YStack gap={20}>
						<ContactsFieldsLayout
							title='Отправитель'
							name='senderInfo'
							fields={formFields}
							control={control}
						/>
						<CheckboxSelf
							label='Я отправитель'
							isChecked={isMeSender}
							description='Заполнить данными профиля'
							onCheck={setIsMeSender}
						/>
					</YStack>
					<YStack gap={20}>
						<ContactsFieldsLayout
							title='Получатель'
							name='recipientInfo'
							fields={formFields}
							control={control}
						/>
						<CheckboxSelf
							label='Я получатель'
							description='Заполнить данными профиля'
							isChecked={isMeRecipient}
							onCheck={setIsMeRecipient}
						/>
					</YStack>
				</View>
			</ScreenScroll>
		</ScreenLayout>
	);
};
