import React, { useState } from "react";
import axios from "axios";
import mediLogo from "../../assets/medi_logo.png";
import Swal from "sweetalert2";

const FindPwd = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 비밀번호 찾기 요청 처리
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/auth/find_pwd", {
        email,
      });

      await Swal.fire({
        icon: "success",
        title: "이메일 발송 완료",
        text: response.data.message,
      });
      setEmail("");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: error.response?.data?.error || "서버와 연결할 수 없습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto mb-16">
      <div className="logo w-[200px] md:w-[350px] mt-10 md:mt-32 mb-8 md:mb-12">
        <img src={mediLogo} alt="logo" />
      </div>
      <div className="shadow-lg px-6 py-8 w-[90%] max-w-[500px] border mb-16 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
          비밀번호 찾기
        </h2>

        <form onSubmit={handleForgotPassword}>
          <div className="mb-4 md:mb-5">
            <label
              htmlFor="email"
              className="block text-neutral-700 text-base md:text-lg"
            >
              이메일
            </label>
            <div className="flex items-center justify-center gap-1.5">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mb-4 md:mb-6">
            <button
              className="w-full h-10 md:h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "처리중..." : "비밀번호 재설정 링크 받기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindPwd;
