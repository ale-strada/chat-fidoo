import { firestore } from "../firestore";
import { Model } from "./model";

const collection = firestore.collection("messages");

type message = {
	author: string;
	text: string;
};

export class Message extends Model {
	ref: FirebaseFirestore.DocumentReference;
	data: any;
	id: string;
	constructor(id: string) {
		super(id, collection);
		this.id = id;
		this.ref = collection.doc(id);
	}

	static async createNewMessage(message: message) {
		const newMessageSnap = await collection.add(message);
		const newMessage = new Message(newMessageSnap.id);
		newMessage.data = message;
		return newMessage;
	}

	static async getMessages() {
		collection.onSnapshot(
			(querySnapshot) => {
				const messages: any = [];
				querySnapshot.docChanges().forEach((snap) => {
					const data = snap.doc.data();
					messages.push(data);
				});
				return messages;
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
