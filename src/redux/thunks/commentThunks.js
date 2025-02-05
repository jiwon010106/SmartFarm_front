import axios from "axios";
import {
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure,
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  getMyCommentsStart,
  getMyCommentsSuccess,
  getMyCommentsFailure,
} from "../slices/commentSlice";

// 댓글 목록 조회
export const fetchComments = (postId) => async (dispatch) => {
  dispatch(getCommentsStart());
  try {
    const response = await axios.get(`/api/comments/${postId}`);
    dispatch(getCommentsSuccess(response.data));
  } catch (error) {
    dispatch(
      getCommentsFailure(
        error.response?.data?.message || "댓글 조회에 실패했습니다."
      )
    );
  }
};

// 새 댓글 작성
export const createComment = (commentData) => async (dispatch) => {
  dispatch(createCommentStart());
  try {
    const response = await axios.post("/api/comments", commentData);
    dispatch(createCommentSuccess(response.data));
  } catch (error) {
    dispatch(
      createCommentFailure(
        error.response?.data?.message || "댓글 작성에 실패했습니다."
      )
    );
  }
};

// 댓글 수정
export const updateComment = (commentId, content) => async (dispatch) => {
  dispatch(updateCommentStart());
  try {
    await axios.put(`/api/comments/${commentId}`, { content });
    dispatch(updateCommentSuccess({ comment_id: commentId, content }));
  } catch (error) {
    dispatch(
      updateCommentFailure(
        error.response?.data?.message || "댓글 수정에 실패했습니다."
      )
    );
  }
};

// 댓글 삭제
export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(deleteCommentStart());
  try {
    await axios.delete(`/api/comments/${commentId}`);
    dispatch(deleteCommentSuccess(commentId));
  } catch (error) {
    dispatch(
      deleteCommentFailure(
        error.response?.data?.message || "댓글 삭제에 실패했습니다."
      )
    );
  }
};

// 내 댓글 목록 조회
export const fetchMyComments = () => async (dispatch) => {
  dispatch(getMyCommentsStart());
  try {
    const response = await axios.get("/api/comments/my");
    dispatch(getMyCommentsSuccess(response.data));
  } catch (error) {
    dispatch(
      getMyCommentsFailure(
        error.response?.data?.message || "내 댓글 목록 조회에 실패했습니다."
      )
    );
  }
};
