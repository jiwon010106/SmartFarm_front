import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../redux/slices/loginslice";
import AnifarmLogo from "../../assets/smartfarm.png";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const handleLogout = () => {
    dispatch(clearToken());
    alert("로그아웃 되었습니다.");
  };

  return (
    <div className="w-full flex justify-center shadow-custom sticky top-0 z-50 bg-gray-100">
      <div className="container p-1 flex justify-between items-center relative">
        <div className="logo left-0">
          <Link to="/">
            <img src={AnifarmLogo} alt="로고" className="w-[50px] y-[100px]" />
          </Link>
        </div>
        <div className="head-all">
          <div className="head-top w-full text-xs md:text-sm info">
            <ul className="flex gap-2 md:gap-6 items-center justify-end">
              {user !== null ? (
                <>
                  <li className="text-neutral-500 hover:text-black transition-all duration-100">
                    <button onClick={handleLogout}>로그아웃</button>
                  </li>
                  <li className="text-neutral-500 hover:text-black transition-all duration-100">
                    <Link to="/mypage">마이페이지</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-neutral-500 hover:text-black transition-all duration-100">
                    <Link to="/login">로그인</Link>
                  </li>
                  <li className="text-neutral-500 hover:text-black transition-all duration-100">
                    <Link to="/register">회원가입</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
