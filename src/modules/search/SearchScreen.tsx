import { Location } from '@/common/schema';
import { AppHeader } from '@/components/AppHeader';
import { ScreenScroll } from '@/components/ScreenScroll';
import { ButtonStyled } from '@/components/ui/ButtonStyled';
import { createMockRequests } from '@/mock/helpers';
import { DeliveryRoute } from '@/modules/delivery/store';
import { DatePicker } from '@/widgets/DatesPicker';
import { RoutePicker } from '@/widgets/RoutePicker';
import { CalendarArrowUp } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { YStack } from 'tamagui';

export const SearchScreen = () => {
	const [errors, setErrors] = useState<{ from: string | undefined }>();

	const [route, setRoute] = useState<DeliveryRoute>({
		from: null,
		to: null,
	});
	const [dates, setDates] = useState({ from: '', to: '' });

	const resetErrors = () => {
		setErrors(() => ({ from: undefined }));
	};
	const handleSearch = async () => {
	};

	const updateRoute = (type: 'from' | 'to', location: Location) => {
		resetErrors();
		setRoute((prev) => ({ ...prev, [type]: location }));
	};
	const onChangeDir = () => {
		setRoute((prev) => ({ from: prev.to, to: prev.from }));
	};
	const similarRequests = createMockRequests(10);
	return (
		<>
			<ScreenScroll
				bg={'$bg'}
				pt={30}
			>
				<AppHeader></AppHeader>
				<YStack gap={10}>
					<RoutePicker
						onPick={(route) => {
							setRoute((prev) => ({ ...prev, ...route }));
						}}
						value={route}
					/>
					<DatePicker
						fields={[
							{
								icon: <CalendarArrowUp size={'$1'} />,
								value: dates.from,
								placeholder: 'Departure date',
							},
						]}
					/>
					<ButtonStyled
						onPress={handleSearch}
						primary
					>
						Найти маршруты
					</ButtonStyled>
				</YStack>
			</ScreenScroll>
		</>
	);
};
