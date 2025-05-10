import { ScreenView } from '@components/layout';
import { FormInput, LabelStyled, TextThemed } from '@components/ui-kit';
import { useDeliveryStore } from '@modules/delivery';
import { Check } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Heading, XStack, YStack } from 'tamagui';
import { useContactsStep } from './useContactsStep';

const ProfileInfo = {
	name: 'Иван',
	surname: 'Иванов',
	phone: '+79999999999',
};

const getProfileInfo = () => {
	return ProfileInfo;
};
export const ContactsStepPage = () => {
	const router = useRouter();
	const [isMeSender, setIsMeSender] = useState(false);
	const [isMeRecipient, setIsMeRecipient] = useState(false);

	const { updateState } = useDeliveryStore();
	const { control, onSubmit, setValue } = useContactsStep({
		onSubmit: (formData) => {
			updateState(formData);

			router.push('/create/delivery/parcel');
		},
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
		<ScreenView
			px={16}
			py={16}
		>
			<TextThemed fontSize={18}>Введите контактные данные</TextThemed>
			<Form
				onSubmit={onSubmit}
				flex={1}
			>
				<YStack>
					<Heading
						fontSize={18}
						color='$textPrimary'
					>
						Получатель
					</Heading>

					<YStack gap={8}>
						<YStack gap={8}>
							<FormInput
								name='senderInfo.name'
								control={control}
								required
								placeholder='Имя'
								textContentType='name'
							/>

							<FormInput
								name='senderInfo.surname'
								control={control}
								required
								placeholder='Фамилия'
								textContentType='name'
							/>
							<FormInput
								name='senderInfo.phone'
								control={control}
								required
								placeholder='Телефон для связи'
								textContentType='telephoneNumber'
								keyboardType='phone-pad' //
							/>
						</YStack>
						<YStack>
							<XStack
								gap='$3'
								items='center'
							>
								<Checkbox
									id='checkbox-recipient'
									size='$4'
									checked={isMeSender}
									defaultChecked={isMeSender}
									onCheckedChange={setIsMeSender}
								>
									<Checkbox.Indicator>
										<Check />
									</Checkbox.Indicator>
								</Checkbox>
								<YStack>
									<LabelStyled
										fontSize={14}
										height={16}
										p={0}
										htmlFor='checkbox-recipient'
									>
										Я получатель
									</LabelStyled>
									<TextThemed
										color='$textSecondary'
										fontSize={10}
									>
										заполнить данными профиля
									</TextThemed>
								</YStack>
							</XStack>
						</YStack>
					</YStack>
				</YStack>
				<YStack gap={16}>
					<Heading>Имя получателя</Heading>
					<YStack gap={8}>
						<FormInput
							name='recipientInfo.name'
							control={control}
							required
							placeholder='Имя'
							textContentType='name'
						/>

						<FormInput
							name='recipientInfo.surname'
							control={control}
							required
							placeholder='Фамилия'
							textContentType='name'
						/>
						<FormInput
							name='recipientInfo.phone'
							control={control}
							required
							placeholder='Телефон для связи'
							textContentType='telephoneNumber'
							keyboardType='phone-pad' //
						/>
					</YStack>
					<YStack>
						<XStack
							gap='$3'
							items='center'
						>
							<Checkbox
								id='checkbox-recipient'
								size='$4'
								checked={isMeRecipient}
								defaultChecked={isMeRecipient}
								onCheckedChange={(isChecked) =>
									setIsMeRecipient(Boolean(isChecked))
								}
							>
								<Checkbox.Indicator>
									<Check />
								</Checkbox.Indicator>
							</Checkbox>
							<LabelStyled
								fontSize={14}
								p={0}
								htmlFor='checkbox-recipient'
							>
								выбрать себя получателем
							</LabelStyled>
						</XStack>
						<TextThemed
							color='$textSecondary'
							fontSize={10}
						>
							заполним данными из вашего профиля
						</TextThemed>
					</YStack>
				</YStack>
				<Form.Trigger asChild>
					<Button mt={'auto'}>Далее</Button>
				</Form.Trigger>
			</Form>
		</ScreenView>
	);
};
