import { verifyToken } from "@/lib/controllers/auth";

export async function GET(request: Request) {
	return Response.json({ message: "Hello, Next.js!" });
}
