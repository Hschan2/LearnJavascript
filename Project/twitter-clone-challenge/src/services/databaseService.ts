import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  DocumentData,
  query,
  getDocs,
  QuerySnapshot,
  QueryConstraint,
  FirestoreDataConverter,
  WithFieldValue,
  UpdateData,
} from "firebase/firestore";
import { dataBase } from "../firebase";

/**
 * 컬렉션에 새로운 문서 추가 (ID 자동 생성)
 */
export const createDocument = async <T>(
  collectionPath: string[],
  data: WithFieldValue<T>,
  converter?: FirestoreDataConverter<T>
) => {
  let collectionRef = collection(
    dataBase,
    collectionPath[0],
    ...collectionPath.slice(1)
  );

  if (converter) {
    return await addDoc(collectionRef.withConverter(converter), data);
  }

  return await addDoc(collectionRef, data as DocumentData);
};

/**
 * 특정 ID를 가진 문서를 생성하거나 덮어쓰기
 */
export const setDocument = async <T>(
  docPath: string[],
  data: WithFieldValue<T>,
  converter?: FirestoreDataConverter<T>
) => {
  let docRef = doc(dataBase, docPath[0], ...docPath.slice(1));

  if (converter) {
    return await setDoc(docRef.withConverter(converter), data);
  }

  return await setDoc(docRef, data as DocumentData);
};

/**
 * 기존 문서의 일부 필드 업데이트
 */
export const updateDocument = async <T>(
  docPath: string[],
  data: UpdateData<T>,
  converter?: FirestoreDataConverter<T>
) => {
  let docRef = doc(dataBase, docPath[0], ...docPath.slice(1));

  if (converter) {
    return await updateDoc(docRef.withConverter(converter), data);
  }

  return await updateDoc(docRef, data as DocumentData);
};

/**
 * 특정 문서 삭제
 */
export const deleteDocument = async (docPath: string[]) => {
  const docRef = doc(dataBase, docPath[0], ...docPath.slice(1));
  return await deleteDoc(docRef);
};

/**
 * 특정 문서 한 번 가져오기
 */
export const getDocument = async <T>(
  docPath: string[],
  converter?: FirestoreDataConverter<T>
) => {
  let docRef = doc(dataBase, docPath[0], ...docPath.slice(1));

  if (converter) {
    return await getDoc(docRef.withConverter(converter));
  }

  return await getDoc(docRef);
};

/**
 * 여러 문서들을 쿼리로 가져오기
 */
export const getDocuments = async <T>(
  collectionPath: string[],
  converter?: FirestoreDataConverter<T>,
  ...queryConstraints: QueryConstraint[]
): Promise<QuerySnapshot<T>> => {
  const collectionRef = collection(
    dataBase,
    collectionPath[0],
    ...collectionPath.slice(1)
  );

  if (converter) {
    const q = query(collectionRef.withConverter(converter), ...queryConstraints);
    return await getDocs(q);
  }

  const q = query(collectionRef, ...queryConstraints);
  return (await getDocs(q)) as unknown as QuerySnapshot<T>;
};
