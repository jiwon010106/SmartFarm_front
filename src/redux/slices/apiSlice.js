import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TOP10_API_URL, GET_MARKET_API_URL } from "../../utils/apiurl";
import { getMarketRequest, getTop10Request } from "../../utils/requestMethods";

//update item data
const getMarketFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async () => {
    return await getMarketRequest(apiURL);
  });
};

export const fetchGetMarketData = getMarketFetchThunk(
  "fetchGetMarketData",
  GET_MARKET_API_URL
);

const getTop10FetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async () => {
    return await getTop10Request(apiURL);
  });
};

export const fetchGetTop10Data = getTop10FetchThunk(
  "fetchGetTop10Data",
  GET_TOP10_API_URL
);

export const fetchGetTop5Data = createAsyncThunk(
  "fetchGetTop5Data",
  async () => {
    const response = await getTop10Request(GET_TOP10_API_URL);
    // Top 10 데이터에서 상위 5개만 추출
    return response.slice(0, 5);
  }
);

// handleFulfilled 함수 정의 : 요청 성공 시 상태 업데이트 로직을 별도의 함수로 분리
const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

// handleRejected 함수 정의 : 요청 실패 시 상태 업데이트 로직을 별도의 함수로 분리
const handleRejected = (state, action) => {
  console.log("Error", action.payload);
  state.isError = true;
};

// create slice
const apiSlice = createSlice({
  name: "apis", // slice 기능 이름
  initialState: {
    // 초기 상태 지정
    getMarketData: null,
    getTop10Data: null,
    getTop5Data: null, // Top5 데이터 상태 추가
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetMarketData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetMarketData.fulfilled, (state, action) => {
        state.loading = false;
        state.getMarketData = action.payload;
      })
      .addCase(fetchGetMarketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "데이터 로딩 실패";
        console.error("마켓 데이터 로딩 실패:", action.error);
      })

      .addCase(fetchGetTop10Data.fulfilled, handleFulfilled("getTop10Data"))
      .addCase(fetchGetTop10Data.rejected, handleRejected)

      .addCase(fetchGetTop5Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetTop5Data.fulfilled, (state, action) => {
        state.loading = false;
        state.getTop5Data = action.payload;
      })
      .addCase(fetchGetTop5Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "데이터 로딩 실패";
      });
  },
}); // slice 객체 저장

export default apiSlice.reducer;
