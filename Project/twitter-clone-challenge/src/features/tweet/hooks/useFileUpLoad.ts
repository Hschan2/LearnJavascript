import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { DocumentReference } from "firebase/firestore";
import { useCallback } from "react";
import type { User } from "firebase/auth";
import { updateDocument } from "../../../services/databaseService";
import { tweetConverter } from "../../../lib/converters";
import { ITweet } from "../types/tweet-type";

export const useFileUpload = (user?: User | null) => {
  const uploadFile = async (path: string, file: File) => {
    const fileRef = ref(storage, path);
    const result = await uploadBytes(fileRef, file);
    return await getDownloadURL(result.ref);
  };

  const uploadTweetPhoto = async (
    userId: string,
    doc: DocumentReference,
    file: File
  ) => {
    const url = await uploadFile(`tweets/${userId}/${doc.id}`, file);
    await updateDocument<ITweet>(doc.path.split("/"), { photo: url }, tweetConverter);
  };

  const uploadRetouchFile = async (
    userId: string,
    doc: DocumentReference,
    retouch: File
  ) => {
    const url = await uploadFile(
      `tweets/${userId}/${doc.id}/retouch/${retouch.name}`,
      retouch
    );
    await updateDocument<ITweet>(doc.path.split("/"), { retouch: url }, tweetConverter);
  };

  const handleFileUpload = useCallback(
    async (file: File, doc: DocumentReference) => {
      if (!user) throw new Error("로그인이 필요합니다.");
      await uploadTweetPhoto(user.uid, doc, file);
      console.log("사진 업로드 성공");
    },
    [user?.uid]
  );

  const handleRetouchUpload = useCallback(
    async (retouch: File, doc: DocumentReference) => {
      if (!user) throw new Error("로그인이 필요합니다.");
      await uploadRetouchFile(user.uid, doc, retouch);
      console.log("리터치 사진 업로드 성공");
    },
    [user?.uid]
  );

  return {
    uploadTweetPhoto,
    uploadRetouchFile,
    handleFileUpload,
    handleRetouchUpload,
  };
};
