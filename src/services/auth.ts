import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const register = (
	email: string,
	password: string,
): Promise<UserCredential> =>
	createUserWithEmailAndPassword(auth, email, password);

export const login = (
	email: string,
	password: string,
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

export const logout = (): Promise<void> => signOut(auth);
