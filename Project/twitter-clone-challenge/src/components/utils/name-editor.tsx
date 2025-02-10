import { updateProfile } from "firebase/auth";
import { useState } from "react";
import {
  ConfirmEditButton,
  EditButton,
  EditContainer,
  Input,
  Name,
  NameContainer,
} from "../../features/user/style/profile-components";

interface NameEditorProps {
  isEditing: boolean;
  user: any;
  toggleEditor: () => void;
}

const NameEditor = ({ isEditing, user, toggleEditor }: NameEditorProps) => {
  const [newName, setNewName] = useState(user?.displayName || "");

  const handleSave = async () => {
    if (user) {
      await updateProfile(user, { displayName: newName });
      toggleEditor();
    }
  };

  return (
    <NameContainer>
      {isEditing ? (
        <>
          <Input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="이름을 입력하세요."
          />
          <EditContainer>
            <ConfirmEditButton onClick={handleSave} title="수정 완료">
              변경
            </ConfirmEditButton>
            <ConfirmEditButton onClick={toggleEditor} title="수정 취소">
              취소
            </ConfirmEditButton>
          </EditContainer>
        </>
      ) : (
        <>
          <Name>{user?.displayName ?? "익명"}</Name>
          <EditButton onClick={toggleEditor} title="이름 수정">
            이름 변경
          </EditButton>
        </>
      )}
    </NameContainer>
  );
};

export default NameEditor;
