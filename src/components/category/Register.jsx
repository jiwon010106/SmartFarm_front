/* - Imports: React와 Redux의 훅, React Router의 훅을 사용합니다. authSlice에서 여러 액션을 가져와 사용하고, 로고 이미지를 가져옵니다. */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AnifarmLogo from "../../assets/smartfarm.png";
import {
  fetchPostAuthData,
  fetchPostEmailVerificationData,
  resetAuthState,
  verifyEmail,
} from "../../redux/slices/authslice.js";

/* - Redux Hooks: useDispatch로 액션을 디스패치하고, useSelector로 Redux 상태에서 인증 관련 데이터를 가져옵니다. */
const Register = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { verificationCode, isEmailVerified } = useSelector(
    (state) => state.auth
  );
  console.log("verificationCode", verificationCode);
  console.log("isEmailVerified", isEmailVerified);

  /* React Router: useNavigate로 페이지 이동을 처리합니다. */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      alert("이미 로그인된 상태입니다.");
      navigator("/");
    }
  }, [navigator]);

  /* - 로그인 상태 확인: 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 확인하여 이미 로그인된 상태라면 홈으로 리다이렉트합니다. */
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  /* - 인증 상태 초기화: 컴포넌트가 언마운트될 때 인증 상태를 초기화합니다. */
  const [value, setValue] = useState({
    email: "",
    password: "",
    birth_date: "",
    confirm_password: "",
  });

  const [userInputCode, setUserInputCode] = useState("");

  /* State 관리: 사용자 입력값과 인증 코드를 관리하기 위한 상태를 정의합니다. */
  const handleSendVerification = async () => {
    if (!value.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const result = await dispatch(
        fetchPostEmailVerificationData(value.email)
      ).unwrap();
      alert("인증 코드가 발송되었습니다.");
    } catch (error) {
      alert("인증 코드 발송 실패");
    }
  };

  /* - 이메일 인증 코드 발송: 이메일 입력 후 인증 코드를 발송하는 함수입니다. 이메일이 입력되지 않으면 경고를 표시합니다. */
  const handleVerifyCode = () => {
    if (userInputCode === verificationCode.data.verificationCode) {
      dispatch(verifyEmail());
      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("인증코드가 일치하지 않습니다.");
    }
  };

  /*  인증 코드 확인: 사용자가 입력한 인증 코드가 서버에서 발송한 코드와 일치하는지 확인합니다. */
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value || "",
    });
  };

  /* - 입력값 변경 처리: 입력 필드의 값이 변경될 때 상태를 업데이트합니다. */
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  /* - 오늘 날짜 가져오기: 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수입니다. */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(value.birth_date);
    const today = new Date();

    if (selectedDate > today) {
      alert("생년월일은 오늘 이후의 날짜를 선택할 수 없습니다.");
      return;
    }

    if (!isEmailVerified) {
      alert("이메일 인증이 필요합니다.");
      return;
    }

    if (
      value.email === "" ||
      value.password === "" ||
      value.confirm_password === "" ||
      value.birth_date === ""
    ) {
      alert("모든 항목은 필수 입력값입니다.");
      return;
    }
    if (value.password !== value.confirm_password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const data = {
      email: value.email,
      password: value.password,
      birth_date: value.birth_date,
    };

    try {
      const response = await dispatch(fetchPostAuthData(data)).unwrap();
      if (response.status === 200) {
        alert(response.data.msg);
        navigator("/login");
        return;
      }
      if (response.data.success === false) {
        alert(response.data.msg);
        return;
      }
    } catch (error) {
      alert(error.msg);
    }
  };

  /* - 회원가입 처리: 폼 제출 시 호출되며, 입력값의 유효성을 검사하고, 이메일 인증이 완료되었는지 확인합니다. 모든 조건이 충족되면 서버에 회원가입 요청을 보냅니다. */
  return (
    <div className="flex flex-col justify-center items-center h-auto mb-16">
      <div className="logo w-[250px] md:w-[350px] mt-20 md:mt-32 mb-10 md:mb-12">
        <img src={AnifarmLogo} alt="logo" />
      </div>
      <div className="shadow-lg px-6 md:px-12 py-8 md:py-10 w-[90%] md:w-[500px] border mb-16 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
          회원가입
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"></div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-neutral-700 text-lg">
              이메일
            </label>
            <div className="flex items-center justify-center gap-1.5">
              <input
                type="email"
                placeholder="Email"
                className="w-[70%] px-3 py-2 border rounded-md"
                name="email"
                onChange={handleChange}
              />
              <button
                onClick={handleSendVerification}
                className="w-[30%] py-2 bg-blue-400 text-white rounded-md text-[11px] md:text-[15px] hover:bg-blue-500 transition-all duration-200 "
                type="button"
              >
                인증코드 발송
              </button>
            </div>
          </div>

          {verificationCode && (
            <div className="mb-4">
              <label className="block text-neutral-700 text-lg mb-1">
                이메일 확인
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="인증코드 입력"
                  className="w-[70%] px-3 py-2 border rounded-md"
                  value={userInputCode}
                  onChange={(e) => setUserInputCode(e.target.value)}
                />
                <button
                  onClick={handleVerifyCode}
                  className="w-[30%] py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 text-base"
                  type="button"
                >
                  확인
                </button>
              </div>
            </div>
          )}

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-neutral-700 text-lg mb-1"
            >
              비밀번호
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md mb-2"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="block text-neutral-700 text-lg mb-1"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="Comfirm Password"
              className="w-full px-3 py-2 border rounded-md mb-2"
              name="confirm_password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="birth_date"
              className="block text-neutral-700 text-lg mb-1"
            >
              생년월일
            </label>
            <input
              type={`${
                window.innerWidth < 768
                  ? value.birth_date
                    ? "date"
                    : "text"
                  : "date"
              }`}
              className="w-full px-3 py-2 border rounded-md mb-6"
              name="birth_date"
              onChange={handleChange}
              max={getTodayDate()}
              required
              placeholder="YYYY-MM-DD"
              onFocus={(e) => (e.target.type = "date")}
              value={value.birth_date}
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-6">
            <button
              className="w-full h-10 md:h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200 text-sm md:text-base"
              type="submit"
            >
              가입 하기
            </button>
            <Link to="/" className="w-full h-10 md:h-12">
              <button className="w-full h-10 md:h-12 border border-neutral-700 rounded-md hover:text-blue-600 hover:border-blue-600 transition-all duration-200 text-sm md:text-base">
                가입 취소
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
