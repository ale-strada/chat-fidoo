import { getMessages } from "@/lib/controllers/messages";

export async function GET(request: Request) {
	const messages = await getMessages();
	return Response.json(messages);
}
