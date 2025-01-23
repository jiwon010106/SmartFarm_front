import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "../../utils/jwtDecode.js";
import { fetchDeleteAuthData } from "../slices/authslice.js";

const initialToken = localStorage.getItem("token");
const initialState = {
  token: initialToken || null,
  user: initialToken ? jwtDecode(initialToken) : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // action으로 전달받은 결과값
      state.user = jwtDecode(action.payload);
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // 회원탈퇴 성공 시 로그인 상태 초기화
    builder.addCase(fetchDeleteAuthData.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      // 열람 기록 삭제
      localStorage.removeItem(`viewedMedicines_${state.user?.userId}`);
      localStorage.removeItem(`viewedNews_${state.user?.userId}`);
    });
  },
});

export const { setToken, clearToken } = loginSlice.actions;
export default loginSlice.reducer;
