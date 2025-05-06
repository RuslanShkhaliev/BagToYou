import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { login as loginApi, LoginParams } from './api';

export const useLoginQuery = () => {
	const router = useRouter();
	const loginMutation = useMutation({
		mutationFn: loginApi,
		onSuccess: () => {
			router.push('/');
		},
	});

	const login = (data: LoginParams) => {
		loginMutation.mutate(data);
	};
	return {
		login,
		isPending: loginMutation.isPending,
		error: loginMutation.error,
	};
};
