import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  myComments: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    updateComment: (state, action) => {
      const { comment_id, content } = action.payload;
      const comment = state.comments.find((c) => c.comment_id === comment_id);
      if (comment) {
        comment.content = content;
      }
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.comment_id !== action.payload
      );
    },
    setMyComments: (state, action) => {
      state.myComments = action.payload;
    },
  },
});

// 액션 생성자
export const {
  setComments,
  addComment,
  updateComment,
  removeComment,
  setMyComments,
} = commentSlice.actions;

// API 통신 함수들
export const fetchComments = (postId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/comments/${postId}`);
    dispatch(setComments(response.data));
  } catch (error) {
    console.error("댓글 조회 실패:", error);
  }
};

export const createComment = (commentData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/comments", commentData);
    dispatch(addComment(response.data));
  } catch (error) {
    console.error("댓글 작성 실패:", error);
  }
};

export const editComment = (commentId, content) => async (dispatch) => {
  try {
    await axios.put(`/api/comments/${commentId}`, { content });
    dispatch(updateComment({ comment_id: commentId, content }));
  } catch (error) {
    console.error("댓글 수정 실패:", error);
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/comments/${commentId}`);
    dispatch(removeComment(commentId));
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
  }
};

export const fetchMyComments = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/comments/my");
    dispatch(setMyComments(response.data));
  } catch (error) {
    console.error("내 댓글 조회 실패:", error);
  }
};

export default commentSlice.reducer;
