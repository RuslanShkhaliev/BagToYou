import { FloatAction } from '@components/FloatAction';
import { ScreenLayout } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { RouteSchema } from '@shared/schema/location';
import { LocationSelector } from '@widgets/LocationSelector';
import { useNavbar } from '@widgets/Navbar';
import { useController } from 'react-hook-form';
import { View } from 'tamagui';
import { DatePartySelector } from './DatePartySelector';
import { useFormRouteStep } from './hooks/useFormRoute';

export const RouteStep = () => {
	useNavbar({
		title: 'Шаг 1: Маршрут',
	});
	const {
		control,
		handleSubmit,
		errors,
		onSelectRoute,
		onSelectDate,
		onChangeDateType,
	} = useFormRouteStep();

	const { field: routeField } = useController({
		control,
		name: 'route',
	});

	const { field: dateField } = useController({
		control,
		name: 'date',
	});

	return (
		<ScreenLayout
			flex={1}
			pt={30}
			footer={
				<FloatAction px={20}>
					<ButtonStyled onPress={handleSubmit}>Далее</ButtonStyled>
				</FloatAction>
			}
		>
			<View gap={16}>
				<LocationSelector
					onChange={(route) => {
						onSelectRoute({
							...routeField.value,
							...route,
						} as RouteSchema);
					}}
					route={routeField.value}
					error={errors?.route?.message}
					errors={{
						from: errors?.route?.from?.message,
						to: errors?.route?.to?.message,
					}}
				/>
				<DatePartySelector
					type={dateField.value.type}
					value={dateField.value.value}
					error={errors?.date?.value?.message}
					onChangeType={onChangeDateType}
					onSelectDate={onSelectDate}
				/>
			</View>
		</ScreenLayout>
	);
};
