import React from "react";
import AnifarmLogo from "../../assets/smartfarm.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4">
      <div className="flex items-center">
        <img src={AnifarmLogo} alt="Logo" className="h-8 w-8 mr-2" />
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="text-black">
          홈페이지
        </Link>
        <Link to="/login" className="text-black">
          로그인
        </Link>
        <Link to="/signup" className="text-black">
          회원가입
        </Link>
        <Link to="/mypage" className="text-black">
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default Header;
