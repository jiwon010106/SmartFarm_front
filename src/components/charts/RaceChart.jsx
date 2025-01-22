import React, { useEffect } from "react";
import { createMarketChart } from "../../utils/marketChart";

const RaceChart = () => {
  useEffect(() => {
    const chart = createMarketChart("chartdiv");

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      className="w-full h-[500px] mt-5 mb-10 border-2 border-gray-300 rounded-lg"
    ></div>
  );
};

export default RaceChart;
