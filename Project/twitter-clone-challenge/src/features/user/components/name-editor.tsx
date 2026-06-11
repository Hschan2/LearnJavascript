import { updateProfile } from "firebase/auth";
import { useState } from "react";
import {
  ConfirmEditButton,
  EditButton,
  EditContainer,
  Input,
  Name,
  NameContainer,
  WarningText,
} from "../style/profile-components";
import { NameEditorProps } from "../types/profile-type";
import { filterBadWords, checkBadWords } from "../../../shared/filter-bad-words";

const NameEditor = ({ isEditing, user, toggleEditor }: NameEditorProps) => {
  const [newName, setNewName] = useState(user?.displayName || "");
  const [hasBadWords, setHasBadWords] = useState(false);

  const handleSave = async () => {
    if (user) {
      const filteredName = filterBadWords(newName.trim());
      await updateProfile(user, { displayName: filteredName });
      setNewName(filteredName);
      setHasBadWords(false);
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
            onChange={(e) => {
              const val = e.target.value;
              setNewName(val);
              setHasBadWords(checkBadWords(val));
            }}
            placeholder="이름을 입력하세요."
          />
          {hasBadWords && (
            <WarningText>
              ⚠️ 부적절한 표현이 감지되었습니다.
            </WarningText>
          )}
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
