import { Location } from '@shared/schema';
import { RouteTargetType } from '@widgets/RoutePicker/types';

export const filterCities = (text: string, list: Location[]): Location[] => {
	if (!text) {
		return [];
	}

	return list.filter((item) =>
		item.city.toLowerCase().startsWith(text.toLowerCase()),
	);
};
export const fromIsActive = (activeInput: RouteTargetType | null) =>
	activeInput === RouteTargetType.From;
export const toIsActive = (activeInput: RouteTargetType | null) =>
	activeInput === RouteTargetType.To;
