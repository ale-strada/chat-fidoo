import { createNewMessage } from "@/lib/controllers/messages";

export async function POST(request: Request) {
	const body = await request.json();
	const text = body.text;
	const auth = request.headers.get("Authorization");

	const newMessage = await createNewMessage(body.text, auth as string);
	return Response.json(newMessage);
}
