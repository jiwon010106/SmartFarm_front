import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTop5Chart } from "../../data/createTop10Chart";
import { fetchGetTop5Data } from "../../redux/slices/apiSlice";
import landingImg from "../../assets/main/mainlanding.jpg";

const Home = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const top5Data = useSelector((state) => state.apis.getTop5Data);
  const loading = useSelector((state) => state.apis.loading);

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

  if (loading) {
    console.log("데이터 로딩 중...");
    return <div>로딩 중...</div>;
  }

  if (!top5Data) {
    // console.log("데이터가 없습니다.");
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="w-full">
      <div className="relative">
        <div className="overflow-hidden flex justify-center items-center relative max-h-[600px] min-h-[300px]">
          <div className="absolute opacity-30 overlay w-full h-full bg-white left-0 top-0"></div>
          <div
            className="slogan-box absolute 
          left-1/2 transform -translate-x-1/2 
          lg:left-[20%] lg:transform-none 
          top-[25%] flex flex-col gap-4"
          >
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
          <h1> Welcome to the Home Page </h1>
          <Link to="/pricingInformation">Go to Pricing Information</Link>
          <div className="w-[500px] h-[420px] text-white rounded-lg p-4">
            <div id="top5-chart" ref={chartRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
