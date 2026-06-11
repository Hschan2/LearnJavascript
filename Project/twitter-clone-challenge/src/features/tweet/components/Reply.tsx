import { FC, useEffect, useState } from "react";
import { IReply } from "../types/tweet-type";
import {
  ReplyWrapper,
  ReplyList,
  ReplyItem,
  ReplyProfile,
  ReplyText,
  ReplyCreatedTime,
  ReplyForm,
  ReplyDeleteButton,
  ReplyEditButton,
  EditForm,
  EditTextArea,
  EditButtonContainer,
} from "../styles/tweet-components";
import { tweetService } from "../hooks/useTweetAction";
import { auth } from "../../../firebase";
import { Avatar } from "../../../layout/styles/screen-components";
import formattedDate from "../../../shared/hook/formattedDate";
import { SubmitButton, TextArea } from "../styles/form-components";
import { messages, formatMessage } from "../../../message";
import LikeBtn from "./like-button";
import { checkBadWords, filterBadWords } from "../../../shared/filter-bad-words";

interface ReplyProps {
  tweetId: string;
  commentId: string;
}

const Reply: FC<ReplyProps> = ({ tweetId, commentId }) => {
  const [replies, setReplies] = useState<IReply[]>([]);
  const [newReply, setNewReply] = useState("");
  const [hasBadWords, setHasBadWords] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = tweetService.getReplies(
      tweetId,
      commentId,
      (updatedReplies) => {
        setReplies(updatedReplies);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [tweetId, commentId]);

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredReply = filterBadWords(newReply.trim());
    if (!filteredReply) return;

    try {
      await tweetService.addReply(tweetId, commentId, filteredReply);
      setNewReply("");
      setHasBadWords(false);
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

  const handleEditStart = (reply: IReply) => {
    setEditingReplyId(reply.replyId);
    setEditText(reply.replyText);
  };

  const handleEditCancel = () => {
    setEditingReplyId(null);
    setEditText("");
  };

  const handleEditSubmit = async (e: React.FormEvent, replyId: string) => {
    e.preventDefault();
    const filteredReply = filterBadWords(editText.trim());
    if (!filteredReply) return;

    try {
      await tweetService.updateReply(tweetId, replyId, filteredReply);
      setEditingReplyId(null);
      setEditText("");
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedUpdateReply, {
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
              {currentUser?.uid === reply.replierId && (
                <div style={{ gap: "4px" }}>
                  <ReplyEditButton onClick={() => handleEditStart(reply)}>
                    수정
                  </ReplyEditButton>
                  <ReplyDeleteButton onClick={() => handleDeleteReply(reply)}>
                    삭제
                  </ReplyDeleteButton>
                </div>
              )}
            </ReplyProfile>
            {editingReplyId === reply.replyId ? (
              <EditForm onSubmit={(e) => handleEditSubmit(e, reply.replyId)}>
                <EditTextArea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <EditButtonContainer>
                  <SubmitButton
                    type="button"
                    onClick={handleEditCancel}
                    value="취소"
                    style={{ backgroundColor: "grey" }}
                  />
                  <SubmitButton type="submit" value="수정" />
                </EditButtonContainer>
              </EditForm>
            ) : (
              <>
                <ReplyText>{reply.replyText}</ReplyText>
                <ReplyCreatedTime>
                  {formattedDate(reply.createdAt)}
                </ReplyCreatedTime>
              </>
            )}
            <div style={{ paddingLeft: "38px", marginTop: "4px" }}>
              <LikeBtn
                likes={reply.likes ?? 0}
                likedByUser={reply.likedBy?.includes(currentUser?.uid ?? "") ?? false}
                onClick={() => handleLikeClick(reply.replyId)}
              />
            </div>
          </ReplyItem>
        ))}
      </ReplyList>
      <ReplyForm onSubmit={handleAddReply}>
        <TextArea
          placeholder={
            hasBadWords ? "비속어가 포함되어 있습니다." : "답변을 입력하세요."
          }
          value={newReply}
          onChange={(e) => {
            const val = e.target.value;
            setNewReply(val);
            setHasBadWords(checkBadWords(val));
          }}
          required
        />
        <SubmitButton type="submit" value="작성" />
      </ReplyForm>
    </ReplyWrapper>
  );
};

export default Reply;
