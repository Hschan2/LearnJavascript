import { deleteObject, ref } from "firebase/storage";
import { auth, dateBase, storage } from "../firebase";
import { ITweet } from "./timeline";
import { styled } from "styled-components";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import UpdateTweetForm from "./update-tweet-form";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr; /* 순서 변경 및 컬럼 비율 조정 */
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  background-color: #111111;
  position: relative; /* 상대 위치 지정 */
`;

const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #111111;
  color: white;
  border: 0;
  cursor: pointer;
`;

const Menu = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 40px;
  right: 10px;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const MenuItem = styled.button`
  background-color: #111111;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  padding: 7px;
  margin: 5px 0;
`;

const Photo = styled.img`
  width: 630px;
  height: 300px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
  margin-top: 20px;
`;

const Username = styled.span`
  font-weight: 800;
  font-size: 18px;
  svg {
    width: 15px;
    height: 15px;
    color: #1d9bf0;
  }
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 16px;
`;

function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;

  const onDelete = async () => {
    const checkDelete = confirm("정말로 삭제하시겠습니까?");
    if (!checkDelete || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(dateBase, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current?.contains(event.target as Node)) {
        return;
      }

      setMenuVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      {isEdit ? (
        <UpdateTweetForm id={id} onClose={() => setIsEdit(false)} />
      ) : (
        <Wrapper>
          <InfoContents>
            <Username>
              {username}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </Username>
            <Payload>{tweet}</Payload>
            {photo ? <Photo src={photo} /> : null}
          </InfoContents>
          {user?.uid === userId && (
            <>
              <MenuButton onClick={handleMenuToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </MenuButton>
              <Menu ref={menuRef} visible={menuVisible}>
                <MenuItem onClick={() => setIsEdit(!isEdit)}>수정</MenuItem>
                <MenuItem onClick={onDelete}>삭제</MenuItem>
              </Menu>
            </>
          )}
        </Wrapper>
      )}
    </>
  );
}

export default Tweet;
