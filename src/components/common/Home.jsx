import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTop5Chart } from "../../data/createTop10Chart";
import { fetchGetTop5Data } from "../../redux/slices/apiSlice";

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

  return (
    <div className="container">
      <h1> Welcome to the Home Page </h1>
      <Link to="/pricingInformation">Go to Pricing Information</Link>
      <div className="w-[500px] h-[420px] text-white rounded-lg p-4">
        <div id="top5-chart" ref={chartRef} />
      </div>
    </div>
  );
};

export default Home;
