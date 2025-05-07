import { locations } from '@shared/api/seed/dbSeed';
import { randomInt } from '@shared/api/seed/helpers';
import { useQuery } from '@tanstack/react-query';
import { delay } from '@utils/delay';
import { filterCities } from '@widgets/RoutePicker/helpers';

const fetchLocations = async (filter: string) => {
	await delay(randomInt({ min: 300, max: 2000 }));
	return filterCities(filter, locations);
};

export const useLoadLocationsQuery = (filter: string) => {
	return useQuery({
		queryKey: ['locations', filter],
		queryFn: () => fetchLocations(filter),
		enabled: !!filter,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
