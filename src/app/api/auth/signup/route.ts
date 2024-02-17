import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const user = await createUserWithEmailAndPassword(
		auth,
		body.email,
		body.password
	);

	return Response.json({ user });
}
