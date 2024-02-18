// const BASE_URL = "/api";

//const API_URL = "https://api.dbio.education";

//guarda el token de usuario en sessionStorage
export function saveToken(token: string) {
	sessionStorage.setItem("auth-token", token);
}

//busca el token del usuario en sessionStorage
export function getSavedToken() {
	const token = sessionStorage.getItem("auth-token");
	return token;
}

export function getSavedUser() {
	const user = JSON.parse(sessionStorage.getItem("user") || "{}");
	return user;
}
export function deleteToken() {
	sessionStorage.removeItem("auth-token");

	return true;
}

export const LogOut = () => {
	deleteToken();
	sessionStorage.removeItem("user");
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
