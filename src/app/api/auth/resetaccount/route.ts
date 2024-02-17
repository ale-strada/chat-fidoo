import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// const emailAddress = "correo@ejemplo.com";

// sendPasswordResetEmail(auth, emailAddress)
// 	.then(() => {
// 		// Correo electrónico de restablecimiento de contraseña enviado con éxito
// 		console.log(
// 			"Correo electrónico de restablecimiento de contraseña enviado con éxito"
// 		);
// 	})
// 	.catch((error) => {
// 		// Se produjo un error al enviar el correo electrónico de restablecimiento de contraseña
// 		console.error(error.message);
// 	});

export async function POST(request: Request) {
	const body = await request.json();
	const email = await sendPasswordResetEmail(auth, body.email);

	return Response.json({ email });
}
