import { ZodFormattedError } from 'zod';

export const parseErrors = <T extends object>(
	formattedErrors: ZodFormattedError<T>,
) => {
	const errors: [string, string][] = [];
	const recurcive = ({ _errors, ...rest }: ZodFormattedError<T>, path = '') => {
		if (_errors.length) {
			path ||= 'root';
			errors.push([path, _errors[0]!]);
		} else {
			Object.entries(rest).forEach(([fieldName, errors]) => {
				const normilizedPath = [path, fieldName].filter(Boolean).join('.');
				recurcive(errors, normilizedPath);
			});
		}
	};
	recurcive(formattedErrors);
	return errors;
};
