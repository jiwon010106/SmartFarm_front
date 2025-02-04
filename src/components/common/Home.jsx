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
    <div className="container">
      <img src={landingImg} alt="" className="w-full" />
      <div className="flex justify-center items-center gap-10">
        <Link to="/pricingInformation">소비 트랜드</Link>
        <Link to="/sellInformation">가격예측</Link>
        <Link to="/pests">육성법</Link>
        <Link to="/trainingMethod">작물육성방법</Link>
        <Link to="/Community">게시글 작성</Link>
      </div>
      <div className="w-[500px] h-[420px] text-white rounded-lg p-4">
        <div id="top5-chart" ref={chartRef} />
      </div>
    </div>
  );
};

export default Home;
