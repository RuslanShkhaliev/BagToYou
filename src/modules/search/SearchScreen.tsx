import { ScreenScroll } from '@/components/ScreenScroll';
import { ButtonLink } from '@/components/ui/buttons/ButtonLink';
import { ButtonStyled } from '@/components/ui/buttons/ButtonStyled';
import { RouteSelection } from '@/modules/delivery/store';
import { createMockRequests } from '@/seed/helpers';
import { DatePicker } from '@/widgets/DatesPicker';
import { RoutePicker } from '@/widgets/RoutePicker';
import { CalendarArrowUp } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { YStack } from 'tamagui';

export const SearchScreen = () => {
	const [errors, setErrors] = useState<{ from: string; to: string }>({
		from: '',
		to: '',
	});
	const [route, setRoute] = useState<RouteSelection>({
		from: null,
		to: null,
	});
	const [dates, setDates] = useState({ from: '', to: '' });

	const resetErrors = () => {
		setErrors(() => ({ from: '', to: '' }));
	};
	const handleSearch = async () => {};

	const updateRoute = (route: RouteSelection) => {
		resetErrors();
		setRoute((prev) => ({ ...prev, ...route }));
	};
	const similarRequests = createMockRequests(10);
	return (
		<ScreenScroll
			bg={'$bg'}
			pt={30}
		>
			<ButtonLink href='/(auth)/login'>Login</ButtonLink>
			<YStack gap={10}>
				<RoutePicker
					onChange={updateRoute}
					route={route}
					errors={errors}
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
	);
};
