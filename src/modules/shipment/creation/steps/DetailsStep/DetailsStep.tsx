import { FloatAction } from '@components/FloatAction';
import { LayoutScreen, ScreenScroll } from '@components/layout';
import {
	ButtonStyled,
	ErrorMessage,
	FormInput,
	TextThemed,
} from '@components/ui-kit';
import { FormTextarea } from '@components/ui-kit/inputs';
import { MediaPicker } from '@widgets/MediaGallerySelector';
import { useNavbar } from '@widgets/Navbar';
import { useController } from 'react-hook-form';
import { Heading, View, YStack } from 'tamagui';
import { useDetailsForm } from './useDetailsForm';

export const DetailsStep = () => {
	useNavbar({
		right: <ButtonStyled variant={'ghost'}>Сохранить и выйти</ButtonStyled>,
	});

	const { control, handleSubmit, errors } = useDetailsForm();

	const { field } = useController({
		name: 'media',
		control,
	});

	return (
		<LayoutScreen
			px={0}
			footer={
				<FloatAction
					containerProps={{
						px: 16,
						bg: 'transparent',
					}}
					height={50}
					onPress={handleSubmit}
				>
					Продолжить
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

						<View gap={'$2'}>
							<MediaPicker
								media={field.value}
								onChange={field.onChange}
							/>
							{errors?.media?.message && (
								<ErrorMessage message={errors.media.message} />
							)}
						</View>
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
								Исполнитель увидит эту цену рядом с названием
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
		</LayoutScreen>
	);
};
