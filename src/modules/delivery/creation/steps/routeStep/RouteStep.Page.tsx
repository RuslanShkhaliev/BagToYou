import { ScreenView } from '@components/layout';
import { TextThemed } from '@components/ui-kit';
import { useDeliveryStore } from '@modules/delivery';
import { DatePicker } from '@widgets/DatesPicker';
import { RoutePicker } from '@widgets/RoutePicker';
import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Button, Form, YStack } from 'tamagui';
import { z } from 'zod';
import { formRouteSchema } from './schema';
import { useRouteFormContext } from './useRouteFormContext';

export type FormValues = z.infer<typeof formRouteSchema>;

export const RouteStepPage = () => {
	const { updateState } = useDeliveryStore();
	const router = useRouter();
	const { control, onSubmit, setValue, clearErrors } = useRouteFormContext({
		onSubmit: (formData) => {
			updateState(formData);
			router.push('/create/delivery/contacts');
		},
	});

	const onSelectRoute = (route: FormValues['route']) => {
		setValue('route', route, { shouldValidate: true });
		// clearErrors();
	};

	return (
		<ScreenView px={16}>
			<Form
				gap={16}
				onSubmit={onSubmit}
			>
				<YStack gap={16}>
					<TextThemed fontSize={18}>Выберите маршрут направления</TextThemed>
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
				</YStack>
				<YStack gap={16}>
					<TextThemed fontSize={18}>Выберите дату</TextThemed>
					<Controller
						name={'dates'}
						control={control}
						render={({ field }) => <DatePicker dates={field.value} />}
					/>
				</YStack>
				<Form.Trigger asChild>
					<Button>Далее</Button>
				</Form.Trigger>
			</Form>
		</ScreenView>
	);
};
