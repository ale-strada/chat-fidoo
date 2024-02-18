import { auth } from "@/lib/firebase";
import { User } from "../models/user";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";

function removeBearer(token: string) {
	return token.split(" ")[1];
}
export const getUserByToken = async (token: string) => {
	try {
		const cleanToken = removeBearer(token);
		const user = await User.findByToken(cleanToken);

		return user?.data;
	} catch (error: any) {
		return false;
	}
};
export const verifyToken = async (token: string, uid: string) => {
	try {
		const userToken = await User.getToken(uid);
		const cleanToken = removeBearer(token);

		return JSON.stringify(cleanToken) === JSON.stringify(userToken);
	} catch (error: any) {
		return false;
	}
};
export const signUp = async (name: string, email: string, password: string) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const { uid } = res.user;
		const token = await res.user.getIdToken();
		const user = { name, email, uid, userToken: token };
		const newUser = await User.createNewUser(uid, user);

		return true;
	} catch (error: any) {
		return error.code;
	}
};
export const signIn = async (name: string, email: string, password: string) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		const user = res.user;
		const token = await res.user.getIdToken();
		const UpdateToken = await User.updateUser(user.uid, { userToken: token });

		return true;
	} catch (error: any) {
		return error.code;
	}
};

export const resetPassword = async (email: string) => {
	const user = await sendPasswordResetEmail(auth, email);
	return user;
};
