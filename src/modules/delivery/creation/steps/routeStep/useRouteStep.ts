import { useFormContext } from 'react-hook-form';
import { FormValues } from './route.step';
import { formRouteSchema } from './schema';

interface UseRouteStepProps {
	onSubmit: (formData: FormValues) => void;
}
export const useRouteStep = ({ onSubmit }: UseRouteStepProps) => {
	const {
		control,
		setValue,
		handleSubmit,
		clearErrors,
		setError,
		formState: { errors },
	} = useFormContext<FormValues>();

	const onSelectRoute = (route: FormValues['route']) => {
		setValue('route', route);
		clearErrors();
	};
	const validateFormData = (formData: FormValues) => {
		const { success, error, data } = formRouteSchema.safeParse(formData);

		clearErrors();
		if (!success) {
			const errors = error?.format();
			console.log({ success, errors, data });

			[
				['route', errors?.route?._errors],
				['route.from', errors?.route?.from?._errors],
				['route.to', errors?.route?.to?._errors],
			].forEach(([fieldName, errs]) => {
				if (errs?.length) {
					setError(fieldName as never, {
						type: 'manual',
						message: errs[0],
					});
				}
			});

			return;
		}

		onSubmit(data);
	};

	return {
		errors,
		control,
		setValue,
		onSubmit: handleSubmit(validateFormData),
		onSelectRoute,
	};
};
