import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  QueryConstraint,
  FirestoreDataConverter,
  WithFieldValue,
  UpdateData,
  CollectionReference,
  DocumentReference,
  runTransaction,
  Transaction,
  Query,
} from "firebase/firestore";
import { dataBase } from "../firebase";

/**
 * 트랜잭션 실행
 */
export const runDbTransaction = async <T>(
  updateFunction: (transaction: Transaction) => Promise<T>
): Promise<T> => {
  return await runTransaction(dataBase, updateFunction);
};

/**
 * 컬렉션에 새로운 문서 추가 (ID 자동 생성)
 */
export const createDocument = async <T extends object>(
  collectionPath: string[],
  data: WithFieldValue<T>,
  converter?: FirestoreDataConverter<T>
) => {
  const collectionRef = collection(
    dataBase,
    collectionPath[0],
    ...collectionPath.slice(1)
  );

  if (converter) {
    return await addDoc(collectionRef.withConverter(converter), data);
  }

  return await addDoc(collectionRef as CollectionReference<T>, data);
};

/**
 * 특정 ID를 가진 문서를 생성하거나 덮어쓰기
 */
export const setDocument = async <T extends object>(
  docPath: string[],
  data: WithFieldValue<T>,
  converter?: FirestoreDataConverter<T>
) => {
  const docRef = doc(dataBase, docPath[0], ...docPath.slice(1));

  if (converter) {
    return await setDoc(docRef.withConverter(converter), data);
  }

  return await setDoc(docRef as DocumentReference<T>, data);
};

/**
 * 기존 문서의 일부 필드 업데이트
 */
export const updateDocument = async <T extends object>(
  docPath: string[],
  data: UpdateData<T>,
  converter?: FirestoreDataConverter<T>
) => {
  const docRef = doc(dataBase, docPath[0], ...docPath.slice(1));

  if (converter) {
    return await updateDoc(docRef.withConverter(converter), data);
  }

  return await updateDoc(docRef as DocumentReference<T>, data);
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
export const getDocument = async <T extends object>(
  docPath: string[],
  converter?: FirestoreDataConverter<T>
) => {
  const docRef = doc(dataBase, docPath[0], ...docPath.slice(1));

  if (converter) {
    return await getDoc(docRef.withConverter(converter));
  }

  return await getDoc(docRef as DocumentReference<T>);
};

/**
 * 여러 문서들을 쿼리로 가져오기
 */
export const getDocuments = async <T extends object>(
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

  const q = query(collectionRef as CollectionReference<T>, ...queryConstraints);
  return await getDocs(q);
};

/**
 * 특정 쿼리에 대한 문서들을 한 번 가져오기
 */
export const getDocumentsByQuery = async <T extends object>(
  q: Query<T>
): Promise<QuerySnapshot<T>> => {
  return await getDocs(q);
};

/**
 * 특정 쿼리에 대한 실시간 리스너 설정
 */
export const subscribeToQuery = <T extends object>(
  q: Query<T>,
  callback: (snapshot: QuerySnapshot<T>) => void
) => {
  return onSnapshot(q, callback);
};
