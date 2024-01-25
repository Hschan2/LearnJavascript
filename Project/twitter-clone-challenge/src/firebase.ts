import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "twitter-clone-challenge.firebaseapp.com",
  projectId: "twitter-clone-challenge",
  storageBucket: "twitter-clone-challenge.appspot.com",
  messagingSenderId: "1053362560070",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const dateBase = getFirestore(app);
