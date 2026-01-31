import { useNavigate } from "react-router";
import { deleteUserAccount, logoutUser } from "./userService";
import { auth, dataBase } from "../../../firebase";
import { where, writeBatch } from "firebase/firestore";
import { getDocuments } from "../../../services/databaseService";
import { SERVICE_ERROR_MESSAGE, SERVICE_MESSAGE } from "../../../message";

export function useSettingActions() {
  const navigate = useNavigate();

  const onLogOut = async () => {
    const checkLogOut = confirm(SERVICE_MESSAGE.CHECK_LOGOUT);
    if (!checkLogOut) return;

    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패: ", error);
    }
  };

  const onDeleteUser = async () => {
    const checkDelete = window.confirm(SERVICE_MESSAGE.CHECK_DELETE_USER);
    if (!checkDelete) return;

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error(SERVICE_ERROR_MESSAGE.NONE_USER_ID);

      const querySnapshot = await getDocuments(
        ["signedUsers"],
        where("uid", "==", userId)
      );
      if (querySnapshot.empty)
        throw new Error(SERVICE_ERROR_MESSAGE.NOT_FIND_USER);

      const batch = writeBatch(dataBase);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      try {
        await batch.commit();
      } catch (error) {
        console.error("회원 데이터 삭제 에러 ", error);
      }

      await deleteUserAccount(userId);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.error("계정 삭제 실패: ", error);
        alert(SERVICE_ERROR_MESSAGE.FAILED_DELETE_USER(error.message));
      } else {
        console.error("알 수 없는 에러 발생: ", error);
        alert(
          `${SERVICE_ERROR_MESSAGE.FAILED_DELETE_USER(
            "알 수 없는 오류가 발생했습니다."
          )}`
        );
      }
    }
  };

  return { onLogOut, onDeleteUser };
}
