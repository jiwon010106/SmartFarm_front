import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    // 게시글 작성 시작
    createPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // 게시글 작성 성공
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.posts = [action.payload, ...state.posts];
      state.error = null;
    },
    // 게시글 작성 실패
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 게시글 목록 조회 시작
    getPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // 게시글 목록 조회 성공
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = null;
    },
    // 게시글 목록 조회 실패
    getPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 단일 게시글 조회 시작
    getPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // 단일 게시글 조회 성공
    getPostSuccess: (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
      state.error = null;
    },
    // 단일 게시글 조회 실패
    getPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 게시글 삭제 시작
    deletePostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // 게시글 삭제 성공
    deletePostSuccess: (state, action) => {
      state.loading = false;
      // 삭제된 게시글의 ID로 posts 배열에서 해당 게시글 제거
      state.posts = state.posts.filter(
        (post) => post.post_id !== action.payload
      );
      state.error = null;
    },
    // 게시글 삭제 실패
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// 액션 생성자들을 내보냅니다
export const {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  getPostStart,
  getPostSuccess,
  getPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} = writeSlice.actions;

// 선택자(selector) 함수들
export const selectPosts = (state) => state.write.posts;
export const selectCurrentPost = (state) => state.write.currentPost;
export const selectLoading = (state) => state.write.loading;
export const selectError = (state) => state.write.error;

// 리듀서를 내보냅니다
export default writeSlice.reducer;
