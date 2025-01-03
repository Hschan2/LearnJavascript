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
} from "../../components/style/tweet-components";
import {
  Form,
  SubmitButton,
  TextArea,
} from "../../components/style/form-components";
import formattedDate from "../../hooks/formattedDate";
import { IComment, ITweet } from "../../components/types/tweet-type";

export interface DetailUIProps {
  tweet: {
    tweet: ITweet | null;
    likedByUser: boolean;
  };
  user: {
    uid: string | null;
    photoURL: string | null;
    displayName: string | null;
  };
  actions: {
    onLike: () => void;
    onExclamation: () => void;
    onDeleteComment: (comment: IComment) => void;
    onNavigateUpdate: () => void;
    onDeleteTweet: () => void;
    onAddComment: () => void;
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
          <DetailTweetText>{tweet.tweet?.tweet}</DetailTweetText>
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
      </DetailProfileWrapper>
      <TagWrapper>
        {tweet.tweet?.tags?.map((tag: string, index: number) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagWrapper>
      {tweet.tweet?.location && <DetailInfo>위치: {tweet.tweet.location}</DetailInfo>}
      <DetailInfo>업로드 날짜: {formattedDate(tweet.tweet?.createdAt)}</DetailInfo>
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
