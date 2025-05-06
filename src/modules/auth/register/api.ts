import { auth } from '@/lib/firebase/firebase';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';

export interface RegisterParams {
	email: string;
	password: string;
}
export const register = ({
	email,
	password,
}: RegisterParams): Promise<UserCredential> =>
	createUserWithEmailAndPassword(auth, email, password);
