import { auth } from "@/lib/firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";

export const signUp = async (email: string, password: string) => {
	const user = await createUserWithEmailAndPassword(auth, email, password);
	return user;
};
export const signIn = async (email: string, password: string) => {
	const user = await signInWithEmailAndPassword(auth, email, password);
	return user;
};

export const resetPassword = async (email: string) => {
	const user = await sendPasswordResetEmail(auth, email);
	return user;
};
