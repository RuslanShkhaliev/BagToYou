import { DateRangeSchema } from '@shared/schemas';
import { useReducer } from 'react';

type DateRangeAction =
	| { type: 'setStartDate'; date: string }
	| { type: 'setEndDate'; date: string }
	| { type: 'clear' };

const dateRangeReducer = (state: DateRangeSchema, action: DateRangeAction) => {
	switch (action.type) {
		case 'setStartDate':
			if (state.endDate && action.date > state.endDate) {
				return { startDate: action.date, endDate: '' };
			}
			return {
				...state,
				startDate: action.date,
			};
		case 'setEndDate':
			if (state.startDate && action.date < state.startDate) {
				return { startDate: '', endDate: action.date };
			}
			return {
				...state,
				endDate: action.date,
			};
		case 'clear':
			return {
				startDate: '',
				endDate: '',
			};
	}
};

export const useDateRangeReducer = (initialDates: DateRangeSchema) => {
	const [dates, dispatch] = useReducer(dateRangeReducer, initialDates);

	const setStartDate = (date: string) => {
		dispatch({ type: 'setStartDate', date });
	};

	const setEndDate = (date: string) => {
		dispatch({ type: 'setEndDate', date });
	};
	const clearDates = () => {
		dispatch({ type: 'clear' });
	};

	return { dates, setStartDate, setEndDate, clearDates };
};
