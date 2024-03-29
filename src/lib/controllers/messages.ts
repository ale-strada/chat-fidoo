import { Message } from "../models/message";
import { getUserByToken, verifyToken } from "../controllers/auth";

export const verifyUserAccess = async (token: string) => {
	const user = await getUserByToken(token);
	// compare current token with user token in database
	const haveAccess = await verifyToken(token, user?.uid);

	return { haveAccess, user };
};

export const createNewMessage = async (text: string, token: string) => {
	const { haveAccess, user } = await verifyUserAccess(token);

	if (!haveAccess) {
		return { error: "Unauthorized" };
	} else {
		const newMessage = await Message.createNewMessage({
			text,
			author: user.name,
			createdAt: new Date(),
		});
		return { success: "Message created" };
	}
};
