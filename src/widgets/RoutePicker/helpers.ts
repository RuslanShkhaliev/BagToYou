import { Location } from '@/shared/schema';
import { InputTargetType } from '@/widgets/RoutePicker/types';

export const filterCities = (text: string, list: Location[]): Location[] => {
	if (!text) {
		return [];
	}

	return list.filter((item) =>
		item.city.toLowerCase().startsWith(text.toLowerCase()),
	);
};
export const fromIsActive = (activeInput: InputTargetType | null) =>
	activeInput === InputTargetType.From;
export const toIsActive = (activeInput: InputTargetType | null) =>
	activeInput === InputTargetType.To;
