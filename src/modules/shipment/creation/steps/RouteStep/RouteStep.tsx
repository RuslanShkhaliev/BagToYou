import { FloatAction } from '@components/FloatAction';
import { ScreenLayout } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { RouteSchema } from '@shared/schema/location';
import { DateRangeSelector } from '@widgets/DateRangeSelector';
import { LocationSelector } from '@widgets/LocationSelector';
import { useNavbar } from '@widgets/Navbar';
import { Controller } from 'react-hook-form';
import { View } from 'tamagui';
import { useFormRouteStep } from './hooks/useFormRoute';

export const RouteStep = () => {
	useNavbar({
		title: 'Заполните данные о маршруте',
	});

	const { control, handleSubmit, errors, onSelectRoute, onSelectDates } =
		useFormRouteStep();

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
				<Controller
					control={control}
					name={'route'}
					render={({ field }) => (
						<LocationSelector
							onChange={(route) => {
								onSelectRoute({
									...field.value,
									...route,
								} as RouteSchema);
							}}
							route={field.value}
							error={errors?.route?.message}
							errors={{
								from: errors?.route?.from?.message,
								to: errors?.route?.to?.message,
							}}
						/>
					)}
				/>
				<Controller
					name={'dates'}
					control={control}
					render={({ field }) => (
						<DateRangeSelector
							dates={[
								field.value.from || '',
								field.value.to || '',
							]}
							onChange={onSelectDates}
						/>
					)}
				/>
			</View>
		</ScreenLayout>
	);
};
