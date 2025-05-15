import { ScreenLayout } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { createMockRequests } from '@shared/api/seed/helpers';
import { RouteSchema } from '@shared/schema';
import { DateRangeSelector } from '@widgets/DateRangeSelector';
import { LocationSelector } from '@widgets/LocationSelector';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { YStack } from 'tamagui';

export const SearchScreen = () => {
	const [errors, setErrors] = useState<{ from: string; to: string }>({
		from: '',
		to: '',
	});
	const [route, setRoute] = useState<RouteSchema>({
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

	const updateRoute = (route: RouteSchema) => {
		resetErrors();
		setRoute((prev) => ({ ...prev, ...route }));
	};
	const similarRequests = createMockRequests(10);
	return (
		<ScreenLayout
			gap={20}
			pt={50}
		>
			<YStack gap={12}>
				<LocationSelector
					onChange={updateRoute}
					route={route}
					errors={errors}
				/>
				<DateRangeSelector
					dates={dates}
					onChange={(dates) => setDates(dates)}
				/>
			</YStack>
			<ButtonStyled
				onPress={handleSearch}
				variant={'primary'}
			>
				Найти маршруты
			</ButtonStyled>
		</ScreenLayout>
	);
};
