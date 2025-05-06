import { Href, useRouter } from 'expo-router';

export const useRouteBackward = (pathname?: Href) => {
	const router = useRouter();
	
	const goBack = <T extends Record<string, any>>(params?: T) => {
		if (!pathname) {
			return router.back();
		}
		router.replace(pathname, params);
	}
	
	return { goBack };
	
}
