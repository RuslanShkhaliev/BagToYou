import { useFormContext } from 'react-hook-form';
import { UseStepProps } from '../shared/interfaces';
import { parseErrors } from '../shared/utils';
import { formRouteSchema, FormRouteScheme } from './schema';

export const useRouteFormContext = ({
	onSubmit,
}: UseStepProps<FormRouteScheme>) => {
	const {
		control,
		setValue,
		handleSubmit,
		clearErrors,
		setError,
		formState: { errors },
	} = useFormContext<FormRouteScheme>();

	const validateFormData = (formData: FormRouteScheme) => {
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
