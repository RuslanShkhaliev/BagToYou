import { createAdRequest } from '@shared/api/requests';
import { AdDeliveryCreate } from '@shared/schemas/adDelivery';
import { useMutation } from '@tanstack/react-query';

export const useCreateAdDeliveryMutation = () => {
	return useMutation({
		mutationFn: (ad: AdDeliveryCreate) => createAdRequest(ad),
		onSuccess: (data) => {
			console.log('Ad created successfully:', data);
		},
	});
};
