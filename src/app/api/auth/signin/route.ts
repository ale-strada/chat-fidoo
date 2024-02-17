import { signIn } from "@/app/api/controllers/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const user = await signIn(body.email, body.password);

	return Response.json({ user });
}
