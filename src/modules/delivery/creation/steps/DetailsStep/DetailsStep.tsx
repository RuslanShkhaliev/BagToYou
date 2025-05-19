import { FloatAction } from '@components/FloatAction';
import { ScreenLayout, ScreenScroll } from '@components/layout';
import { ButtonStyled, FormInput } from '@components/ui-kit';
import { FormTextarea } from '@components/ui-kit/inputs/FormTextarea';
import { useFormValidate } from '@hooks/useFormValidate';
import { ROUTES_DELIVERY } from '@modules/delivery/routes';
import { deliveryCreationSchema } from '@modules/delivery/schema';
import { useDeliveryStore } from '@modules/delivery/store';
import { useNavbar } from '@widgets/Navbar';
import { useRouter } from 'expo-router';
import { Heading, View } from 'tamagui';

const formDetailsSchema = deliveryCreationSchema.pick({
	parcelInfo: true,
	description: true,
	rewards: true,
});

export const DetailsStepPage = () => {
	const router = useRouter();
	const { updateState } = useDeliveryStore();

	useNavbar({
		title: 'Детали поездки',
	});

	const { control, handleSubmit } = useFormValidate({
		schema: formDetailsSchema,
		onSuccess: (data) => {
			updateState(data);
			router.push(ROUTES_DELIVERY.CREATE.CONTACTS);
		},
	});
	return (
		<ScreenLayout
			px={0}
			footer={
				<FloatAction>
					<ButtonStyled onPress={handleSubmit}>Далее</ButtonStyled>
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
		</ScreenLayout>
	);
};
