import { format } from 'date-fns';

export const formatDate = (date: string) => {
	try {
		return format(date, 'd MMM, E');
	} catch (_error: unknown) {
		throw new Error('Invalid date format');
	}
};
