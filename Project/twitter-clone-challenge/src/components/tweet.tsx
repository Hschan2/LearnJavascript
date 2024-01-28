import { deleteObject, ref } from "firebase/storage";
import { auth, dateBase, storage } from "../firebase";
import { ITweet } from "./timeline";
import { styled } from "styled-components";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import UpdateTweetForm from "./update-tweet-form";
import formattedDate from "../hooks/formattedDate";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  background-color: #111111;
  position: relative;
`;

const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const MenuItem = styled.button`
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Photo = styled.img`
  width: 630px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
  margin-top: 12px;
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

const CreatedAt = styled.span`
  margin-top: 10px;
  font-size: 12px;
  color: grey;
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  color: white;
  width: 80px;
  height: 40px;
  margin-top: 20px;
  cursor: pointer;
`;

function Tweet({
  username,
  photo,
  tweet,
  userId,
  id,
  createdAt,
  likes,
}: ITweet) {
  const [isEdit, setIsEdit] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const createdDate = formattedDate({ createdAt });
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
    }
  };

  const toggleLike = async () => {
    if (!user || !id) return;

    try {
      const tweetRef = doc(dateBase, "tweets", id);
      const tweetDoc = await getDoc(tweetRef);

      if (tweetDoc.exists()) {
        const currentLikes = tweetDoc.data()?.likes || 0;

        if (isLiked) {
          await updateDoc(tweetRef, { likes: currentLikes - 1 });
        } else {
          await updateDoc(tweetRef, { likes: currentLikes + 1 });
        }

        setIsLiked((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
            <CreatedAt>{createdDate}</CreatedAt>
            <LikeButton onClick={toggleLike}>좋아요 {likes}</LikeButton>
          </InfoContents>
          {user?.uid === userId && (
            <>
              <Menu>
                <MenuItem onClick={() => setIsEdit(!isEdit)}>
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </MenuItem>
                <MenuItem onClick={onDelete}>
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </MenuItem>
              </Menu>
            </>
          )}
        </Wrapper>
      )}
    </>
  );
}

export default Tweet;
