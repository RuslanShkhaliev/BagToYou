import { FloatAction } from '@components/FloatAction';
import { LayoutScreen } from '@components/layout';
import { RouteSchema } from '@shared/schemas/common/location';
import { LocationSelector } from '@widgets/LocationSelector';
import { useNavbar } from '@widgets/Navbar';
import { useController } from 'react-hook-form';
import { View } from 'tamagui';
import { DatePartySelector } from './DatePartySelector';
import { useFormRouteStep } from './useFormRoute';

export const RouteStep = () => {
	useNavbar();
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
		<LayoutScreen
			flex={1}
			pt={30}
			footer={
				<FloatAction
					containerProps={{
						px: 20,
					}}
					onPress={handleSubmit}
				>
					Продолжить
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
		</LayoutScreen>
	);
};
