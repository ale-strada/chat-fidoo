import { atom, selector } from "recoil";
import { getSavedUser } from "./api";

export const currentUserAtom = atom({
	key: "currentUser", // Clave única para el átomo
	default: { uid: "", name: "", email: "", userToken: "" }, // Valor predeterminado del átomo
});

export const currentUserState = selector({
	key: "currentUserState",
	get: ({ get }) => {
		const user = get(currentUserAtom);

		if (user.name && user.email && user.uid && user.userToken) {
			return user;
		} else {
			const savedUser = getSavedUser();
			return savedUser;
		}
	},
});

export const chatsAtom = atom({
	key: "Chats",
	default: [],
});
