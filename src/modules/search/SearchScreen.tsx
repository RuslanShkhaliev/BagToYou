import { LayoutScreen } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { createMockRequests } from '@shared/api/seed/helpers';
import { DateRangeSelector } from '@widgets/DateRangeSelector';
import { LocationSelector } from '@widgets/LocationSelector';
import { useState } from 'react';
import { DateRangeSchema, RouteSchema } from 'src/shared/schemas';
import { YStack } from 'tamagui';

export const SearchScreen = () => {
	const [errors, setErrors] = useState<{ from: string; to: string }>({
		from: '',
		to: '',
	});
	const [route, setRoute] = useState<RouteSchema>({
		from: {
			city: '',
		},
		to: {
			city: '',
		},
	});
	const [dates, setDates] = useState<DateRangeSchema>({
		startDate: '',
		endDate: '',
	});

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
		<LayoutScreen
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
					range
					date={dates}
					onChange={(dates) => setDates(dates)}
				/>
			</YStack>
			<ButtonStyled
				onPress={handleSearch}
				variant={'primary'}
			>
				Найти маршруты
			</ButtonStyled>
		</LayoutScreen>
	);
};
