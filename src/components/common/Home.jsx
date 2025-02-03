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
      <nav className="overflow-hidden w-full h-screen flex">
        <ol className="flex items-center w-full">
          {["Home", "About", "Widgets", "Kabobs", "Contact"].map(
            (item, index) => (
              <li
                key={index}
                className={`h-20 w-full flex items-center justify-center cursor-pointer transition-all duration-400 relative ${
                  index === 2 ? "bg-blue-500 text-white" : ""
                }`}
                tabIndex={index + 1}
              >
                <a
                  href="#0"
                  className="text-2xl font-bold transition-all duration-200"
                >
                  {item}
                </a>
                {index === 2 && (
                  <ol className="absolute top-6 left-0 text-center hidden group-hover:block">
                    {["Big Widgets", "Bigger Widgets", "Huge Widgets"].map(
                      (subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="transition-transform duration-300"
                        >
                          <a href="#0" className="text-xs">
                            {subItem}
                          </a>
                        </li>
                      )
                    )}
                  </ol>
                )}
              </li>
            )
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Home;
