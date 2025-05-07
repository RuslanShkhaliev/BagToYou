import { TextThemed } from '@components/ui-kit';
import { ScreenLayout } from '@layout/ScreenLayout';
import { useDeliveryStore } from '@modules/delivery';
import { DatePicker } from '@widgets/DatesPicker';
import { RoutePicker } from '@widgets/RoutePicker';
import { Form, YStack } from 'tamagui';

export const SelectRouteAndDates = () => {
	const { route, updateState, updateField, date } = useDeliveryStore();
	const setDate = () => {
		updateField('date', new Date());
	};
	const onReverse = () => {
		updateField('route', { from: route.to, to: route.from });
	};

	return (
		<ScreenLayout hideHeader>
			<Form gap={16}>
				<YStack gap={16}>
					<TextThemed fontSize={18}>Выберите маршрут направления</TextThemed>
					<RoutePicker
						onReverse={onReverse}
						onlyTo
						modalHref={'/delivery-search-location'}
						from={{
							value: route.from?.city,
							error: '',
						}}
						to={{
							value: route.to?.city,
							error: '',
						}}
					/>
				</YStack>
				<YStack gap={16}>
					<TextThemed fontSize={18}>Выберите дату</TextThemed>
					<DatePicker dates={[date]} />
				</YStack>
			</Form>
		</ScreenLayout>
	);
};
