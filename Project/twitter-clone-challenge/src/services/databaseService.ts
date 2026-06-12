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
  QueryConstraint,
  FirestoreDataConverter,
  WithFieldValue,
  UpdateData,
} from "firebase/firestore";
import { dataBase } from "../firebase";

/**
 * 컬렉션에 새로운 문서 추가 (ID 자동 생성)
 * @param collectionPath 컬렉션 경로 세그먼트 배열 (예: ["tweets"] 또는 ["tweets", tweetId, "replies"])
 * @param data 저장할 데이터 객체
 * @param converter 선택적 Firestore 데이터 변환기
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
 * @param docPath 문서 경로 세그먼트 배열 (예: ["users", userId])
 * @param data 저장할 데이터 객체
 * @param converter 선택적 Firestore 데이터 변환기
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
 * @param docPath 문서 경로 세그먼트 배열 (예: ["tweets", tweetId])
 * @param data 업데이트할 데이터 객체
 * @param converter 선택적 Firestore 데이터 변환기 (업데이트 시에는 보통 필요 없으나 일관성을 위해 유지)
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
 * @param docPath 문서 경로 세그먼트 배열 (예: ["tweets", tweetId])
 */
export const deleteDocument = async (docPath: string[]) => {
  const docRef = doc(dataBase, docPath[0], ...docPath.slice(1));
  return await deleteDoc(docRef);
};

/**
 * 특정 문서 한 번 가져오기
 * @param docPath 문서 경로 세그먼트 배열
 * @param converter 선택적 Firestore 데이터 변환기
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
 * @param collectionPath 컬렉션 경로 세그먼트 배열
 * @param queryConstraints 쿼리 제약 조건 (예: where, orderBy, limit)
 */
export const getDocuments = async <T>(
  collectionPath: string[],
  converter?: FirestoreDataConverter<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  let collectionRef = collection(
    dataBase,
    collectionPath[0],
    ...collectionPath.slice(1)
  );

  const q = converter
    ? query(collectionRef.withConverter(converter), ...queryConstraints)
    : query(collectionRef, ...queryConstraints);

  return await getDocs(q);
};
