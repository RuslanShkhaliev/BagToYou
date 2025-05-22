import { format } from 'date-fns';
import { DateISOSchema } from 'src/shared/schemas';

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
