import { FloatAction } from '@components/FloatAction';
import { LayoutScreen } from '@components/layout';
import { FormInput } from '@components/ui-kit';
import { useFormValidate } from '@hooks/useFormValidate';
import { useShipmentStore } from '@modules/shipment';
import { ROUTES_SHIPMENT } from '@modules/shipment/routes';
import { adShipmentCreateSchema } from '@shared/schemas/adShipment';
import { useNavbar } from '@widgets/Navbar';
import { useRouter } from 'expo-router';
import { Heading } from 'tamagui';

const nameStepSchema = adShipmentCreateSchema.pick({
	name: true,
});

export const NameStep = () => {
	useNavbar();
	const router = useRouter();
	const { updateState } = useShipmentStore();
	const { control, handleSubmit } = useFormValidate({
		schema: nameStepSchema,
		onSuccess: (data) => {
			updateState(data);
			router.push(ROUTES_SHIPMENT.CREATE.ROUTE);
		},
	});

	return (
		<LayoutScreen
			footer={
				<FloatAction onPress={handleSubmit}>Продолжить</FloatAction>
			}
			gap={30}
		>
			<Heading color={'$textPrimary'}>
				Укажите название объявления
			</Heading>

			<FormInput
				label={'Название объявления'}
				placeholder={'Например: Доставить личные вещи'}
				control={control}
				name={'name'}
			/>
		</LayoutScreen>
	);
};
