import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnGlijVLHvWsF7VNxIf4mw4X_NHJmm84E",
  authDomain: "twitter-clone-challenge.firebaseapp.com",
  projectId: "twitter-clone-challenge",
  storageBucket: "twitter-clone-challenge.appspot.com",
  messagingSenderId: "1053362560070",
  appId: "1:1053362560070:web:7d906ef753f1da8c5efe47",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
