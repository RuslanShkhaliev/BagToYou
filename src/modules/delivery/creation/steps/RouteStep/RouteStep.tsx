import { FloatAction } from '@components/FloatAction';
import { ScreenLayout } from '@components/layout';
import { ButtonStyled, ErrorMessage } from '@components/ui-kit';
import { RouteSchema } from '@shared/schema';
import { DateRangeSelector } from '@widgets/DateRangeSelector';
import { LocationSelector } from '@widgets/LocationSelector';
import { useNavbar } from '@widgets/Navbar';
import React from 'react';
import { useController } from 'react-hook-form';
import { Heading, View } from 'tamagui';
import { SelectTransport } from './components/SelectTransport';
import { useRouteForm } from './hooks/useRouteForm';

export const RouteStepPage = () => {
	useNavbar({
		title: 'Заполните данные о маршруте',
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
		<ScreenLayout
			flex={1}
			pt={30}
			footer={
				<FloatAction>
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
				<View>
					<Heading
						color={'$textPrimary'}
						fontSize={18}
					>
						Выберите даты поездки
					</Heading>
					<DateRangeSelector
						dates={[datesField.value.from, datesField.value.to]}
						onChange={onSelectDates}
					/>
					<ErrorMessage message={errors?.dates?.message} />
				</View>

				<SelectTransport
					selected={transportField.value}
					onSelect={onSelectTransport}
				/>
			</View>
		</ScreenLayout>
	);
};
