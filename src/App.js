import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import Mypage from "./components/login/Mypage";
import { Provider } from "react-redux";
import store from "./redux/store"; // 스토어를 생성한 파일 경로
import PricingInformation from "./components/PricingInformation/PricingInformation";
import Test1 from "./components/test/Test1";
import Test2 from "./components/test/Test2";
import Test3 from "./components/test/Test3";
import Community from "./components/community/Community";
import SalsesInformation from "./components/SalsesInformation/SalsesInformation";
import Pests from "./components/pests/Pests";
import TrainingMethod from "./components/trainingMethod/TrainingMethod";
import PostDetail from "./components/community/PostDetail";
import Write from "./components/community/Write";
import { useDispatch } from "react-redux";
import { checkLoginStatus, logout } from "./redux/slices/authslice";

function App() {
<<<<<<< HEAD
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
=======
  const dispatch = useDispatch();
>>>>>>> b8748636a5404bdd3d2cbe1e794b89d19732b54e

  useEffect(() => {
    // 페이지 로드시 최초 1회 체크
    const checkAndInitializeAuth = () => {
      const expireTime = localStorage.getItem("loginExpireTime");
      if (expireTime && new Date().getTime() > parseInt(expireTime)) {
        dispatch(logout());
      } else {
        dispatch(checkLoginStatus());
      }
    };

    checkAndInitializeAuth();

    // 사용자 활동 감지
    const resetTimer = () => {
      checkAndInitializeAuth();
    };

    // 사용자 활동 이벤트 리스너
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      // 이벤트 리스너 정리
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Hearder />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricingInformation" element={<PricingInformation />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Community/:postId" element={<PostDetail />} />
          <Route path="/Community/write" element={<Write />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sellInformation" element={<SalsesInformation />} />
          <Route path="/pests" element={<Pests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/trainingMethod" element={<TrainingMethod />} />
          <Route path="/test1" element={<Test1 />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/test3" element={<Test3 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
