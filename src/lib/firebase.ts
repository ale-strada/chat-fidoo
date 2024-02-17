// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, browserSessionPersistence } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = process.env.FIREBASE_API_KEY;

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: "chat-fidoo.firebaseapp.com",
	projectId: "chat-fidoo",
	storageBucket: "chat-fidoo.appspot.com",
	messagingSenderId: "861556678322",
	appId: "1:861556678322:web:345ba0d0d5f43876af33ab",
	measurementId: "G-QQZ2MBWLKD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
	persistence: browserSessionPersistence,
	popupRedirectResolver: undefined,
});
