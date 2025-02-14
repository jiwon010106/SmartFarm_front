import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTop5Chart } from "../../data/createTop10Chart";
import { fetchGetTop5Data } from "../../redux/slices/apiSlice";
import { Link } from "react-router-dom";
// import landingImg from "../../assets/main/mainlanding.jpg";
import AccordionItem from "../common/AccordionItem";
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
      // console.log("Top5 데이터:", top5Data);
      try {
        createTop5Chart("top5-chart", top5Data);
      } catch (error) {
        // console.error("차트 생성 중 오류:", error);
      }
    }
  }, [top5Data]);

  return (
    <div className="w-full">
      {/* 아코디안 아이템 */}
      <AccordionItem />
      <div className="relative">
        {/* 날씨정보 API */}
        <div className="flex justify-center items-center relative max-h-[600px] min-h-[300px]">
          <div className="absolute opacity-30 overlay w-full h-full bg-transparent left-0 top-0"></div>
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
      </div>
    </div>
  );
};

export default Home;
