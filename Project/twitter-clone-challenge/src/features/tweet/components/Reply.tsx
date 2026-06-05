import { FC, useState, useEffect } from "react";
import { IReply } from "../types/tweet-type";
import { tweetService } from "../hooks/useTweetAction";
import {
  ReplyWrapper,
  ReplyList,
  ReplyItem,
  ReplyProfile,
  ReplyText,
  ReplyCreatedTime,
  ReplyForm,
  ReplyDeleteButton,
  ButtonWrapper,
} from "../styles/tweet-components";
import { Avatar } from "../../../layout/styles/screen-components";
import { SubmitButton, TextArea } from "../styles/form-components";
import formattedDate from "../../../shared/hook/formattedDate";
import { auth } from "../../../firebase";
import LikeBtn from "./like-button";
import { messages, formatMessage } from "../../../message";
import { filterBadWords } from "../../../shared/filter-bad-words";

interface ReplyProps {
  tweetId: string;
  commentId: string;
}

const Reply: FC<ReplyProps> = ({ tweetId, commentId }) => {
  const [replies, setReplies] = useState<IReply[]>([]);
  const [newReply, setNewReply] = useState("");
  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = tweetService.getReplies(
      tweetId,
      commentId,
      (fetchedReplies) => {
        setReplies(fetchedReplies);
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [tweetId, commentId]);

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredReply = filterBadWords(newReply.trim());
    if (!filteredReply) return;

    try {
      await tweetService.addReply(tweetId, commentId, filteredReply);
      setNewReply("");
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedAddReply, {
          errorMessage: (error as Error).message,
        })
      );
    }
  };

  const handleDeleteReply = async (reply: IReply) => {
    if (!confirm(messages.serviceMessage.checkDeleteReply)) return;
    try {
      await tweetService.deleteReply(tweetId, commentId, reply);
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedDeleteReply, {
          errorMessage: (error as Error).message,
        })
      );
    }
  };

  const handleLikeClick = (replyId: string) => {
    if (!currentUser) return;
    tweetService.toggleReplyLike(tweetId, replyId, currentUser.uid);
  };

  return (
    <ReplyWrapper>
      <ReplyList>
        {replies.map((reply) => (
          <ReplyItem key={reply.replyId}>
            <ReplyProfile>
              <div>
                <Avatar src={reply.replierProfile} alt="profile" />
                <span>{reply.replierName}</span>
              </div>
              {currentUser?.uid === reply.replierId ? (
                <ReplyDeleteButton onClick={() => handleDeleteReply(reply)}>
                  삭제
                </ReplyDeleteButton>
              ) : null}
            </ReplyProfile>
            <ReplyText>{reply.replyText}</ReplyText>
            <ReplyCreatedTime>
              {formattedDate(reply.createdAt)}
            </ReplyCreatedTime>
            <ButtonWrapper>
              <LikeBtn
                likes={reply.likes ?? 0}
                likedByUser={reply.likedBy?.includes(currentUser?.uid ?? "") ?? false}
                onClick={() => handleLikeClick(reply.replyId)}
              />
            </ButtonWrapper>
          </ReplyItem>
        ))}
      </ReplyList>
      <ReplyForm onSubmit={handleAddReply}>
        <Avatar src={currentUser?.photoURL ?? undefined} />
        <TextArea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          onBlur={() => setNewReply(filterBadWords(newReply))}
          placeholder="댓글을 입력해 주세요. 비속어는 피해주세요."
          rows={2}
        />
        <SubmitButton type="submit" value="작성" />
      </ReplyForm>
    </ReplyWrapper>
  );
};

export default Reply;
