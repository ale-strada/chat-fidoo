import { Message } from "../models/message";
import { getUserByToken, verifyToken } from "../controllers/auth";

export const verifyUserAccess = async (token: string) => {
	const user = await getUserByToken(token);
	const haveAccess = verifyToken(token, user?.uid);

	return { haveAccess, user };
};

export const createNewMessage = async (text: string, token: string) => {
	const { haveAccess, user } = await verifyUserAccess(token);

	if (!haveAccess) {
		return null;
	} else {
		const newMessage = await Message.createNewMessage({
			text,
			author: user.name,
		});
		return newMessage;
	}
};

export const getMessages = async () => {
	const messages = await Message.getMessages();
	console.log(messages, "MESSAGES");

	return messages;
};
