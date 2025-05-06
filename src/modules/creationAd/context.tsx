import { CategoryType } from '@/modules/creationAd/flow';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface FormData {
	category?: CategoryType;
	name?: string;
	description?: string;
	images?: string[];
}

interface AdCreationContextType {
	context: FormData;
	updateField: <T, K extends keyof T>(field: K, value: T[K]) => void;
}

type UpdateFieldFn = <T, K extends keyof T>(field: K, value: T[K]) => void;
const AdCreationContext = createContext<AdCreationContextType | null>(null);

export const AdCreationProvider = ({ children }: PropsWithChildren) => {
	const [context, setContext] = useState<FormData>({});
	const updateField: UpdateFieldFn = (field, value) =>
		setContext((prev) => ({ ...prev, [field]: value }));

	return (
		<AdCreationContext.Provider value={{ context, updateField }}>
			{children}
		</AdCreationContext.Provider>
	);
};

export const useAdCreationContext = () => {
	const context = useContext(AdCreationContext);
	if (!context) {
		throw new Error(
			'useAdCreationContext must be used within AdCreationProvider',
		);
	}
	return context;
};
