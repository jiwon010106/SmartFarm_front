import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetMarketData } from "../../../redux/slices/apiSlice";
import { createMarketChart } from "../../../data/marketChart";

const RaceChart = () => {
  const dispatch = useDispatch();
  const marketData = useSelector((state) => state.apis.getMarketData);

  useEffect(() => {
    dispatch(fetchGetMarketData());
  }, [dispatch]);

  useEffect(() => {
    if (marketData) {
      const chart = createMarketChart("chartdiv", marketData);

      return () => {
        chart.dispose();
      };
    }
  }, [marketData]);

  return (
    <div
      id="chartdiv"
      className="w-full h-[500px] mt-5 mb-10 border-2 border-gray-300 rounded-lg"
    ></div>
  );
};

export default RaceChart;
