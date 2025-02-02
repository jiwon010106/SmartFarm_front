import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home";
import Hearder from "./components/common/Header";
import Footer from "./components/common/Footer";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import Mypage from "./components/login/Mypage";
import { Provider } from "react-redux";
import store from "./redux/store"; // 스토어를 생성한 파일 경로
import PricingInformation from "./components/PricingInformation/PricingInformation";
import Test1 from "./components/test/Test1";
import Test2 from "./components/test/Test2";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Hearder />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/pricingInformation"
              element={<PricingInformation />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/test1" element={<Test1 />} />
            <Route path="/test2" element={<Test2 />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
