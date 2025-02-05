import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTop5Chart } from "../../data/createTop10Chart";
import { fetchGetTop5Data } from "../../redux/slices/apiSlice";
// import landingImg from "../../assets/main/mainlanding.jpg";
import Test3 from "../test/Test3";
import Test1 from "../test/Test1";

const Home = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const top5Data = useSelector((state) => state.apis.getTop5Data);

  useEffect(() => {
    dispatch(fetchGetTop5Data());
  }, [dispatch]);

  useEffect(() => {
    if (top5Data) {
      console.log("Top5 데이터:", top5Data);
      try {
        createTop5Chart("top5-chart", top5Data);
      } catch (error) {
        // console.error("차트 생성 중 오류:", error);
      }
    }
  }, [top5Data]);

  return (
<<<<<<< HEAD
    <div className="w-full">
      {/* 아코디안 아이템 */}
      <Test3 />
      <div className="relative">
        {/* 날씨정보 API */}
        <div className="flex justify-center items-center relative max-h-[600px] min-h-[300px]">
          <div className="absolute opacity-30 overlay w-full h-full bg-gray-200 left-0 top-0"></div>
          <div className="flex w-full h-full text-white rounded-lg p-4">
            <div id="top5-chart" ref={chartRef} />
            <Test1 />
          </div>
        </div>
        <div className="container">
          {/* <img
            src={landingImg}
            alt=""
            className="w-full max-h-[600px] min-h-[300px]"
          /> */}
          <div className="w-[500px] h-[420px] text-white rounded-lg p-4"></div>
        </div>
=======
    <div className="container">
      <div className="relative">
        <div className="overflow-hidden flex justify-center items-center relative max-h-[600px] min-h-[300px]">
          <div className="absolute opacity-30 overlay w-full h-full bg-white left-0 top-0"></div>
          <div className="slogan-box absolute left-1/2 transform -translate-x-1/2 lg:left-[20%] lg:transform-none top-[25%] flex flex-col gap-4">
            <h2
              style={{ fontFamily: "LemonMilk" }}
              className="text-6xl hidden lg:block"
            >
              AnIfarm
            </h2>
            <p className="text-base lg:text-lg tracking-tight hidden lg:block">
              사이트
              <br />
              소개
              <br />글 입니다.
            </p>
          </div>
          <img
            src={landingImg}
            className="w-full max-h-[600px] min-h-[300px]"
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-40 m-[50px] hover:text-green-500">
        <Link to="/pricingInformation">소비 트랜드</Link>
        <Link to="/sellInformation">가격예측</Link>
        <Link to="/pests">육성법</Link>
        <Link to="/trainingMethod">작물육성방법</Link>
        <Link to="/Community">게시글 작성</Link>
      </div>

      <div className="w-[500px] h-[420px] text-white rounded-lg p-4">
        <div id="top5-chart" ref={chartRef} />
>>>>>>> 5dae32bb8f37fc709e8be8bf16b5b3c563d53559
      </div>
    </div>
  );
};

export default Home;
