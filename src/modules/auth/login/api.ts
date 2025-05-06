import { auth } from '@/lib/firebase/firebase';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

export interface LoginParams {
	email: string;
	password: string;
}
export const login = ({
	email,
	password,
}: LoginParams): Promise<UserCredential> =>
	signInWithEmailAndPassword(auth, email, password);
