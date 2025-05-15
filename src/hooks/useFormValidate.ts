import { useCallback } from 'react';
import { Path, useFormContext } from 'react-hook-form';
import { z } from 'zod';

interface UseFormValidateProps<S extends z.ZodTypeAny> {
	schema: S;
	onSuccess?: (data: z.infer<S>) => void;
}

export const useFormValidate = <S extends z.ZodTypeAny>({
	schema,
	onSuccess,
}: UseFormValidateProps<S>) => {
	console.log(useFormContext<z.infer<S>>(), 'ctx');

	const { control, handleSubmit, setError, clearErrors, formState, ...rest } =
		useFormContext<z.infer<S>>();

	const validateForm = (formData: z.infer<S>) => {
		const { success, error, data } = schema.safeParse(formData);
		clearErrors();

		if (success) {
			onSuccess?.(data);
		} else {
			error.issues.forEach((issue) => {
				setError(issue.path[0] as Path<z.infer<S>>, {
					message: issue.message,
				});
			});
		}
	};

	return {
		handleSubmit: useCallback(handleSubmit(validateForm), [handleSubmit]),
		control,
		clearErrors,
		setError,
		...formState,
		...rest,
	};
};
