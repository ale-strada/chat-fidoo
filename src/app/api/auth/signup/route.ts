import { signUp } from "../../../../lib/controllers/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const user = await signUp(body.name, body.email, body.password);

	return Response.json(user);
}
