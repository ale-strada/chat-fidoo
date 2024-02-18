import { firestore } from "../firestore";
import { Model } from "./model";
const collection = firestore.collection("users");

type data = {
	id?: string;
	name: string;
	email: string;
	uid: string;
	userToken: string;
};

type updateData = {
	name?: string;
	email?: string;
	uid?: string;
	userToken?: string;
};
export class User extends Model {
	ref: FirebaseFirestore.DocumentReference;
	data: any;
	id: string;
	constructor(id: string) {
		super(id, collection);
		this.id = id;
		this.ref = collection.doc(id);
	}

	static async createNewUser(id: string, data: data) {
		await collection.doc(id).set(data);

		const newUser = new User(id);
		newUser.data = data;
		return newUser;
	}

	static async updateUser(id: string, data: updateData) {
		const newUser = new User(id);
		newUser.data = data;
		await newUser.ref.update(data);

		return newUser;
	}
	static async findByEmail(email: string) {
		const cleanEmail = email.trim().toLocaleLowerCase();
		const results = await collection.where("email", "==", cleanEmail).get();
		if (results.docs.length) {
			const first = results.docs[0];
			const newUser = new User(first.id);
			newUser.data = first.data();
			return newUser;
		} else {
			return null;
		}
	}

	static async getToken(id: string) {
		try {
			const user = (await new User(id).ref.get()).data();
			const token = user?.userToken;

			return token;
		} catch (error) {
			return false;
		}
	}

	static async findByToken(token: string) {
		const results = await collection.where("userToken", "==", token).get();
		if (results.docs.length) {
			const first = results.docs[0];
			const newUser = new User(first.id);
			newUser.data = first.data();
			return newUser;
		} else {
			return null;
		}
	}
}
