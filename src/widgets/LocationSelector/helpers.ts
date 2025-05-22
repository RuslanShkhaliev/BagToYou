import { RouteTargetType } from '@widgets/LocationSelector/types';
import { LocationSchema } from 'src/shared/schemas';

export const filterCities = (
	text: string,
	list: LocationSchema[],
): LocationSchema[] => {
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
