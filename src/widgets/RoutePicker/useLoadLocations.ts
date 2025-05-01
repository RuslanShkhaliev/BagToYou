import { Location } from '@/common/schema';
import { locations } from '@/mock/dbMock';
import { delay } from '@/utils/delay';
import { filterCities } from '@/widgets/RoutePicker/helpers';
import { useState } from 'react';


interface UseLoadLocationsProps {
	onLoad: (locations: Location[]) => void;
}


interface UseLoadLocationsReturn {
	data: Location[];
	loading: boolean;
	fetch: (filter: string) => Promise<Location[]>;
}


export const useLoadLocations = ({ onLoad }: UseLoadLocationsProps): UseLoadLocationsReturn => {
	const [data, setData] = useState<Location[]>([]);
	const [loading, setLoading] = useState(false);

	const fetch = async (filter: string) => {
		setLoading(true);
		await delay(400);
		const result = filterCities(filter, locations);
		setData(result);
		onLoad(result);
		setLoading(false);
		return result;
	};

	return { data, loading, fetch };
};
