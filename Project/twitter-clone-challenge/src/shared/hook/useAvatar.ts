import { useEffect, useState } from "react";
import { auth, dataBase, storage } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { fetchAvatarUrl } from "./fetchAvatarUrl";
import { INITIAL_IMAGE } from "../../constants";
import { UseAvatarOptions } from "../types/avatar";
import { updateDocument } from "../../services/databaseService";

export function useAvatar(options: UseAvatarOptions = {}) {
  const { user = auth.currentUser, enableUpload = false } = options;
  const [avatar, setAvatar] = useState<string>(user?.photoURL ?? INITIAL_IMAGE);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setAvatar(INITIAL_IMAGE);
      setLoading(false);
      return;
    }

    fetchAvatarUrl(user).then((url) => {
      setAvatar(url);
      setLoading(false);
    });

    const userRef = doc(dataBase, "signedUsers", user.uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists() && snap.data().avatar) {
        setAvatar(snap.data().avatar);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const onAvatarChange = enableUpload
    ? async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length || !user) return;

        const file = e.target.files[0];
        const locationRef = ref(storage, `avatars/${user.uid}`);
        const result = await uploadBytes(locationRef, file);
        const avatarUrl = await getDownloadURL(result.ref);

        setAvatar(avatarUrl);

        await updateProfile(user, { photoURL: avatarUrl });

        await updateDocument(["signedUsers", user.uid], {
          avatar: avatarUrl,
        });
      }
    : () => {};

  return { avatar, loading, onAvatarChange };
}
