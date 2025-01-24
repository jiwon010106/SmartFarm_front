import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createTop5Chart } from "../../data/createTop10Chart";

const Home = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      createTop5Chart("top5-chart");
    }
  }, []);

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
