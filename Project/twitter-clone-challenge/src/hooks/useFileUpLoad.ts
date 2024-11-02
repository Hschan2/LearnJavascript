import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { DocumentReference, updateDoc } from "firebase/firestore";

export const useFileUpload = () => {
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

  return { uploadTweetPhoto, uploadRetouchFile };
};
