import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const user = await signInWithEmailAndPassword(
		auth,
		body.email,
		body.password
	);

	return Response.json({ user });
}
