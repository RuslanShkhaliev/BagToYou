import { auth } from '@/lib/firebase/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth';

export const register = (
	email: string,
	password: string,
): Promise<UserCredential> =>
	createUserWithEmailAndPassword(auth, email, password);

export const login = (
	email: string,
	password: string,
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);
