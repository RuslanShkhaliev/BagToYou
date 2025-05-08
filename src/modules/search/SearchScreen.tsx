import { ButtonStyled } from '@components/ui-kit';
import { ScreenView } from '@layout/ScreenView';
import { RouteSelection } from '@modules/delivery/store';
import { createMockRequests } from '@shared/api/seed/helpers';
import { DatePicker } from '@widgets/DatesPicker';
import { RoutePicker } from '@widgets/RoutePicker';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
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

	const navigation = useNavigation();
	useEffect(() => {
		console.log(navigation);
		navigation.setOptions({
			headerShown: true,
			headerTitle: 'Search true',
		});
	}, [navigation]);

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
		<ScreenView
			gap={20}
			pt={50}
			px={12}
		>
			<YStack gap={12}>
				<RoutePicker
					onChange={updateRoute}
					route={route}
					errors={errors}
				/>
				<DatePicker />
			</YStack>
			<ButtonStyled
				onPress={handleSearch}
				primary
			>
				Найти маршруты
			</ButtonStyled>
		</ScreenView>
	);
};
