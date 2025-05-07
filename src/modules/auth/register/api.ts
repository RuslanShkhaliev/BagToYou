import {
	auth,
	createUserWithEmailAndPassword,
	UserCredential,
} from '@lib/firebase';

export interface RegisterParams {
	email: string;
	password: string;
}

export const register = ({
	email,
	password,
}: RegisterParams): Promise<UserCredential> =>
	createUserWithEmailAndPassword(auth, email, password);
