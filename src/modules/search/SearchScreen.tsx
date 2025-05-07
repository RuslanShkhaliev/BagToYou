import { ButtonStyled } from '@components/ui-kit';
import { RouteSelection } from '@modules/delivery/store';
import { createMockRequests } from '@shared/api/seed/helpers';
import { CalendarArrowUp, ShoppingBag } from '@tamagui/lucide-icons';
import { DatePicker } from '@widgets/DatesPicker';
import { RoutePicker } from '@widgets/RoutePicker';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

export const SearchScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerTitle: 'Поиск по маршруту',
			headerTitleStyle: {
				textAlign: 'center',
				fontWeight: 'bold',
			},
			headerLeft: () => <ButtonStyled>Hello</ButtonStyled>,
			searchBarEnabled: true,
			headerRight: () => (
				<ButtonStyled variant='ghost'>
					<ShoppingBag color='$textPrimary' />
				</ButtonStyled>
			),
		});
	}, [navigation]);

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
		<>
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
		</>
	);
};
