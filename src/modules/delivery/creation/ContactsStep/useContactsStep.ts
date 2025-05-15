import { useFormContext } from 'react-hook-form';
import { UseStepProps } from '../shared/interfaces';
import { parseErrors } from '../shared/utils';
import { formContactsSchema, FormContactsScheme } from './schema';

export const useContactsStep = ({
	onSubmit,
}: UseStepProps<FormContactsScheme>) => {
	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		formState: { errors },
	} = useFormContext<FormContactsScheme>();

	const validateFormData = (formData: FormContactsScheme) => {
		console.log({ formData });

		const { success, data, error } = formContactsSchema.safeParse(formData);
		if (success) {
			clearErrors();
			onSubmit(data);
			return;
		}

		const errors = parseErrors(error.format());

		errors.forEach(([path, error]) => {
			setError(path, { message: error });
		});
	};
	return {
		setValue,
		control,
		errors,
		onSubmit: handleSubmit(validateFormData),
	};
};
