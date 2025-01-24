import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  POST_AUTH_API_URL,
  POST_LOGIN_API_URL,
  POST_EMAIL_VERIFICATION_API_URL,
  UPDATE_AUTH_API_URL,
  DELETE_AUTH_API_URL,
} from "../../utils/apiUrl.js";
import {
  postRequest,
  putRequest,
  deleteRequest,
} from "../../utils/requestMethods.js";

// 회원가입 요청
const postAuthFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData, { rejectWithValue }) => {
    // console.log(postData);
    try {
      const options = {
        body: JSON.stringify(postData), // 표준 JSON 문자열로 변환 json 형식일 때
        // method: "POST",
        // body: postData, // json 형식이 아닐 때
      };
      const response = await postRequest(apiURL, options);
      return response; // { status, data } 형태로 반환
    } catch (error) {
      // 에러 시 상태 코드와 메시지를 포함한 값을 rejectWithValue로 전달
      return rejectWithValue(error);
    }
  });
};

export const fetchPostAuthData = postAuthFetchThunk(
  "fetchPostAuth", // action type
  POST_AUTH_API_URL // 요청 url
);

// 이메일 인증 요청
const postEmailVerificationFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (email, { rejectWithValue }) => {
    try {
      const options = {
        body: JSON.stringify({ email }),
      };
      const response = await postRequest(apiURL, options);
      console.log("서버응답:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "알 수 없는 오류");
    }
  });
};

export const fetchPostEmailVerificationData = postEmailVerificationFetchThunk(
  "fetchPostEmailVerification", // action type
  POST_EMAIL_VERIFICATION_API_URL // 요청 url
);

// 로그인 요청
const postLoginThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData, { rejectWithValue }) => {
    // console.log(postData);
    try {
      const options = {
        body: JSON.stringify(postData), // 표준 JSON 문자열로 변환 json 형식일 때
        // method: "POST",
        // body: postData, // json 형식이 아닐 때
      };
      const response = await postRequest(apiURL, options);
      return response; // { status, data } 형태로 반환
    } catch (error) {
      // 에러 시 상태 코드와 메시지를 포함한 값을 rejectWithValue로 전달
      return rejectWithValue(error);
    }
  });
};

export const fetchPostLoginData = postLoginThunk(
  "fetchPostLogin", // action type
  POST_LOGIN_API_URL // 요청 url
);

// 회원정보 수정 요청
const updateAuthFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(
    actionType,
    async (updateData, { rejectWithValue }) => {
      // console.log(updateData , apiURL);
      try {
        const options = {
          body: JSON.stringify(updateData), // 표준 json 문자열로 변환
        };
        const fullPath = `${apiURL}/${updateData.id}`;
        const response = await putRequest(fullPath, options);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
};

export const fetchUpdateAuthData = updateAuthFetchThunk(
  "fetchUpdateAuth",
  UPDATE_AUTH_API_URL
);

// 회원정보 삭제 요청
const deleteAuthFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    console.log("삭제 요청 URL:", `${apiURL}/${id}`);
    console.log("삭제할 ID:", id);
    const options = {
      method: "DELETE",
    };
    const fullPath = `${apiURL}/${id}`;
    return await deleteRequest(fullPath, options);
  });
};

export const fetchDeleteAuthData = deleteAuthFetchThunk(
  "fetchDeleteAuth",
  DELETE_AUTH_API_URL
);

// handleFulfilled 함수 정의 : 요청 성공 시 상태 업데이트 로직을 별도의 함수로 분리
const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

// handleRejected 함수 정의 : 요청 실패 시 상태 업데이트 로직을 별도의 함수로 분리
const handleRejected = (state, action) => {
  // console.log('Error', action.payload);
  state.isError = true;
  state.errorMessage = action.payload?.msg || "Something went wrong";
};

const authSlice = createSlice({
  name: "auth", // slice 기능 이름
  initialState: {
    // 초기 상태 지정
    postAuthData: null,
    postLoginData: null,
    verificationCode: null,
    isEmailVerified: false,
    isError: false,
    errorMessage: null,
    deleteAuthData: null,
    updateAuthData: null,
  },
  reducers: {
    verifyEmail: (state, action) => {
      // if (state.verificationCode === action.payload.data.verificationCode) {
      state.isEmailVerified = true;
      // }
    },
    resetAuthState: (state) => {
      state.verificationCode = null;
      state.isEmailVerified = false;
    },
    cancelMembership: (state) => {
      state.postLoginData = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPostAuthData.fulfilled, handleFulfilled("postAuthData"))
      .addCase(fetchPostAuthData.rejected, handleRejected)

      .addCase(fetchPostLoginData.fulfilled, handleFulfilled("postLoginData"))
      .addCase(fetchPostLoginData.rejected, handleRejected)

      .addCase(fetchPostEmailVerificationData.fulfilled, (state, action) => {
        state.verificationCode = action.payload;
      })
      .addCase(fetchPostEmailVerificationData.rejected, handleRejected)

      .addCase(fetchDeleteAuthData.fulfilled, (state, action) => {
        state.deleteAuthData = action.payload;
        state.postLoginData = null;
      })
      .addCase(fetchDeleteAuthData.rejected, handleRejected)

      .addCase(fetchUpdateAuthData.fulfilled, (state, action) => {
        state.updateAuthData = action.payload;
      })
      .addCase(fetchUpdateAuthData.rejected, handleRejected);
  },
}); // slice 객체 저장

export const { verifyEmail, resetAuthState, cancelMembership } =
  authSlice.actions;
export default authSlice.reducer;
