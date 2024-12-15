import { useNavigate } from "react-router";
import { deleteUserAccount, logoutUser } from "./auth/userService";
import { auth } from "../firebase";

export function useSettingActions() {
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

  return { onLogOut, onDeleteUser };
}