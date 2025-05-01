import { Location } from '@/common/schema';
import { ActiveInputType } from '@/widgets/RoutePicker/types';

export const filterCities = (text: string, list: Location[]): Location[] => {
	if (!text) {
		return [];
	}

	return list.filter((item) =>
		item.city.toLowerCase().startsWith(text.toLowerCase()),
	);
};
export const fromIsActive = (activeInput: ActiveInputType | null) => activeInput === ActiveInputType.From;
export const toIsActive = (activeInput: ActiveInputType | null) => activeInput === ActiveInputType.To;
