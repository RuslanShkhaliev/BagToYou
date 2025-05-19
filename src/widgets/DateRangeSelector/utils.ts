import { DateSchema } from '@shared/schema';
import { format } from 'date-fns';

export const formatDate = (date?: DateSchema) => {
	if (!date) return null;

	return format(date, 'd MMM, E');
};
