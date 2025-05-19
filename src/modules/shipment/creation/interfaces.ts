export interface UseStepProps<T> {
	onSubmit: (formData: T) => void;
}
export enum DateType {
	ASAP,
	BY_DATE,
}
