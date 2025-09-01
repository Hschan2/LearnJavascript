import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";
import useAppStore from "./shared/store/useAppStore";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const dataBase = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  useAppStore.getState().setUser(user);
  useAppStore.getState().setIsLoading(false);
});
