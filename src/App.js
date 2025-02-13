import "./App.css";
import React, { useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./components/common/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Register from "./components/login/Register";
import Login from "./components/login/details/Login";
import Mypage from "./components/login/Mypage";
import PricingInformation from "./components/PricingInformation/PricingInformation";
import WeatherItem from "./components/Item/WeatherItem";
import PricePredictionItem from "./components/Item/PricePredictionItem";
import AccordionItem from "./components/Item/AccordionItem";
import Community from "./components/community/Community"; 
import SalesInformation from "./components/SalesInformation/SalesInformation";
import Pests from "./components/pests/Pests"; 
import TrainingMethod from "./components/trainingMethod/TrainingMethod";
import PostDetail from "./components/community/PostDetail";
import Write from "./components/community/Write";
import { useDispatch } from "react-redux";
import { checkLoginStatus, logout } from "./redux/slices/authslice";
import Test3 from "./components/test/Test3";
import Test2 from "./components/test/Test2";
import Test1 from "./components/test/Test1";

function App() {
  const dispatch = useDispatch();
  // const INACTIVE_TIMEOUT = 60 * 1000; // 1분으로 변경 (테스트용)
  const INACTIVE_TIMEOUT = 2 * 60 * 60 * 1000; // 2시간으로 설정

  const performLogout = useCallback(() => {
    dispatch(logout());
    localStorage.clear();
    alert("자동 로그아웃 되었습니다.");
    window.location.href = "/";
  }, [dispatch]);

  const handleUserActivity = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const expireTime = localStorage.getItem("loginExpireTime");

      if (expireTime && new Date().getTime() > parseInt(expireTime)) {
        console.log("토큰 만료 - 로그아웃 실행");
        performLogout();
      }
    }
  }, [performLogout]);

  useEffect(() => {
    let inactivityTimeout;

    // 자동 로그아웃 함수
    const autoLogout = () => {
      console.log("비활성 시간 초과 - 자동 로그아웃 실행");
      performLogout();
      clearTimeout(inactivityTimeout);
    };

    // 타이머 리셋 함수
    const resetInactivityTimer = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(autoLogout, INACTIVE_TIMEOUT);
      // console.log("활동 감지 - 새로운 타이머 설정");
    };

    // 이벤트 핸들러
    const handleActivity = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // console.log("사용자 활동 감지");
        handleUserActivity();
        resetInactivityTimer();
      }
    };

    // 이벤트 리스너 등록
    const events = ["mousemove", "keypress", "click", "scroll", "touchstart"];
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // 초기 타이머 설정
    if (localStorage.getItem("token")) {
      resetInactivityTimer();
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearTimeout(inactivityTimeout);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [handleUserActivity]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricingInformation" element={<PricingInformation />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Community/:postId" element={<PostDetail />} />
          <Route path="/Community/write" element={<Write />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sellInformation" element={<SalesInformation />} />
          <Route path="/pests" element={<Pests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/trainingMethod" element={<TrainingMethod />} />
          <Route path="/WeatherItem" element={<WeatherItem />} />
          <Route path="/PricePredictionItem" element={<PricePredictionItem />} />
          <Route path="/AccordionItem" element={<AccordionItem />} />
          <Route path="/Test1" element={<Test1 />} />
          <Route path="/Test2" element={<Test2 />} />
          <Route path="/Test3" element={<Test3 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
