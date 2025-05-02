import { useSearchCitiesStore } from '@/modals/CitiesSearch/store';
import { CitiesList } from '@/widgets/RoutePicker/CitiesList';
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import React from 'react';

export const CitiesSearchModal = () => {

	const router = useRouter();

	const {} = useSearchParams();

	const { cities, setLocation } = useSearchCitiesStore();
	return (
		<CitiesList
			onSelect={setLocation}
			cities={cities}
		/>
	);
};
