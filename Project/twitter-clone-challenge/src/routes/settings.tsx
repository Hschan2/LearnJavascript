import { useNavigate } from "react-router";
import { auth, dataBase } from "../firebase";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteUser, updateProfile } from "firebase/auth";
import { EventButton, Wrapper } from "./style/settings-components";
import { deleteUserAccount, logoutUser } from "../hooks/auth/userService";

function Settings() {
  const navigate = useNavigate();

  const onLogOut = async () => {
    const checkLogOut = confirm("로그아웃을 하실 건가요?");
    if (!checkLogOut) return;

    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패: ", error);
    }
  };

  const onDeleteUser = async () => {
    const checkDelete = window.confirm("계정을 삭제하시겠습니까?");
    if (!checkDelete) return;

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("유저 아이디가 없습니다.");

      await deleteUserAccount(userId);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.error("계정 삭제 실패: ", error);
        alert(`계정 삭제 실패: ${error.message}`);
      } else {
        console.error("알 수 없는 에러 발생: ", error);
        alert("계정 삭제 실패: 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Wrapper>
      <EventButton onClick={onLogOut} title="로그아웃">
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
        <span>로그아웃</span>
      </EventButton>
      <EventButton onClick={onDeleteUser} title="계정 삭제">
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
