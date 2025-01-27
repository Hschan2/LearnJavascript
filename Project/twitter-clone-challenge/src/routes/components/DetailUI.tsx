import CommentList from "../../components/screen/detail/comment-list";
import EventBtn from "../../components/screen/detail/event-button";
import ExclamationBtn from "../../components/screen/detail/exclamation-button";
import LikeBtn from "../../components/screen/detail/like-button";
import { Avatar } from "../../components/style/screen-components";
import {
  DetailTweetText,
  DetailImage,
  DetailProfileWrapper,
  DetailWrapper,
  ProfileImage,
  DetailContentWrapper,
  TagWrapper,
  Tag,
  DetailInfo,
  DetailCommentWrapper,
  DetailRetouch,
  CommentsWrapper,
  DetailTweetWrapper,
  DetailButtonWrapper,
  DetailTitleButton,
  DetailEventButtonWrapper,
  FollowButton,
} from "../../components/style/tweet-components";
import {
  Form,
  SubmitButton,
  TextArea,
} from "../../components/style/form-components";
import formattedDate from "../../hooks/formattedDate";
import { IComment, ITweet } from "../../components/types/tweet-type";
import { User } from "firebase/auth";
import { auth } from "../../firebase";

export interface DetailUIProps {
  tweet: {
    tweet: ITweet | null;
    likedByUser: boolean;
  };
  user: {
    uid: string | null;
    photoURL: string | null;
    displayName: string | null;
    isFollowing: boolean | null;
  };
  actions: {
    onLike: () => void;
    onExclamation: () => void;
    onDeleteComment: (comment: IComment) => void;
    onNavigateUpdate: () => void;
    onDeleteTweet: () => void;
    onAddComment: () => void;
    onTagClick: (tag: string) => void;
    onURLCopy: () => void;
    onFollow: (tweet: ITweet, user: User) => void;
    onUnFollow: (tweet: ITweet, user: User) => void;
  };
  commentsData: {
    comments: IComment[];
    newComment: string;
    setNewComment: (value: string) => void;
  };
  profileImage: string | null;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const DetailUI = ({
  tweet,
  user,
  actions,
  commentsData,
  profileImage,
  textareaRef,
}: DetailUIProps) => (
  <DetailWrapper>
    <DetailImage src={tweet.tweet?.photo} alt="Detail-Image" loading="lazy" />
    <DetailContentWrapper>
      <DetailTweetWrapper>
        <DetailTitleButton>
          <DetailTweetText>
            {tweet.tweet?.tweet}{" "}
            <span onClick={actions.onURLCopy}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
            </span>
          </DetailTweetText>
          {user.uid === tweet.tweet?.userId && (
            <DetailEventButtonWrapper>
              <EventBtn use="update" onClick={actions.onNavigateUpdate} />
              <EventBtn use="delete" onClick={actions.onDeleteTweet} />
            </DetailEventButtonWrapper>
          )}
        </DetailTitleButton>
        <DetailButtonWrapper>
          <LikeBtn
            likes={tweet.tweet?.likes || 0}
            likedByUser={tweet.likedByUser}
            onClick={actions.onLike}
          />
          <ExclamationBtn
            exclamation={tweet.tweet?.exclamation || 0}
            onClick={actions.onExclamation}
          />
        </DetailButtonWrapper>
      </DetailTweetWrapper>
      <DetailProfileWrapper>
        {profileImage && (
          <ProfileImage src={profileImage} alt="Profile-Image" />
        )}{" "}
        {tweet.tweet?.username}
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
        {user.uid !== tweet.tweet?.userId && (
          <FollowButton
            onClick={() => {
              if (user.isFollowing && tweet.tweet && auth.currentUser) {
                actions.onUnFollow(tweet.tweet, auth.currentUser);
              }
              if (!user.isFollowing && tweet.tweet && auth.currentUser) {
                actions.onFollow(tweet.tweet, auth.currentUser);
              }
            }}
          >
            {user.isFollowing ? "언팔로우" : "팔로우"}
          </FollowButton>
        )}
      </DetailProfileWrapper>
      <TagWrapper>
        {tweet.tweet?.tags?.map((tag: string, index: number) => (
          <Tag
            key={index}
            className="detailTag"
            onClick={() => actions.onTagClick(tag)}
          >
            {tag}
          </Tag>
        ))}
      </TagWrapper>
      {tweet.tweet?.location && (
        <DetailInfo>위치: {tweet.tweet.location}</DetailInfo>
      )}
      <DetailInfo>
        업로드 날짜: {formattedDate(tweet.tweet?.createdAt)}
      </DetailInfo>
      <DetailInfo>카메라 브랜드: {tweet.tweet?.item}</DetailInfo>
      {tweet.tweet?.retouch && (
        <DetailRetouch href={tweet.tweet.retouch} download>
          보정 파일 다운로드
        </DetailRetouch>
      )}
    </DetailContentWrapper>
    <CommentsWrapper>
      {commentsData.comments && (
        <CommentList
          comments={commentsData.comments}
          onDelete={actions.onDeleteComment}
        />
      )}
    </CommentsWrapper>
    <DetailCommentWrapper>
      {user.photoURL ? (
        <Avatar src={user.photoURL} alt="Profile" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <Form
        className="comment"
        onSubmit={(e) => {
          e.preventDefault();
          actions.onAddComment();
        }}
      >
        <TextArea
          ref={textareaRef}
          maxLength={150}
          onChange={(e) => {
            e.preventDefault();
            commentsData.setNewComment(e.target.value);
          }}
          value={commentsData.newComment}
          placeholder="상대방을 고려하여 댓글을 작성해 주세요."
          required
        />
        <SubmitButton type="submit" value="작성" />
      </Form>
    </DetailCommentWrapper>
  </DetailWrapper>
);

export default DetailUI;
