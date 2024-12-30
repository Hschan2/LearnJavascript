import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { DocumentReference, updateDoc } from "firebase/firestore";
import { useCallback } from "react";

export const useFileUpload = (user?: any) => {
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
    await updateDoc(doc, { photo: url });
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
    await updateDoc(doc, { retouch: url });
  };

  const handleFileUpload = useCallback(
    async (file: File, doc: DocumentReference) => {
      try {
        await uploadTweetPhoto(user.uid, doc, file);
        console.log("사진 업로드 성공");
      } catch (error) {
        console.error("사진 업로드 실패: ", error);
      }
    },
    [user]
  );

  const handleRetouchUpload = useCallback(
    async (retouch: File, doc: DocumentReference) => {
      try {
        await uploadRetouchFile(user.uid, doc, retouch);
        console.log("리터치 사진 업로드 성공");
      } catch (error) {
        console.error("리터치 사진 업로드 실패: ", error);
      }
    },
    [user]
  );

  return {
    uploadTweetPhoto,
    uploadRetouchFile,
    handleFileUpload,
    handleRetouchUpload,
  };
};
