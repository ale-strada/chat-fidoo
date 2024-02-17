import { signUp } from "../../controllers/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const user = await signUp(body.email, body.password);

	return Response.json({ user });
}
