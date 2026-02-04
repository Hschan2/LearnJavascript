import { useNavigate } from "react-router";
import { deleteUserAccount, logoutUser } from "./userService";
import { auth, dataBase } from "../../../firebase";
import { where, writeBatch } from "firebase/firestore";
import { getDocuments } from "../../../services/databaseService";
import { messages, formatMessage } from "../../../message";

export function useSettingActions() {
  const navigate = useNavigate();

  const onLogOut = async () => {
    const checkLogOut = confirm(messages.serviceMessage.checkLogout);
    if (!checkLogOut) return;

    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedLogoutOperation, {
          errorMessage: (error as Error).message,
        })
      );
    }
  };

  const onDeleteUser = async () => {
    const checkDelete = window.confirm(messages.serviceMessage.checkDeleteUser);
    if (!checkDelete) return;

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error(messages.serviceError.noneUserId);

      const querySnapshot = await getDocuments(
        ["signedUsers"],
        where("uid", "==", userId)
      );
      if (querySnapshot.empty)
        throw new Error(messages.serviceError.notFindUser);

      const batch = writeBatch(dataBase);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      try {
        await batch.commit();
      } catch (error) {
        console.error(
          formatMessage(messages.serviceError.failedDeleteUserData, {
            errorMessage: (error as Error).message,
          })
        );
      }

      await deleteUserAccount(userId);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          formatMessage(messages.serviceError.failedDeleteAccount, {
            errorMessage: error.message,
          })
        );
        alert(
          formatMessage(messages.serviceError.failedDeleteUser, {
            errorMessage: error.message,
          })
        );
      } else {
        console.error(
          formatMessage(messages.serviceError.undefinedError, {
            errorMessage: String(error),
          })
        );
        alert(
          formatMessage(messages.serviceError.failedDeleteUser, {
            errorMessage: "알 수 없는 오류가 발생했습니다.",
          })
        );
      }
    }
  };

  return { onLogOut, onDeleteUser };
}
