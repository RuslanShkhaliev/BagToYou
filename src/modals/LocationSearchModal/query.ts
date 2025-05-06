import { locations } from '@/seed/dbSeed';
import { randomInt } from '@/seed/helpers';
import { delay } from '@/shared/utils/delay';
import { filterCities } from '@/widgets/RoutePicker/helpers';
import { useQuery } from 'react-query';

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
