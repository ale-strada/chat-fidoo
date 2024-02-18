import { signIn } from "@/lib/controllers/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const user = await signIn(body.email, body.password);
	if (user === "auth/invalid-credential") {
		return new Response(JSON.stringify({ error: "Invalid credentials" }), {
			status: 401,
		});
	}

	return Response.json(user);
}
