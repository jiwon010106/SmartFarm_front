import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TOP10_API_URL, GET_MARKET_API_URL } from "../../utils/apiUrl";
import { getMarketRequest, getTop10Request } from "../../utils/requestMethods";

//update item data
const getMarketFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    const options = {
      body: JSON.stringify(updateData),
    };

    return await getMarketRequest(apiURL, options);
  });
};

export const fetchGetMarketData = getMarketFetchThunk(
  "fetchGetMarketData",
  GET_MARKET_API_URL
);

const getTop10FetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    const options = {
      body: JSON.stringify(updateData),
    };

    return await getTop10Request(apiURL, options);
  });
};

export const fetchGetTop10Data = getTop10FetchThunk(
  "fetchGetTop10Data",
  GET_TOP10_API_URL
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetMarketData.fulfilled, handleFulfilled("getMarketData"))
      .addCase(fetchGetMarketData.rejected, handleRejected)

      .addCase(fetchGetTop10Data.fulfilled, handleFulfilled("getTop10Data"))
      .addCase(fetchGetTop10Data.rejected, handleRejected);
  },
}); // slice 객체 저장

export default apiSlice.reducer;
