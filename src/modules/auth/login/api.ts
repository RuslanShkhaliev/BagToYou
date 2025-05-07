import {
	auth,
	signInWithEmailAndPassword,
	UserCredential,
} from '@lib/firebase';

export interface LoginParams {
	email: string;
	password: string;
}

export const login = ({
	email,
	password,
}: LoginParams): Promise<UserCredential> =>
	signInWithEmailAndPassword(auth, email, password);
