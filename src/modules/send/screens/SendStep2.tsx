import { ScreenScroll } from '@/components/ScreenScroll';
import { ButtonStyled } from '@/components/ui/buttons/ButtonStyled';
import { FormInput } from '@/components/ui/Inputs';
import { TextareaThemed } from '@/components/ui/Inputs/TextareaThemed';
import { LabelStyled } from '@/components/ui/LabelStyled';
import { useState } from 'react';
import { Form, YStack } from 'tamagui';

export const SendStep2 = () => {
	const [rewards, setRewards] = useState('');

	return (
		<ScreenScroll>
			<Form gap='$6'>
				<YStack gap={6}>
					<LabelStyled>Условия перевозки</LabelStyled>
					<TextareaThemed
						pt={10}
						pb={16}
						height={100}
					/>
				</YStack>
				<FormInput
					keyboardType='numeric'
					id='input-rewards'
					onChangeText={setRewards}
					value={rewards}
					placeholder='1000'
					label='Укажите вознаграждение'
				/>
				<Form.Trigger asChild>
					<ButtonStyled
						size='$5'
						fontSize={18}
					>
						Опубликовать
					</ButtonStyled>
				</Form.Trigger>
			</Form>
		</ScreenScroll>
	);
};
