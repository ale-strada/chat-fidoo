import { signUp } from "../../../../lib/controllers/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const user = await signUp(body.name, body.email, body.password);
	if (!user.name && !user.email && !user.password) {
		return new Response(JSON.stringify({ error: "user already exists" }), {
			status: 401,
		});
	}

	return Response.json(user);
}
