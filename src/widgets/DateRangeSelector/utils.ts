import { DateISOSchema } from '@shared/schema';
import { format } from 'date-fns';

export const formatDate = (date?: DateISOSchema) => {
	if (!date) return null;

	return format(date, 'd MMM, E');
};

export const toISOString = (date?: string) => {
	if (!date) return '';
	return new Date(date).toISOString();
};
export const fromISOString = (date?: string) => {
	if (!date) return '';
	return format(date, 'yyyy-MM-dd');
};
