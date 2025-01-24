import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/main/Home";
import Hearder from "./components/common/Header";
import Footer from "./components/common/Footer";
import Market from "./components/details/Market";
import Register from "./components/category/Register";
import Login from "./components/category/Login";
import Mypage from "./components/category/Mypage";
import { Provider } from "react-redux";
import store from "./redux/store"; // 스토어를 생성한 파일 경로

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Hearder />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
