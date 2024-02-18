import { signIn } from "@/lib/controllers/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const user = await signIn(body.token, body.email, body.password);

	return Response.json(user);
}
