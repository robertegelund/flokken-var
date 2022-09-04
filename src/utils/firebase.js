import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import { FIREBASE_API_KEY, FIREBASE_MESSAGE_ID, FIREBASE_APP_ID } from "./config";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "flokken-b3631.firebaseapp.com",
  databaseURL: "https://flokken-b3631.firebaseio.com",
  projectId: "flokken-b3631",
  storageBucket: "flokken-b3631.appspot.com",
  messagingSenderId: FIREBASE_MESSAGE_ID,
  appId: FIREBASE_APP_ID
};

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = firebase.analytics()
  export const db = firebase.firestore();
  export const storage = firebase.storage()
  export const timestamp = firebase.firestore.FieldValue.serverTimestamp();