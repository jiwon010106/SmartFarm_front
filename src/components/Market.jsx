import React, { useState } from "react";
import RaceChart from "./charts/RaceChart";
import Top10Chart from "./charts/Top10Chart";
import market from "../assets/free_icon_cart.png";

const Market = () => {
  const [activeChart, setActiveChart] = useState(null);

  const handleShowTop10Chart = () => {
    setActiveChart(activeChart === "top10" ? null : "top10");
  };

  const handleShowRaceChart = () => {
    setActiveChart(activeChart === "race" ? null : "race");
  };

  return (
    <div className="container">
      <div className="flex items-center gap-2">
        <img src={market} alt="장바구니" className="w-8 h-8" />
        <h1 className="title text-left text-4xl font-bold">
          대형마트 소비트렌드
        </h1>
      </div>
      <p className="subtitle text-left text-lg text-gray-600 mt-2 mb-5">
        한 눈에 보는 장바구니 쇼핑 동향
      </p>
      <div className="flex gap-4 mt-8">
        <button
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={handleShowTop10Chart}
        >
          판매 TOP 10
        </button>

        <button
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={handleShowRaceChart}
        >
          레이스 차트
        </button>
      </div>

      {activeChart === "top10" && <Top10Chart />}
      {activeChart === "race" && <RaceChart />}
    </div>
  );
};

export default Market;
