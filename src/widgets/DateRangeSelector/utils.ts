import { DateISOSchema } from '@shared/schemas';
import { format } from 'date-fns';

export const formatDate = (date?: DateISOSchema) => {
	if (!date) {
		return null;
	}

	return format(date, 'd MMM, E');
};

export const toISO = (date?: string | null) => {
	if (!date) {
		return '';
	}
	return new Date(date).toISOString();
};
export const parseISO = (date?: string | null) => {
	if (!date) {
		return '';
	}
	return format(date, 'yyyy-MM-dd');
};
