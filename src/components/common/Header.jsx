import React from "react";
import AnifarmLogo from "../../assets/smartfarm.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 py-4">
      <Link to="/" className="flex-shrink-0 flex items-center">
        <img
          src={AnifarmLogo}
          alt="Logo"
          className="h-8 w-8 md:h-12 md:w-12 mr-1 rounded-lg"
        />
      </Link>
      <div className="flex space-x-4">
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
