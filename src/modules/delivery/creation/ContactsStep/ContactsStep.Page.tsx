import { FloatAction } from '@components/FloatAction';
import { ScreenLayout, ScreenScroll } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { useDeliveryStore } from '@modules/delivery';
import { useNavbar } from '@widgets/Navbar';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'tamagui';
import { ContactsFieldsLayout } from './ContactsFields.Layout';
import { useContactsStep } from './useContactsStep';

const ProfileInfo = {
	name: 'Иван',
	surname: 'Иванов',
	phone: '+79999999999',
};

const getProfileInfo = () => {
	return ProfileInfo;
};

const formFields = {
	recipient: [
		{
			name: 'recipientInfo.name',
			placeholder: 'Имя',
			textContentType: 'name',
		},
		{
			name: 'recipientInfo.surname',
			placeholder: 'Фамилия',
			textContentType: 'name',
		},
		{
			name: 'recipientInfo.phone',
			placeholder: 'Телефон для связи',
			keyboardType: 'phone-pad',
			textContentType: 'telephoneNumber',
		},
	],
	sender: [
		{
			name: 'senderInfo.name',
			placeholder: 'Имя',
			textContentType: 'name',
		},
		{
			name: 'senderInfo.surname',
			placeholder: 'Фамилия',
			textContentType: 'name',
		},
		{
			name: 'senderInfo.phone',
			placeholder: 'Телефон для связи',
			textContentType: 'telephoneNumber',
			keyboardType: 'phone-pad',
		},
	],
};
export const ContactsStepPage = () => {
	const router = useRouter();
	const [isMeSender, setIsMeSender] = useState(false);
	const [isMeRecipient, setIsMeRecipient] = useState(false);

	const { updateState } = useDeliveryStore();
	const { control, onSubmit, setValue } = useContactsStep({
		onSubmit: (formData) => {
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
			pt={0}
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
					<ContactsFieldsLayout
						title='Отправитель'
						fields={formFields.sender}
						control={control}
						isChecked={isMeSender}
						onCheckedChange={setIsMeSender}
					/>
					<ContactsFieldsLayout
						title='Получатель'
						fields={formFields.recipient}
						control={control}
						isChecked={isMeRecipient}
						onCheckedChange={setIsMeRecipient}
					/>
				</View>
			</ScreenScroll>
		</ScreenLayout>
	);
};
