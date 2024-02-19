import { initializeApp } from "firebase/app";
import { initializeAuth, browserSessionPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: "chat-fidoo.firebaseapp.com",
	projectId: "chat-fidoo",
	storageBucket: "chat-fidoo.appspot.com",
	messagingSenderId: "861556678322",
	appId: "1:861556678322:web:345ba0d0d5f43876af33ab",
	measurementId: "G-QQZ2MBWLKD",
	databaseURL: "https://chat-fidoo-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
	persistence: browserSessionPersistence,
	popupRedirectResolver: undefined,
});

export const db = getFirestore(app);
export const database = getDatabase(app);
