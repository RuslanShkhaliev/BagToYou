import { Redirect } from 'expo-router';

export default function AuthRedirectLogin() {
	return <Redirect href={'/auth/login'} />;
}
