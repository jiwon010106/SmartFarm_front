import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

// 페이지 최초 로드 시 localStorage 초기화
const initializeAuth = () => {
  const expireTime = localStorage.getItem("loginExpireTime");
  if (expireTime && new Date().getTime() > parseInt(expireTime)) {
    // 만료된 경우 모든 인증 관련 데이터 삭제
    localStorage.clear(); // 모든 localStorage 데이터 삭제
  }
};

// 초기화 실행
initializeAuth();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
