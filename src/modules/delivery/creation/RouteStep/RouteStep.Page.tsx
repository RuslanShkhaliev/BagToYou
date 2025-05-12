import { FloatAction } from '@components/FloatAction';
import { ScreenLayout } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { useDeliveryStore } from '@modules/delivery';
import { DatePicker } from '@widgets/DatesPicker';
import { useNavbar } from '@widgets/Navbar';
import { RoutePicker } from '@widgets/RoutePicker';
import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { View } from 'tamagui';
import { FormRouteScheme } from './schema';
import { useRouteFormContext } from './useRouteFormContext';

export const RouteStepPage = () => {
	const { updateState } = useDeliveryStore();
	const router = useRouter();

	const { control, onSubmit, setValue, clearErrors } = useRouteFormContext({
		onSubmit: (formData) => {
			updateState(formData);
			router.push('/delivery/create/contacts');
		},
	});

	useNavbar({
		title: 'Заполните данные о маршруте',
	});

	const onSelectRoute = (route: FormRouteScheme['route']) => {
		setValue('route', route, { shouldValidate: true });
		// clearErrors();
	};

	return (
		<ScreenLayout
			flex={1}
			modalView
			pt={30}
			footer={
				<FloatAction>
					<ButtonStyled onPress={onSubmit}>Далее</ButtonStyled>
				</FloatAction>
			}
		>
			<View gap={16}>
				<Controller
					control={control}
					name={'route'}
					render={({ field, fieldState: { error } }) => {
						console.log(error);

						return (
							<RoutePicker
								onChange={(route) => {
									onSelectRoute({ ...field.value, ...route });
								}}
								route={field.value}
								error={error?.message}
								errors={{
									from: error?.from?.message,
									to: error?.to?.message,
								}}
							/>
						);
					}}
				/>
				<Controller
					name={'dates'}
					control={control}
					render={({ field }) => <DatePicker dates={field.value} />}
				/>
			</View>
		</ScreenLayout>
	);
};
