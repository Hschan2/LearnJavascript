import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { dataBase, storage } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const useAvatarUpload = (user: any) => {
  const [avatar, setAvatar] = useState(user?.photoURL);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const usersRef = doc(dataBase, "signedUsers", user.uid);

    if (!files || files.length !== 1 || !user) return;

    const file = files[0];
    const locationRef = ref(storage, `avatars/${user.uid}`);
    const result = await uploadBytes(locationRef, file);
    const avatarUrl = await getDownloadURL(result.ref);
    setAvatar(avatarUrl);

    await updateProfile(user, { photoURL: avatarUrl });
    await updateDoc(usersRef, { avatar: avatarUrl });
  };

  return { avatar, onAvatarChange };
};

export default useAvatarUpload;
