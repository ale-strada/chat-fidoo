import { auth } from "@/lib/firebase";
import { User } from "../models/user";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";

export const signUp = async (name: string, email: string, password: string) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const { uid } = res.user;
		const token = await res.user.getIdToken();
		const user = { name, email, uid };
		const newUser = await User.createNewUser(user);
		console.log(user, token);
		return true;
	} catch (error: any) {
		return error.code;
	}
};
export const signIn = async (name: string, email: string, password: string) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		const { uid } = res.user;
		const token = await res.user.getIdToken();
		const user = { name, email, uid };

		return true;
	} catch (error: any) {
		return error.code;
	}
};

export const resetPassword = async (email: string) => {
	const user = await sendPasswordResetEmail(auth, email);
	return user;
};
