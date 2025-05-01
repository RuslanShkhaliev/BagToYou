import { Location } from '@/common/schema';

export const filterCities = (text: string, list: Location[]): Location[] => {
	if (!text) {
		return [];
	}

	return list.filter((item) =>
		item.city.toLowerCase().startsWith(text.toLowerCase()),
	);
};
