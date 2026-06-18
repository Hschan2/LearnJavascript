import { useEffect, useState } from "react";
import { auth, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { INITIAL_IMAGE } from "../../constants";
import { UseAvatarOptions } from "../types/avatar";
import { UserService } from "../../services/userService";
import useAppStore from "../store/useAppStore";

export function useAvatar(options: UseAvatarOptions = {}) {
  const { user = auth.currentUser, enableUpload = false } = options;
  const setProfileCache = useAppStore((state) => state.setProfileCache);
  const [avatar, setAvatar] = useState<string>(user?.photoURL ?? INITIAL_IMAGE);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setAvatar(INITIAL_IMAGE);
      setLoading(false);
      return;
    }

    // 초기 데이터 로드
    UserService.getUserData(user.uid).then((data) => {
      if (data && data.avatar) {
        setAvatar(data.avatar);
        setProfileCache(user.uid, data.avatar);
      }
      setLoading(false);
    });

    // 실시간 구독
    const unsubscribe = UserService.subscribeToUser(user.uid, (data) => {
      if (data && data.avatar) {
        setAvatar(data.avatar);
        setProfileCache(user.uid, data.avatar);
      }
    });

    return () => unsubscribe();
  }, [user, setProfileCache]);

  const onAvatarChange = enableUpload
    ? async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length || !user) return;

        const file = e.target.files[0];
        const locationRef = ref(storage, `avatars/${user.uid}`);
        const result = await uploadBytes(locationRef, file);
        const avatarUrl = await getDownloadURL(result.ref);

        setAvatar(avatarUrl);
        setProfileCache(user.uid, avatarUrl);
        await UserService.updateUserAvatar(user, avatarUrl);
      }
    : () => {};

  return { avatar, loading, onAvatarChange };
}
