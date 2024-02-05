import { useNavigate } from "react-router";
import { auth, dateBase } from "../firebase";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteUser, updateProfile } from "firebase/auth";
import { EventButton, Wrapper } from "./style/settings-components";

function Settings() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const onLogOut = async () => {
    const checkLogOut = confirm("로그아웃을 하실 건가요?");
    if (checkLogOut) {
      await auth.signOut();
      navigate("/login");
    }
  };

  const onDeleteUser = async () => {
    if (!user) return;

    const checkDelete = window.confirm("계정을 삭제하시겠습니까?");

    if (!checkDelete) return;

    try {
      const tweetQuery = query(
        collection(dateBase, "tweets"),
        where("userId", "==", user?.uid)
      );

      const tweetDocs = await getDocs(tweetQuery);

      tweetDocs.forEach(async (tweetDoc) => {
        await deleteDoc(tweetDoc.ref);
      });

      await updateProfile(user, {
        displayName: null,
        photoURL: null,
      });

      await deleteUser(user);
      await auth.signOut();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <EventButton onClick={onLogOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Log-Out</span>
      </EventButton>
      <EventButton onClick={onDeleteUser}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
        <span>계정 삭제</span>
      </EventButton>
    </Wrapper>
  );
}

export default Settings;
