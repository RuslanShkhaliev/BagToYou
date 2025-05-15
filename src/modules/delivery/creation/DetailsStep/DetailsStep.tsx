import { FloatAction } from '@components/FloatAction';
import { ScreenLayout, ScreenScroll } from '@components/layout';
import {
	ButtonStyled,
	ErrorMessage,
	FormInput,
	TextThemed,
} from '@components/ui-kit';
import { FormTextarea } from '@components/ui-kit/inputs/FormTextarea';
import { mediaAssetSchema } from '@shared/schema';
import { MediaPicker } from '@widgets/MediaPicker';
import { useNavbar } from '@widgets/Navbar';
import { Controller, useFormContext } from 'react-hook-form';
import { Heading, View, YStack } from 'tamagui';
import { z } from 'zod';
import { parseErrors } from '../shared/utils';
import { DeliveryStore, useDeliveryStore } from '../store';

const formDetailsSchema = z.object({
	media: z.array(mediaAssetSchema).nonempty({
		message: 'Добавьте хотя бы одну фотографию',
	}),
	description: z.string().min(1, { message: 'Введите описание' }),
	rewards: z.string().min(1, { message: 'Укажите вознаграждение' }),
});

export const DetailsStep = () => {
	useNavbar({
		right: <ButtonStyled variant={'ghost'}>Сохранить и выйти</ButtonStyled>,
	});
	const { updateState } = useDeliveryStore();
	const { control, handleSubmit, setError, clearErrors } =
		useFormContext<DeliveryStore>();

	const onSubmit = handleSubmit((formData: DeliveryStore) => {
		const { success, data, error } = formDetailsSchema.safeParse(formData);

		clearErrors();
		if (!success) {
			const errors = parseErrors(error.format());

			console.log('errors');

			errors.forEach(([path, message]) => {
				setError(path as keyof DeliveryStore, {
					message,
				});
			});
			return;
		}
		updateState(data);
	});

	return (
		<ScreenLayout
			px={0}
			footer={
				<FloatAction
					px={16}
					bg={'transparent'}
				>
					<ButtonStyled
						height={50}
						onPress={onSubmit}
					>
						Разместить объявление
					</ButtonStyled>
				</FloatAction>
			}
		>
			<ScreenScroll px={12}>
				<View gap={'$6'}>
					<YStack gap={'$3'}>
						<Heading
							color={'$textPrimary'}
							fontSize={'$6'}
							fontWeight={'600'}
						>
							Фотографии
						</Heading>

						<Controller
							control={control}
							name={'media'}
							render={({ field, fieldState: { error } }) => (
								<View gap={'$2'}>
									<MediaPicker
										media={field.value}
										onUpdate={field.onChange}
									/>
									{error?.message && (
										<ErrorMessage message={error.message} />
									)}
								</View>
							)}
						/>
					</YStack>
					<YStack gap={'$3'}>
						<Heading
							color={'$textPrimary'}
							fontSize={'$6'}
							fontWeight={'600'}
						>
							Описание
						</Heading>
						<FormTextarea
							name={'description'}
							placeholder='Введите описание'
							control={control}
							maxHeight={250}
						/>
					</YStack>
					<YStack gap={'$5'}>
						<View>
							<Heading
								fontSize={'$6'}
								color={'$textPrimary'}
								fontWeight={'600'}
							>
								Предложите вознаграждение
							</Heading>
							<TextThemed
								color={'$textSecondary'}
								fontSize={'$5'}
							>
								Исполнитель увидит эту ценну рядом с названием
								объявления
							</TextThemed>
						</View>
						<FormInput
							name={'rewards'}
							keyboardType={'numeric'}
							control={control}
							placeholder='$'
						/>
					</YStack>
				</View>
			</ScreenScroll>
		</ScreenLayout>
	);
};
