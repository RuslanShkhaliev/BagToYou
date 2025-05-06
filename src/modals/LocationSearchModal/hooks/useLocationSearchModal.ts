import { LocationSearchModalParams } from '@/modals/LocationSearchModal/LocationSearchModal';
import { Href, useRouter } from 'expo-router';

export const useLocationSearchModal = () => {
	const router = useRouter();
	const openModal = (
		pathname: Href,
		params?: Partial<LocationSearchModalParams>,
	) => {
		router.push({
			pathname,
			params,
		});
	};

	return {
		openModal,
	};
};
