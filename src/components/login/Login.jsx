import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchPostLoginData } from "../../redux/slices/authslice.js";
import { setToken } from "../../redux/slices/loginslice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 쿼리가 잡히지 않게(경로 표시X)

    // id 값을 로그로 출력
    // console.log(value.id);

    if (value.email === "" || value.password === "") {
      alert("email, password는 필수 입력값입니다.");
      return;
    }

    try {
      const response = await dispatch(fetchPostLoginData(value)).unwrap();
      // console.log(response);
      if (response.status === 201) {
        // alert(response.data.msg)
        // localStorage.setItem('token', response.data.token) // 로컬 스토리지에 저장 - localStorage.setItem('저장할 이름', 저장할 값)
        // getItem('저장된 이름(key)') - 저장된 이름의 값을 가져옴
        // removeItem('저장된 이름(key)'): 저장된 이름의 값을 삭제
        dispatch(setToken(response.data.token));
        navigator("/");
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

  return (
    <div className="flex flex-col justify-center items-center h-auto w-full mb-16">
      <div className="logo w-[250px] md:w-[350px] mt-20 md:mt-32 mb-10 md:mb-12">
        {/*<img src={AnifarmLogo} alt="Logo" /> */}
      </div>
      <div className="shadow-lg px-6 md:px-12 py-8 md:py-10 w-[90%] md:w-[500px] border mb-16 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-center">
          로그인
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-neutral-700 text-base md:text-lg mb-1"
            >
              이메일
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border mb-2 rounded-md"
              name="email"
              onChange={handleChange}
              id="emailInput"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-neutral-700 text-base md:text-lg mb-1"
            >
              비밀번호
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button className="btn w-full h-10 md:h-12" type="submit">
            로그인 하기
          </button>
          <Link to="/register">
            <button
              className="w-full h-10 md:h-12 border border-neutral-700 rounded-md hover:text-blue-600 hover:border-blue-600 transition-all duration-200"
              to="/register"
            >
              이메일 회원가입
            </button>
          </Link>
        </form>

        <div className="mt-8 md:mt-10 mb-2 text-center text-gray-500">
          <Link to="/findpwd" className="hover:text-black hover:underline">
            비밀번호 찾기
          </Link>
          <span> &nbsp; | &nbsp; </span>
          <Link to="/register" className="hover:text-black hover:underline">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
