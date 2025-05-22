import { useAuth } from '@context/auth.context';

export const useAuthContent = <T,>(
	privateContent: T | (() => T),
	publicContent: T | (() => T),
) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return (privateContent as () => T)?.() ?? privateContent;
	}

	return (publicContent as () => T)?.() ?? publicContent;
};
