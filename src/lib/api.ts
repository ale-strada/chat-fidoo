// const BASE_URL = "/api";

//const API_URL = "https://api.dbio.education";

//guarda el token de usuario en localStorage
export function saveToken(token: string) {
	localStorage.setItem("auth-token", token);
}

//busca el token del usuario en localStorage
export function getSavedToken() {
	const token = localStorage.getItem("auth-token");
	return token;
}

export function saveUser(user: any) {
	localStorage.setItem("user", JSON.stringify(user));
}
export function getSavedUser() {
	if (typeof window !== "undefined") {
		// El código aquí se ejecutará solo en el lado del cliente
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		return user;
	}
}
export function deleteToken() {
	localStorage.removeItem("auth-token");

	return true;
}

export const LogOut = () => {
	deleteToken();
	localStorage.removeItem("user");
};

export async function fetchAPI(input: RequestInfo, options: any) {
	const url = input;
	const token = getSavedToken();

	options = options || {};
	const newOptions: any = options || {};
	newOptions.headers = newOptions.headers || {};
	newOptions.headers["Content-Type"] = "application/json";
	newOptions.timeout = newOptions.timeout || 0;

	if (token) {
		newOptions.headers.Authorization = token;
	}

	if (newOptions.body) {
		newOptions.body = JSON.stringify(newOptions.body);
	}

	const res = await fetch(url, newOptions);

	if (res.status >= 200 && res.status < 300) {
		if (await res.json) {
			return await res.json();
		}
	} else {
		throw {
			message: "Hay un error con el fetch",
			status: res.status,
			res: res,
		};
	}
}

interface UserData {
	name?: string;
	password: string;
	email: string;
}

export const signIn = async (data: UserData) => {
	return fetchAPI("/api/auth/signin", {
		method: "POST",
		body: { ...data },
	});
};

export const signUp = async (data: UserData) => {
	return fetchAPI("/api/auth/signup", {
		method: "POST",
		body: { ...data },
	});
};

export const resetPassword = async (email: string) => {
	return fetchAPI("/api/auth/resetpassword", {
		method: "POST",
		body: { email },
	});
};

export const createNewMessage = async (text: string) => {
	return fetchAPI("/api/messages/new", {
		method: "POST",
		body: { text },
	});
};
