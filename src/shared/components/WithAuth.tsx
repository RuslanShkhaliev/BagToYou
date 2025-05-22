import { LoadingIndicator } from '@components/LoadingIndicator';
import { useAuth } from '@context/auth.context';

interface WithAuthProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	loading?: React.ReactNode;
}

export const WithAuth = (props: WithAuthProps) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <>{props.loading ?? <LoadingIndicator />}</>;
	}

	return <>{isAuthenticated ? props.children : props.fallback}</>;
};
