import { FloatAction } from '@components/FloatAction';
import { LayoutScreen, ScreenScroll } from '@components/layout';
import { FormInput } from '@components/ui-kit';
import { FormTextarea } from '@components/ui-kit/inputs/FormTextarea';
import { useFormValidate } from '@hooks/useFormValidate';
import { useCreateAdDeliveryMutation } from '@modules/delivery/queries';
import { useDeliveryStore } from '@modules/delivery/store';
import { AdDeliveryCreate, adDeliverySchema } from '@shared/schemas/adDelivery';
import { useNavbar } from '@widgets/Navbar';
import { useRouter } from 'expo-router';
import { Heading, View } from 'tamagui';

const formDetailsSchema = adDeliverySchema.pick({
	parcelInfo: true,
	description: true,
	rewards: true,
});

export const DetailsStepPage = () => {
	const router = useRouter();
	const { updateState, reset } = useDeliveryStore();
	useNavbar();
	const { mutateAsync, isPending } = useCreateAdDeliveryMutation();

	const createAd = async (data: AdDeliveryCreate) => {
		try {
			await mutateAsync(data);
			reset();
			router.dismissAll();
		} catch (error) {
			console.error('Error creating ad:', error);
			// TODO toast error message
		}
	};

	const { control, handleSubmit } = useFormValidate({
		schema: formDetailsSchema,
		onSuccess: (update) => {
			updateState(update);
			const { success, error, data } = adDeliverySchema.safeParse(
				useDeliveryStore.getState(),
			);

			if (success) {
				createAd(data);
			} else {
				console.log(error, 'validation failed');
				// TODO toast error message
			}
		},
	});
	return (
		<LayoutScreen
			px={0}
			footer={
				<FloatAction
					loading={isPending}
					onPress={handleSubmit}
				>
					Разместить объявление
				</FloatAction>
			}
		>
			<ScreenScroll
				px={12}
				flex={1}
			>
				<View
					gap={10}
					pt={30}
				>
					<Heading
						color={'$textPrimary'}
						fontSize={20}
						fontWeight={600}
					>
						Габариты посылки
					</Heading>
					<View gap={8}>
						<FormInput
							control={control}
							name={'parcelInfo.height'}
							label={'Максимальная высота, см'}
							keyboardType='decimal-pad'
						/>
						<FormInput
							control={control}
							name={'parcelInfo.length'}
							label={'Максимальная длина, см'}
							keyboardType='decimal-pad'
						/>
						<FormInput
							control={control}
							name={'parcelInfo.width'}
							label={'Максимальная ширина, см'}
							keyboardType='decimal-pad'
						/>
						<FormInput
							control={control}
							name={'parcelInfo.weight'}
							label={'Максимальный вес, кг'}
							keyboardType='decimal-pad'
						/>
					</View>
				</View>
				<View>
					<Heading
						color={'$textPrimary'}
						fontSize={20}
						fontWeight={600}
					>
						Вознаграждение
					</Heading>
					<FormInput
						control={control}
						name={'rewards'}
						label={'Укажите желаемую стоимость услуги'}
						placeholder='$'
					/>
				</View>
				<View gap={10}>
					<Heading
						color={'$textPrimary'}
						fontSize={20}
						fontWeight={600}
					>
						Дополнительные сведения
					</Heading>
					<FormTextarea
						control={control}
						name={'description'}
						placeholder={'Описание посылки'}
					/>
				</View>
			</ScreenScroll>
		</LayoutScreen>
	);
};
