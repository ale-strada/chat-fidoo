import { resetPassword } from "../../controllers/auth";

export async function POST(request: Request) {
	const body = await request.json();
	const email = await resetPassword(body.email);

	return Response.json({ email });
}
