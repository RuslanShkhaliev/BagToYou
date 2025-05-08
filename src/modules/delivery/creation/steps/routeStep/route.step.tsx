import { TextThemed } from '@components/ui-kit';
import { ScreenView } from '@layout/ScreenView';
import { useDeliveryStore } from '@modules/delivery';
import { DatePicker } from '@widgets/DatesPicker';
import { RoutePicker } from '@widgets/RoutePicker';
import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Button, Form, View, YStack } from 'tamagui';
import { z } from 'zod';
import { formRouteSchema } from './schema';
import { useRouteStep } from './useRouteStep';
export type FormValues = z.infer<typeof formRouteSchema>;

export const RouteStep = () => {
	const { updateState } = useDeliveryStore();
	const router = useRouter();
	const { control, onSubmit, onSelectRoute, errors } = useRouteStep({
		onSubmit: (formData) => {
			updateState(formData);
			router.push('/create/delivery/contacts');
		},
	});

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
						render={({ field }) => {
							return (
								<View>
									<RoutePicker
										onChange={(route) => {
											onSelectRoute({ ...field.value, ...route });
										}}
										route={field.value}
										errors={{
											matched: errors.route?.message,
											from: errors.route?.from?.message,
											to: errors.route?.to?.message,
										}}
									/>
									{errors.route?.message && (
										<TextThemed
											fontSize={14}
											color={'$error'}
										>
											{errors.route?.message}
										</TextThemed>
									)}
								</View>
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
