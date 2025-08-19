export const firestoreUnsubscribeList: (() => void)[] = [];

export const addFirestoreUnsubscribe = (fn: () => void) => {
  firestoreUnsubscribeList.push(fn);
};

export const clearAllFirestoreSubscriptions = () => {
  firestoreUnsubscribeList.forEach((fn) => fn());
  firestoreUnsubscribeList.length = 0;
};
