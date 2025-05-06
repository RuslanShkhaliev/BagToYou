import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { register as registerApi, RegisterParams } from './api';

export const useRegister = () => {
	const router = useRouter();
	const registerMutation = useMutation({
		mutationFn: registerApi,
		onSuccess: () => {
			router.push('/');
		},
	});

	const register = (data: RegisterParams) => {
		registerMutation.mutate(data);
	};
	return {
		register,
		isPending: registerMutation.isPending,
		error: registerMutation.error,
	};
};
