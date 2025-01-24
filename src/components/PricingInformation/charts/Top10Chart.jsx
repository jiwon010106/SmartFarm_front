import React, { useEffect, useRef } from "react";
import createTop10Chart from "../../../data/createTop10Chart";

const Top10Chart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createTop10Chart("top10container");
    chartRef.current = chart;

    return () => {
      if (chartRef.current) {
        // amCharts의 경우 dispose() 메서드를 사용
        if (typeof chartRef.current.dispose === "function") {
          chartRef.current.dispose();
        }
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="top10container"
      className="w-full h-[500px] mt-5 mb-10 border-2 border-gray-300 rounded-lg"
    ></div>
  );
};

export default Top10Chart;
