import { FloatAction } from '@components/FloatAction';
import { LayoutScreen } from '@components/layout';
import { RouteSchema } from '@shared/schemas';
import { LocationSelector } from '@widgets/LocationSelector';
import { useNavbar } from '@widgets/Navbar';
import React from 'react';
import { useController } from 'react-hook-form';
import { View } from 'tamagui';
import { DateSelectorParty } from './DateSelectorParty';
import { SelectTransport } from './SelectTransport';
import { useRouteForm } from './useRouteForm';

export const RouteStepPage = () => {
	useNavbar({
		title: 'Шаг 1: Укажите маршрут',
	});

	const {
		control,
		handleSubmit,
		errors,
		onSelectDates,
		onSelectRoute,
		onSelectTransport,
	} = useRouteForm();

	const { field: routeField } = useController({
		control,
		name: 'route',
	});

	const { field: datesField } = useController({
		control,
		name: 'dates',
	});

	const { field: transportField } = useController({
		control,
		name: 'transport',
	});

	return (
		<LayoutScreen
			flex={1}
			pt={30}
			footer={<FloatAction onPress={handleSubmit}>Далее</FloatAction>}
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

				<DateSelectorParty
					date={datesField.value}
					onChange={onSelectDates}
					error={errors?.dates?.message}
				/>
				<SelectTransport
					selected={transportField.value}
					onSelect={onSelectTransport}
				/>
			</View>
		</LayoutScreen>
	);
};
