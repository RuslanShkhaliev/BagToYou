import { auth, onAuthStateChanged, User } from '@lib/firebase';
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

interface AuthContextType {
	user: User | null;
	userId: string | null;
	loading: boolean;
	isReady: boolean;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	userId: null,
	loading: false,
	isReady: false,
	isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [isReady, setReady] = useState(false);

	const isAuthenticated = useMemo(
		() => isReady && Boolean(user),
		[isReady, user],
	);

	const onLoading = (loading: boolean) => {
		setLoading(loading);
		setReady(!loading);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			console.log(firebaseUser, 'user');
			onLoading(false);
		});
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				isReady,
				userId: user?.uid || null,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
};
