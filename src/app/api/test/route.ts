import { app } from "@/lib/firebase";

export async function GET(request: Request) {
	console.log(app, "NAME");
	return Response.json({ message: "Hello, Next.js!" });
}
