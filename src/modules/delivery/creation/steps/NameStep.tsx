import { FloatAction } from '@components/FloatAction';
import { LayoutScreen } from '@components/layout';
import { FormInput } from '@components/ui-kit';
import { useFormValidate } from '@hooks/useFormValidate';
import { ROUTES_DELIVERY } from '@modules/delivery/routes';
import { useDeliveryStore } from '@modules/delivery/store';
import { adDeliverySchema } from '@shared/schemas/adDelivery';
import { useNavbar } from '@widgets/Navbar';
import { useRouter } from 'expo-router';
import { Heading } from 'tamagui';

const nameStepSchema = adDeliverySchema.pick({
	name: true,
});

export const NameStep = () => {
	useNavbar();
	const router = useRouter();
	const { updateState } = useDeliveryStore();
	const { control, handleSubmit } = useFormValidate({
		schema: nameStepSchema,
		onSuccess: (data) => {
			updateState(data);
			router.push(ROUTES_DELIVERY.CREATE.ROUTE);
		},
	});

	return (
		<LayoutScreen
			footer={
				<FloatAction onPress={handleSubmit}>Продолжить</FloatAction>
			}
			gap={30}
		>
			<Heading
				color={'$textPrimary'}
				fontSize={24}
			>
				Укажите название объявления
			</Heading>

			<FormInput
				label={'Название объявления'}
				placeholder={'Например: Привезу ноутбук'}
				control={control}
				name={'name'}
				clearable
			/>
		</LayoutScreen>
	);
};
