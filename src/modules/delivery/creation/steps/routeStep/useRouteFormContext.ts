import { useFormContext } from 'react-hook-form';
import { UseStepProps } from '../shared/interfaces';
import { parseErrors } from '../shared/utils';
import { FormValues } from './RouteStep.Page';
import { formRouteSchema } from './schema';

export const useRouteStep = ({ onSubmit }: UseStepProps<FormValues>) => {
	const {
		control,
		setValue,
		handleSubmit,
		clearErrors,
		setError,
		formState: { errors },
	} = useFormContext<FormValues>();

	const validateFormData = (formData: FormValues) => {
		const { success, error, data } = formRouteSchema.safeParse(formData);

		clearErrors();
		if (!success) {
			const errors = parseErrors(error?.format());

			errors.forEach(([fieldName, error]) => {
				setError(fieldName as never, { message: error });
			});

			return;
		}

		onSubmit(data);
	};

	return {
		errors,
		control,
		setValue,
		clearErrors,
		onSubmit: handleSubmit(validateFormData),
	};
};
