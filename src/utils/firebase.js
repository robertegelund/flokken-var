import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "flokken-b3631.firebaseapp.com",
  databaseURL: "https://flokken-b3631.firebaseio.com",
  projectId: "flokken-b3631",
  storageBucket: "flokken-b3631.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGE_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const timestamp = serverTimestamp;
export const auth = getAuth(app);

// Visitors are signed in anonymously (no login UI) so Firestore/Storage rules
// can tell "this browser created this document" without a real account system.
export const klarTilInnlogging = signInAnonymously(auth).catch((error) => {
  console.error("Anonym innlogging feilet:", error);
});
