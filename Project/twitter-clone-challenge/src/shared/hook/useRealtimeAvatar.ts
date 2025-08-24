import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { getSafeAvatar } from "./getSafeAvatar";
import { auth } from "../../firebase";

export function useRealtimeAvatar() {
  const [avatar, setAvatar] = useState<string>(getSafeAvatar());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setAvatar(getSafeAvatar(user.photoURL));
      } else {
        setAvatar(getSafeAvatar());
      }
    });
    return () => unsubscribe();
  }, []);

  return avatar;
}
