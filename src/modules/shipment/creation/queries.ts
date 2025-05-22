import { QUERY_KEYS } from '@modules/ads/queries';
import { queryClient } from '@shared/api';
import { createAdRequest } from '@shared/api/requests';
import { AdShipmentCreate } from '@shared/schemas/adShipment';
import { useMutation } from '@tanstack/react-query';

export const useCreateShipmentMutation = () => {
	return useMutation({
		mutationFn: (ad: AdShipmentCreate) => createAdRequest(ad),
		onSuccess: async (data) => {
			await queryClient.cancelQueries({ queryKey: QUERY_KEYS.userAds });
			console.log('Ad created successfully:', data);
		},
	});
};
