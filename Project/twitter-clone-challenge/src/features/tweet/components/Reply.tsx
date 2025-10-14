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
} from "../styles/tweet-components";
import { Avatar } from "../../../layout/styles/screen-components";
import { Form, SubmitButton, TextArea } from "../styles/form-components";
import formattedDate from "../../../shared/hook/formattedDate";
import { auth } from "../../../firebase";

interface ReplyProps {
  tweetId: string;
  commentId: string;
}

const Reply: FC<ReplyProps> = ({ tweetId, commentId }) => {
  const [replies, setReplies] = useState<IReply[]>([]);
  const [newReply, setNewReply] = useState("");

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
    if (!newReply.trim()) return;
    try {
      await tweetService.addReply(tweetId, commentId, newReply);
      setNewReply("");
    } catch (error) {
      console.error("답변 추가 실패:", error);
    }
  };

  const handleDeleteReply = async (reply: IReply) => {
    if (!confirm("정말로 이 답변을 삭제하시겠습니까?")) return;
    try {
      await tweetService.deleteReply(tweetId, commentId, reply);
    } catch (error) {
      console.error("답변 삭제 실패:", error);
    }
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
              {auth.currentUser?.uid === reply.replierId ? (
                <ReplyDeleteButton onClick={() => handleDeleteReply(reply)}>
                  삭제
                </ReplyDeleteButton>
              ) : null}
            </ReplyProfile>
            <ReplyText>{reply.replyText}</ReplyText>
            <ReplyCreatedTime>
              {formattedDate(reply.createdAt)}
            </ReplyCreatedTime>
          </ReplyItem>
        ))}
      </ReplyList>
      <ReplyForm onSubmit={handleAddReply}>
        <Avatar src={auth.currentUser?.photoURL} />
        <TextArea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="답변 내용"
          rows={2}
        />
        <SubmitButton type="submit" value="답변" />
      </ReplyForm>
    </ReplyWrapper>
  );
};

export default Reply;
