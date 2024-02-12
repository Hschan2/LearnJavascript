import React, { useEffect, useState } from "react";
import { auth, dateBase, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Tweet from "../components/utils/tweet";
import { AvatarImg, AvatarInput, AvatarUpload, ConfirmEditButton, EditButton, EditContainer, Input, Name, NameContainer, Tweets, Wrapper } from "./style/profile-components";
import { ITweet } from "../components/types/tweet-type";

function Profile() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isEditName, setEditName] = useState(false);
  const [isNewName, setNewName] = useState("");
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(dateBase, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo, likes, likedBy } =
        doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
        likes,
        likedBy,
      };
    });
    setTweets(tweets);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const onSaveNewName = async () => {
    if (user) {
      await updateProfile(user, {
        displayName: isNewName,
      });
      setEditName(false);
    }
  };

  const onCancelNewName = () => {
    setEditName(false);
  };

  const onEditNewName = () => {
    setEditName(true);
    setNewName(user?.displayName || "");
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      {isEditName ? (
        <NameContainer>
          <Input type="text" value={isNewName} onChange={onNameChange} />
          <EditContainer>
            <ConfirmEditButton onClick={onSaveNewName}>확인</ConfirmEditButton>
            <ConfirmEditButton onClick={onCancelNewName}>
              취소
            </ConfirmEditButton>
          </EditContainer>
        </NameContainer>
      ) : (
        <NameContainer>
          <Name>{user?.displayName ?? "익명"}</Name>
          <EditContainer>
            <EditButton onClick={onEditNewName}>수정</EditButton>
          </EditContainer>
        </NameContainer>
      )}
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}

export default Profile;
