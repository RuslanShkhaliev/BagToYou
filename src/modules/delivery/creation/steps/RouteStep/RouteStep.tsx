import { FloatAction } from '@components/FloatAction';
import { ScreenLayout } from '@components/layout';
import { ButtonStyled, ErrorMessage } from '@components/ui-kit';
import { ROUTES_DELIVERY } from '@modules/delivery/routes';
import { DeliveryState, useDeliveryStore } from '@modules/delivery/store';
import { TransportType } from '@shared/enums';
import { locationSchema } from '@shared/schema';
import { parseErrors } from '@utils/parseZodErrors';
import { DateRangeSelector } from '@widgets/DateRangeSelector';
import { LocationSelector } from '@widgets/LocationSelector';
import { useNavbar } from '@widgets/Navbar';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Heading, View } from 'tamagui';
import { z } from 'zod';
import { SelectTransport } from './SelectTransport';

const formRouteSchema = z.object({
	route: z.object({
		from: locationSchema.refine((val) => !!val.city, {
			message: 'Укажите откуда',
		}),
		to: locationSchema.refine((val) => !!val.city, {
			message: 'Укажите куда',
		}),
	}),
	dates: z.array(z.string().datetime()).nonempty({
		message: 'Пожалуйста, укажите даты поездки',
	}),
	transport: z.nativeEnum(TransportType),
});

export const RouteStepPage = () => {
	const { updateState } = useDeliveryStore();
	const router = useRouter();

	const { control, handleSubmit, setValue, setError, clearErrors } =
		useFormContext<DeliveryState>();

	useNavbar({
		title: 'Заполните данные о маршруте',
	});

	const onSubmit = handleSubmit((formData) => {
		const { success, data, error } = formRouteSchema.safeParse(formData);

		clearErrors();

		if (!success) {
			const errors = parseErrors(error?.format());
			console.log(errors, 'error');

			errors.forEach(([path, error]) => {
				setError(path as never, { message: error });
			});

			return;
		}

		updateState(data);
		router.push(ROUTES_DELIVERY.CREATE.DETAILS);
	});

	return (
		<ScreenLayout
			flex={1}
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
					render={({ field, fieldState: { error } }) => (
						<LocationSelector
							onChange={(route) => {
								setValue('route', { ...field.value, ...route });
							}}
							route={field.value}
							error={error?.message}
							errors={{
								from: error?.from?.message,
								to: error?.to?.message,
							}}
						/>
					)}
				/>
				<Controller
					name={'dates'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<View>
							<Heading
								color={'$textPrimary'}
								fontSize={20}
							>
								Выберите даты поездки
							</Heading>
							<DateRangeSelector dates={field.value} />
							<ErrorMessage message={error?.message} />
						</View>
					)}
				/>

				<Controller
					control={control}
					name={'transport'}
					render={({ field }) => (
						<SelectTransport
							selected={field.value}
							onSelect={(value) => {
								setValue('transport', value);
							}}
						/>
					)}
				/>
			</View>
		</ScreenLayout>
	);
};
