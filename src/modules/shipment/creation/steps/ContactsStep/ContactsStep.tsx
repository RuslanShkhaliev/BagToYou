import { FloatAction } from '@components/FloatAction';
import { ScreenLayout, ScreenScroll } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { useNavbar } from '@widgets/Navbar';
import React, { useEffect, useState } from 'react';
import { View } from 'tamagui';
import { ContactPartyForm } from './components/ContactPartyForm';
import { generateProfileInfo } from './constants';
import { useContactsStep } from './hooks/useContactsStep';

export const ContactsStep = () => {
	const [isMeSender, setIsMeSender] = useState(false);
	const [isMeRecipient, setIsMeRecipient] = useState(false);

	const { handleSubmit, setValue } = useContactsStep();

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
			setValue('senderInfo', generateProfileInfo());
		}
	}, [isMeSender]);

	useEffect(() => {
		if (isMeRecipient) {
			setValue('recipientInfo', generateProfileInfo());
		}
	}, [isMeRecipient]);

	return (
		<ScreenLayout
			pt={20}
			px={0}
			footer={
				<FloatAction>
					<ButtonStyled onPress={handleSubmit}>Далее</ButtonStyled>
				</FloatAction>
			}
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
					<ContactPartyForm
						title='Отправитель'
						fieldPrefix='senderInfo'
						isProfileData={isMeSender}
						onUseProfileData={setIsMeSender}
						checkboxLabel='Я отправитель'
					/>
					<ContactPartyForm
						title='Получатель'
						fieldPrefix='recipientInfo'
						isProfileData={isMeRecipient}
						onUseProfileData={setIsMeRecipient}
						checkboxLabel='Я получатель'
					/>
				</View>
			</ScreenScroll>
		</ScreenLayout>
	);
};
